export const FilterAnnouncement = (data, id) => {
  const newArray = [...data];
  const result = newArray.filter((el) => el.id === id);
  return result;
};

export const MapFunction = (
  mapref,
  dispatch,
  id,
  geo,
  contextData,
  actionType
) => {
  mapref.current.addSource(`data-${id}`, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: id,
          geometry: {
            type: "Point",
            coordinates: geo,
          },
        },
      ],
    },
  });
  mapref.current.addLayer({
    id: `data-${id}`,
    type: "circle",
    source: `data-${id}`,
    paint: {
      "circle-radius": 10,
      "circle-color": "#FF0000",
    },
  });
  mapref.current.on("click", `data-${id}`, function (e) {
    const id = e.features[0].id;
    const announce = FilterAnnouncement(contextData, id);
    dispatch({
      type: actionType,
      payload: {
        id: announce[0].id,
        img: announce[0].img,
      },
    });
  });
};
