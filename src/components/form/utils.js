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
  console.log(data)
  dataObject = {
    // id:Number(data.length +1),
    ...newdata,
    geo: geoLocation,
  };
  return dataObject;
};
