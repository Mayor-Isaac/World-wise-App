import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  if (action.type === "loading") return { ...state, isLoading: true };
  if (action.type === "cities/loaded")
    return { ...state, isLoading: false, cities: action.payload };
  if (action.type === "city/loaded")
    return { ...state, isLoading: false, currentCity: action.payload };
  if (action.type === "city/created")
    return {
      ...state,
      isLoading: false,
      cities: [...state.cities, action.payload],
    };
  if (action.type === "city/deleted")
    return {
      ...state,
      isLoading: false,
      cities: state.cities.filter((city) => city.id !== action.payload),
      currentCity: action.payload,
    };
  if (action.type === "rejected")
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      currentCity: {},
    };
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the data",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the data",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        header: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({
        type: "city/created",
        payload: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the data",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleted the data",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        error,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw Error("Incorrect use of useCities");
  return context;
}

export { CitiesProvider, useCities };
