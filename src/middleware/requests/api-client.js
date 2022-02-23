import HttpClient from "./http-client";

class ApiClient extends HttpClient {
  constructor(baseURL, options) {
    super({
      baseURL,
      options
    });
  }
  
  // getter
  get users() {
    return {
        // HTTP GET
        get: (body) => {
            this.get("/auth/users", body)
        },

        // HTTP POST
        create: (headers, body) => {
            var urlencoded = new URLSearchParams();
            Object.entries(body).forEach(([key, value]) => { urlencoded.append(key, value)} );
            
            var requestOptions = {
                method: 'POST',
                headers: headers,
                body: urlencoded,
                redirect: 'follow'
            };

            return this.post("/auth/users/", requestOptions )
        },

        // HTTP UPDATE
        update: (user) => { 
            this.put(`/users/${user.id}`, user)
        },

        // DELETE
        delete: (id) => { 
            this.delete(`/users/${id}`)
        }
    };
  }
}

export default ApiClient;
