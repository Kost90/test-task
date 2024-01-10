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
  const bboxRounded = geoLocation.features[0].bbox.map((el) => {
    return Math.trunc(el)
  }) 
  dataObject = {
    ...newdata,
    geo: geoLocation.features[0].geometry.coordinates,
    bbox:bboxRounded,
  };
  return dataObject;
};
