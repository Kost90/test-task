import React, { useRef, useEffect, useState } from "react";
import styles from "./Map.module.css";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useAnnouncement } from "../../context/Anouncement";
import { useSingleDispatch } from "../../context/singleannounc/Singleannounce";
import { SINGLANN_ACTION_TYPES } from "../../context/singleannounc/types.js";
import { MapFunction } from "./utils.jsx";

const API_key = import.meta.env.VITE_API_KEY;

maptilersdk.config.apiKey = `${API_key}`;

function Map() {
  const contextData = useAnnouncement();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const kiev = { lng: 30.523, lat: 50.45 };
  const [zoom] = useState(5);
  const disptach = useSingleDispatch();

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [kiev.lng, kiev.lat],
      zoom: zoom,
    });
  }, [contextData, zoom, kiev.lat, kiev.lng]);

  useEffect(() => {
    contextData.forEach((el) => {
      if (map.current.loaded()) {
        if (!map.current.getSource(`data-${el.id}`)) {
          MapFunction(
            map,
            disptach,
            el.id,
            el.geo,
            contextData,
            SINGLANN_ACTION_TYPES.addSinglAnn
          );
        }
      } else {
        map.current.on("load", function () {
          MapFunction(
            map,
            disptach,
            el.id,
            el.geo,
            contextData,
            SINGLANN_ACTION_TYPES.addSinglAnn
          );
        });
      }
    });
  }, [contextData]);

  return (
    <div className={styles.map_wrapper}>
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}

export default Map;
