class API {
  constructor(baseurl) {
    this.baseurl = baseurl;
  }

  fetch({ path = "", method = "GET", body, signal, headers = {}, ...rest }) {
    return fetch(`${this.baseUrl}/${path}`, {
      method,
      signal,
      headers: {
        ContentType: "application/json",
        ...headers,
      },
      body,
      ...rest,
    }).then((response) => response.json());
  }
}

export { API };
