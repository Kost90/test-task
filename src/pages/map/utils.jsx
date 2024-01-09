export const FilterAnnouncement = (data, id) => {
  console.log(data)
  console.log(id)
  const newArray = [...data];
  const result = newArray.filter((el) => el.id === id);
  return result;
};

export const DrawInitMap = (
  mapref,
  dispatch,
  id,
  geo,
  contextData,
  actionType
) => {
  if (mapref.current.getSource("places")) {
    const element = FilterAnnouncement(contextData, id);
    console.log(element[0].id)
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
      clusterMaxZoom: 14,
      clusterRadius: 50,
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
    mapref.current.on("click", "unclustered-point", function (e) {
      const id = e.features[0].id;
      console.log(id)
      const announce = FilterAnnouncement(contextData, id);
      console.log(announce)
      dispatch({
        type: actionType,
        payload: {
          id: announce[0].id,
          img: announce[0].img,
        },
      });
    });
  }
};

// export const AddPlace = (mapref, place) => {
//   const source = mapref.current.getSource("places");
//   console.log(place);
//   source.setData({
//     type: "FeatureCollection",
//     features: [
//       ...source._data.features,
//       {
//         type: "Feature",
//         id: `${place[0].id}`,
//         geometry: {
//           type: "Point",
//           coordinates: place[0].geo,
//         },
//       },
//     ],
//   });
//   mapref.current.on("click", "unclustered-point", function (e) {
//     const id = e.features[0].id;
//     const announce = FilterAnnouncement(contextData, id);
//     dispatch({
//       type: actionType,
//       payload: {
//         id: announce[0].id,
//         img: announce[0].img,
//       },
//     });
//   });
// };
