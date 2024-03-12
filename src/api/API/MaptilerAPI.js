import * as maptilersdk from "@maptiler/sdk";

class MaptilerAPI {
  async getGeo(value) {
    const response = await maptilersdk.geocoding.forward(value, {
      language: [maptilersdk.geocoding.language.UKRAINIAN,maptilersdk.geocoding.language.ENGLISH],
      country: ["UA","GB"],
    });
    return response;
  }
}

export default new MaptilerAPI();
