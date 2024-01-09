import React, { useRef, useEffect, useState } from "react";
import styles from "./Map.module.css";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useAnnouncement } from "../../context/allanncontext/Anouncement.jsx";
import { useSingleDispatch } from "../../context/singleannounc/Singleannounce";
import { SINGLANN_ACTION_TYPES } from "../../context/singleannounc/types.js";
import { DrawInitMap, clickHandler } from "./utils.jsx";

const API_key = import.meta.env.VITE_API_KEY;

maptilersdk.config.apiKey = `${API_key}`;

function Map() {
  const contextData = useAnnouncement();
  const [clikeId, setClickedID] = useState(null);
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
    if (map.current.loaded()) {
      const newArr = [...contextData];
      const lastElem = newArr.slice(-1);
      DrawInitMap(map, lastElem[0].id, lastElem[0].geo, contextData);
      map.current.on("click", "unclustered-point", function (e) {
        const id = e.features[0].id;
        setClickedID(id);
      });
    } else {
      map.current.on("load", function () {
        contextData.forEach((el) => {
          DrawInitMap(map, el.id, el.geo, contextData);
        });
      });
      map.current.on("click", "unclustered-point", function (e) {
        const id = e.features[0].id;
        setClickedID(id);
      });
    }
  }, [contextData]);

  useEffect(() => {
    if (clikeId !== null) {
      clickHandler(
        clikeId,
        contextData,
        disptach,
        SINGLANN_ACTION_TYPES.addSinglAnn
      );
    }
  }, [clikeId]);

  return (
    <>
      <div className={styles.map_wrapper}>
        <div ref={mapContainer} className={styles.map} />
      </div>
    </>
  );
}

export default Map;
