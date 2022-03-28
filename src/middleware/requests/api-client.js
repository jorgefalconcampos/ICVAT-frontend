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
        Object.entries(body).forEach(([key, value]) => { 
          urlencoded.append(key, value); 
        });

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
        Object.entries(body).forEach(([key, value]) => { 
          urlencoded.append(key, value); 
        });

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
      },

      // HTTP POST
      resetPassword: (headers, body) => {
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
        return this.post("/auth/users/reset_password/", requestOptions);
      },

    };
  }

  get categories() {
    return {

      // HTTP GET
      getAllCategories: (headers) => {
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        return this.get("/categories/", requestOptions);
      },

      // HTTP POST
      createCategory: (headers, body) => {
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
        return this.post(`/categories/`, requestOptions);
      },

      // HTTP GET
      getSingleCategory: (headers, id) => {
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        return this.get(`/categories/${id}`, requestOptions);
      },

      // HTTP PATCH
      updateCategory: (headers, id, body) => {
        var urlencoded = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => {
          urlencoded.append(key, value);
        });

        var requestOptions = {
          method: "PATCH",
          headers: headers,
          body: urlencoded,
          redirect: "follow",
        };
        return this.patch(`/categories/${id}/`, requestOptions);
      },

      // HTTP DELETE
      deleteCategory: (headers, id) => {
        var requestOptions = {
          method: "DELETE",
          headers: headers,
          redirect: "follow",
        };
        return this.delete(`/categories/${id}/`, requestOptions);
      },

    }
  }

  get documents() {
    return {
      getAllDocuments: (headers) => {
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        return this.get("/documents/", requestOptions)
      },

      getSingleDocument: (headers, uuid) => {
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        return this.get(`/documents/${uuid}`, requestOptions);
      },
      
      createDocument: (headers, body) => {
        var urlencoded = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => {
          key === "tags" ?  urlencoded.append(key, JSON.stringify(value)) : urlencoded.append(key, value);
        });

        var requestOptions = {
          method: "POST",
          headers: headers,
          body: urlencoded,
          redirect: "follow",
        };
        return this.post(`/documents/`, requestOptions);
      },

      updateDocument: (headers, uuid, body) => {
        var urlencoded = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => {
          key === "tags" ?  urlencoded.append(key, JSON.stringify(value)) : urlencoded.append(key, value);
        });

        var requestOptions = {
          method: "PATCH",
          headers: headers,
          body: urlencoded,
          redirect: "follow",
        };
        return this.patch(`/documents/${uuid}/`, requestOptions);
      },

      deleteDocument: (headers, uuid) => {
        var requestOptions = {
          method: "DELETE",
          headers: headers,
          redirect: "follow",
        };
        return this.delete(`/documents/${uuid}/`, requestOptions);
      },

    }
  }

  get tags() {
    return {
      getAllTags: (headers) => {
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };
        return this.get("/tags/", requestOptions)
      }
    }

  }
}

export default ApiClient  ;
