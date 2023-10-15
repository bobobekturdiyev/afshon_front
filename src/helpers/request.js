import axios from "axios";

class ApiRequest {
  endPoint = process.env.VUE_APP_URL + "/";

  filterUrl(url) {
    if (url[0] === "/") {
      url = url.substring(1);
    }
    return url;
  }

  getHeader() {
    return {
      "Access-Control-Allow-Origin": "*",
      "X-Language": "uz",
    };
  }

  get(url) {
    let headers = this.getHeader();
    url = this.endPoint + this.filterUrl(url);

    return new Promise(function (resolve, reject) {
      axios
        .get(url, { headers: headers })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  post(url) {
    let headers = this.getHeader();
    url = this.endPoint + this.filterUrl(url);

    return new Promise(function (resolve, reject) {
      axios
        .post(url, { headers: headers })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default new ApiRequest();
