import MaptilerAPI from "../../api/API/MaptilerAPI";

export const FilterKeys = async (data) => {
  let dataObject = {};
  const newdata = {};
  const geo = [];
  for (const [key, value] of data) {
    if (key === "img") {
      newdata[key] = URL.createObjectURL(value);
    } else {
      geo.push(value);
    }
  }
  const geostring = geo.join(" ");
  const geoLocation = await MaptilerAPI.getGeo(geostring);
  dataObject = {
    ...newdata,
    geo: geoLocation.features[0].geometry.coordinates,
    bbox:geoLocation.features[0].bbox,
  };
  return dataObject;
};
