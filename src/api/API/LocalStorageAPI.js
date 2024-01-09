import { API } from "./API";
import { data } from "../data/DataApi";

class LocalStarageAPI extends API {
  constructor() {
    super();
  }

  getData() {
    return JSON.parse(localStorage.getItem("data"));
  }

  getSinglData({ id }) {
    const data = JSON.parse(localStorage.getItem("data"));
    const newId = Number(id.id);
    const newArrya = [...data];
    const result = newArrya.filter((el) => el.id === newId);
    return result;
  }

  setData(newdata) {
    if (newdata !== null) {
      localStorage.setItem("data", JSON.stringify(newdata));
    } else {
      localStorage.setItem("data", JSON.stringify(olddata));
    }
  }
}

export default new LocalStarageAPI(data);
