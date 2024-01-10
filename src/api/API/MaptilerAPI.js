import * as maptilersdk from "@maptiler/sdk";

class MaptilerAPI {
  async getGeo(value) {
    const response = await maptilersdk.geocoding.forward(value, {
      language: [maptilersdk.geocoding.language.UKRAINIAN],
      country: ["UA"],
    });
    return response;
  }
}

export default new MaptilerAPI();
