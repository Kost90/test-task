import { useCallback, useEffect, useState } from "react";
import { useAnnouncement } from "../../context/allanncontext/Anouncement";
import { useSingleDispatch } from "../../context/singleannounc/Singleannounce";
import { SINGLANN_ACTION_TYPES } from "../../context/singleannounc/types";
import { arraysEqual } from "./utils";

function useGetLayers(mapref) {
  const context = useAnnouncement();
  const [zoomLeve, setZoomLevel] = useState(0);
  const [bbox, setBbox] = useState(null);
  const [layers, setLayers] = useState([]);
  const disptach = useSingleDispatch();

  const FilterLayer = useCallback((context, bbox) => {
    const newArr = [...context];
    const bboxArr = [
      Math.trunc(bbox._ne.lng),
      Math.trunc(bbox._sw.lat),
      Math.trunc(bbox._sw.lng),
      Math.trunc(bbox._ne.lat),
    ];
    const filteredArr = newArr.filter((el) => {
      if (arraysEqual(el.bbox, bboxArr)) {
        return el;
      } else return;
    });
    setLayers((prev) => (prev = filteredArr));
    console.log(filteredArr);
  }, []);

  const handelChangeZoom = useCallback((data) => {
    setZoomLevel(data);
  }, []);

  const handelChangeBbox = useCallback((data) => {
    setBbox(data);
  }, []);

  useEffect(() => {
    const zoomThreshold = 0.1;
    if (Math.abs(zoomLeve - 12) < zoomThreshold && layers.length === 0) {
      FilterLayer(context, bbox);
    } else if (Math.abs(zoomLeve - 8) < zoomThreshold && layers.length !== 0) {
      console.log("true");
      const emptyArr = [];
      disptach({
        type: SINGLANN_ACTION_TYPES.addShowingLayers,
        payload: emptyArr,
      });
    }
  }, [zoomLeve, bbox]);

  useEffect(() => {
    const zoomThreshold = 0.1;
    if (Math.abs(zoomLeve - 12) < zoomThreshold && layers.length !== 0) {
      disptach({
        type: SINGLANN_ACTION_TYPES.addShowingLayers,
        payload: layers,
      });
    }
  }, [zoomLeve]);

  return { zoomLeve, bbox, handelChangeZoom, handelChangeBbox };
}

export default useGetLayers;
