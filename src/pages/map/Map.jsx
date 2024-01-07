import React, { useRef, useEffect, useState } from "react";
import styles from "./Map.module.css";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useAnnouncement } from "../../context/Anouncement";

const API_key = "v5uKmtnDfgdLxBTAh2yh";

maptilersdk.config.apiKey = "v5uKmtnDfgdLxBTAh2yh";

function Map() {
  const data = useAnnouncement();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const kiev = { lng: 30.523, lat: 50.45 };
  const [zoom] = useState(5);

  console.log(data);

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [kiev.lng, kiev.lat],
      zoom: zoom,
    });
  }, [data, zoom, kiev.lat, kiev.lng]);

  useEffect(() => {
    data.map((el) => {
      console.log(el);
      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat(el.geo)
        .addTo(map.current);
    });
  }, [data]);

  return (
    <div className={styles.map_wrapper}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}

export default Map;
