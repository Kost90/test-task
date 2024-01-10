import React, { useEffect, useState } from "react";
import { useAnnouncement } from "../../context/allanncontext/Anouncement";

function useGetLayers(mapref) {
  const context = useAnnouncement();
  const [zoomLeve, setZoomLevel] = useState(0);
  const [bbox, setBbox] = useState(null);
  const [layers, setLayers] = useState([]);

  function FilterLayer(context, bbox) {
    const newArr = [...context];
    const bboxArr = [bbox._ne.lng, bbox._sw.lat, bbox._sw.lng, bbox._ne.lat];
    console.log(bboxArr);
    const filteredArr = newArr.filter((el) => {
      console.log(el.bbox);
      if (arraysEqual(el.bbox, bboxArr)) {
        return el;
      } else return;
    });
    setLayers((prev) => (prev = filteredArr));
  }

  const handelChangeZoom = (data) => {
    setZoomLevel(data);
  };

  const handelChangeBbox = (data) => {
    setBbox(data);
  };

  useEffect(() => {
    const zoomThreshold = 0.1;

    if (Math.abs(zoomLeve - 12) < zoomThreshold && layers.length === 0) {
      FilterLayer(context, bbox);
    }
  }, [zoomLeve]);

  return { zoomLeve, bbox, handelChangeZoom, handelChangeBbox };
}

export default useGetLayers;

function arraysEqual(a, b) {
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
