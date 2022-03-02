// Thanks to Simon Ström - https://tinyurl.com/yfasvsv6

class HttpClient {
    constructor(options = {}) {
      this._baseURL = options.baseURL || "";
      this._body = options.body || {};
    }

    static async callEndpoint(url, requestOptions) {
        const r =  await fetch(url, requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.error('error', error));
        return r;
    }
    
    get(endpoint, requestOptions) {
        const url=this._baseURL + endpoint;
        return HttpClient.callEndpoint(url, requestOptions)
    }
  
    post(endpoint, requestOptions) {
        const url=this._baseURL + endpoint;
        return HttpClient.callEndpoint(url, requestOptions)
    }
  
    // put(endpoint, body, options = {}) {
    //   return this.callEndpoint(endpoint, {
    //     ...options,
    //     body: body ? JSON.stringify(body) : undefined,
    //     method: "PUT"
    //   });
    // }
  
    patch(endpoint, requestOptions) {
      const url = this._baseURL + endpoint;
      return HttpClient.callEndpoint(url, requestOptions)
    }
  
    delete(endpoint, requestOptions) {
      const url = this._baseURL + endpoint;
      return HttpClient.callEndpoint(url, requestOptions)
    }
  }
  
  export default HttpClient;
  