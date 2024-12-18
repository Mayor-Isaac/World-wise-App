import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./Map.module.css";

export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  //   console.log(searchParams);
  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h1>
        Position : lat : {lat}, lng : {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 50, lng: 20 });
        }}
      >
        Change Pos
      </button>
    </div>
  );
}
