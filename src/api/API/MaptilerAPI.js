// import { API } from "../API/API";
import * as maptilersdk from "@maptiler/sdk";

const url = "https://api.maptiler.com/geocoding/";

class MaptilerAPI {
  async getGeo(value) {
    const response = await maptilersdk.geocoding.forward(value, {
      language: [maptilersdk.geocoding.language.UKRAINIAN],
    });

    return response;
  }
}

export default new MaptilerAPI();
