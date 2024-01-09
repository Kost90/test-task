export const FilterAnnouncement = (data, id) => {
  const newArray = [...data];
  const result = newArray.filter((el) => el.id === id);
  return result;
};

export const FilterCardList = (layers, data) => {
  let Arr = [...data];
  let newShowArr = [];
  layers.forEach((element) => {
    newShowArr = Arr.filter((el) => el.id === element.id);
  });
  console.log(newShowArr);
  return newShowArr;
};

export const DrawInitMap = (mapref, id, geo, contextData) => {
  if (mapref.current.getSource("places")) {
    const element = FilterAnnouncement(contextData, id);
    const source = mapref.current.getSource("places");
    source.setData({
      type: "FeatureCollection",
      features: [
        ...source._data.features,
        {
          type: "Feature",
          id: `${element[0].id}`,
          geometry: {
            type: "Point",
            coordinates: element[0].geo,
          },
        },
      ],
    });
  } else {
    mapref.current.addSource("places", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            id: `${id}`,
            geometry: {
              type: "Point",
              coordinates: geo,
            },
          },
        ],
      },
      cluster: true,
      clusterMaxZoom: 9,
      clusterRadius: 30,
    });
    mapref.current.addLayer({
      id: "clusters",
      type: "circle",
      source: "places",
      filter: ["has", "point_count"],
      paint: {
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#51bbd6",
          750,
          "#51bbd6",
        ],
      },
    });
    mapref.current.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "places",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });
    mapref.current.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "places",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 8,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });
  }
};

export const clickHandler = (id, context, disptach, actiontype) => {
  const clickedId = id;
  const announce = FilterAnnouncement(context, clickedId);
  disptach({
    type: actiontype,
    payload: {
      id: announce[0].id,
      img: announce[0].img,
    },
  });
};
