import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../Context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity } = useCities();

  const { cityName, emoji, date, id, position } = city;

  console.log(currentCity);

  console.log(city);

  const { lat, lng } = position;
  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng} `}
        className={`${styles.cityItem}
        ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
