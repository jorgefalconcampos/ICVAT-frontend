import HttpClient from "./http-client";
import { apiHost } from "../../config";

class ApiClient extends HttpClient {
  static urlBase = apiHost;

  constructor(baseURL, options) {
    super({
      baseURL,
      options,
    });
  }

  // getter
  get users() {
    return {
      // HTTP GET
      get: (body) => {
        this.get("/auth/users", body);
      },

      // HTTP POST
      create: (headers, body) => {
        var urlencoded = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => {
          urlencoded.append(key, value);
        });

        var requestOptions = {
          method: "POST",
          headers: headers,
          body: urlencoded,
          redirect: "follow",
        };
        return this.post("/auth/users/", requestOptions);
      },

      // HTTP UPDATE
      update: (user) => {
        this.put(`/users/${user.id}`, user);
      },

      // HTTP DELETE
      delete: (id) => {
        this.delete(`/users/${id}`);
      },

      // HTTP POST
      activate: (headers, body) => {
        var urlencoded = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => { urlencoded.append(key, value); } );

        var requestOptions = {
          method: "POST",
          headers: headers,
          body: urlencoded,
          redirect: "follow",
        };
        return this.post("/auth/users/activation/", requestOptions);
      },

      // HTTP POST
      login: (headers, body) => {
        var urlencoded = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => { urlencoded.append(key, value); } );

        var requestOptions = {
          method: "POST",
          headers: headers,
          body: urlencoded,
          redirect: "follow",
        };
        return this.post("/auth/token/login/", requestOptions);
      },

      // HTTP POST
      logout: (headers) => {
        var requestOptions = {
          method: "POST",
          headers: headers,
          redirect: "follow",
        };
        return this.post("/auth/token/logout/", requestOptions);
      },

      // HTTP GET
      getUserDetails: (headers) => {
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        return this.get("/auth/users/me/", requestOptions);
      }

    };
  }

  get categories() {
    return {
      getAllCategories: (headers) => {
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        return this.get("/categories/", requestOptions);
      },

      getSingleCategory: (headers, id) => {
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        return this.get(`/categories/${id}`, requestOptions);
      },

      deleteCategory: (headers, id) => {
        var requestOptions = {
          method: "DELETE",
          headers: headers,
          redirect: "follow",
        };
        return this.get(`/categories/${id}/`, requestOptions);
      },

    }

  }
}

export default ApiClient  ;
