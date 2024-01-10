import React, { useRef, useEffect, useState } from "react";
import styles from "./Map.module.css";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useAnnouncement } from "../../context/allanncontext/Anouncement.jsx";
import { useSingleDispatch } from "../../context/singleannounc/Singleannounce";
import { SINGLANN_ACTION_TYPES } from "../../context/singleannounc/types.js";
import { DrawInitMap, clickHandler } from "./utils.jsx";
import useMapClick from "../../hooks/usemapclick/useMapClick.jsx";
import useGetLayers from "./useGetLayers.jsx";

const API_key = import.meta.env.VITE_API_KEY;

maptilersdk.config.apiKey = `${API_key}`;

function Map() {
  const contextData = useAnnouncement();
  const { clickeId, handelChange } = useMapClick();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const kiev = { lng: 30.523, lat: 50.45 };
  const [zoom, setZoom] = useState(5);
  const disptach = useSingleDispatch();
  const { handelChangeZoom, handelChangeBbox, layers } = useGetLayers(map);

  // initialize the map
  useEffect(() => {
    if (map.current) {
      return;
    }
    {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [kiev.lng, kiev.lat],
        zoom: zoom,
      });
    }
  }, [contextData, zoom, kiev.lat, kiev.lng]);

  // initial draw the map
  useEffect(() => {
    if (map.current.loaded()) {
      const newArr = [...contextData];
      const lastElem = newArr.slice(-1);
      DrawInitMap(
        map,
        lastElem[0].id,
        lastElem[0].geo,
        lastElem[0].bbox,
        contextData
      );
      map.current.on("click", "unclustered-point", function (e) {
        const id = e.features[0].id;
        handelChange(id);
      });
    } else {
      map.current.on("load", function () {
        contextData.forEach((el) => {
          DrawInitMap(map, el.id, el.geo, el.bbox, contextData);
        });
      });
      map.current.on("zoom", function () {
        const currentZoom = map.current.getZoom();
        const currentBbox = map.current.getBounds();
        handelChangeZoom(currentZoom);
        handelChangeBbox(currentBbox);
      });
      map.current.on("click", "unclustered-point", function (e) {
        const id = e.features[0].id;
        handelChange(id);
      });
    }
  }, [contextData]);

  // added clicked layer to the cardlist
  useEffect(() => {
    if (clickeId !== null) {
      clickHandler(
        clickeId,
        contextData,
        disptach,
        SINGLANN_ACTION_TYPES.addSinglAnn
      );
    }
  }, [clickeId, layers]);

  return (
    <>
      <div className={styles.map_wrapper}>
        <div ref={mapContainer} className={styles.map} />
      </div>
    </>
  );
}

export default Map;
