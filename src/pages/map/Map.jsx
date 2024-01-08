import React, { useRef, useEffect, useState } from "react";
import styles from "./Map.module.css";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useAnnouncement } from "../../context/Anouncement";

const API_key = import.meta.env.VITE_API_KEY;

maptilersdk.config.apiKey = `${API_key}`;

function Map() {
  const data = useAnnouncement();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const kiev = { lng: 30.523, lat: 50.45 };
  const [zoom] = useState(5);

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [kiev.lng, kiev.lat],
      zoom: zoom,
    });
    map.current.on("click", "Marker", function (e) {
      console.log(`this is ${e.Marker}`);
    });
  }, [data, zoom, kiev.lat, kiev.lng]);

  useEffect(() => {
    data.map((el) => {
      if (map.current.loaded()) {
        if (!map.current.getSource(`data-${el.id}`)) {
          map.current.addSource(`data-${el.id}`, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: el.geo,
                  },
                },
              ],
            },
          });
          map.current.addLayer({
            id: `data-${el.id}`,
            type: "circle",
            source: `data-${el.id}`,
            paint: {
              "circle-radius": 10,
              "circle-color": "#FF0000",
            },
          });
          map.current.on("click", `data-${el.id}`, function (e) {
            console.log(e.target);
          });
        }
      } else {
        map.current.on("load", function () {
          map.current.addSource(`data-${el.id}`, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: el.geo,
                  },
                },
              ],
            },
          });
          map.current.addLayer({
            id: `data-${el.id}`,
            type: "circle",
            source: `data-${el.id}`,
            paint: {
              "circle-radius": 6,
              "circle-color": "#FF0000",
            },
          });
          map.current.on("click", `data-${el.id}`, function (e) {
            console.log(e.target);
          });
        });
      }
    });
  }, [data]);

  return (
    <div className={styles.map_wrapper}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}

export default Map;
