import axios from "axios";
import apiClient from "../../middleware/requests/api-client";


const state = {
    // username: null,
    // email: null,

    userToken: {
      token: null
    },

    userData: {
      id: null,
      email: null,
      username: null,
      first_name: null,
      last_name: null,
    }
    // posts: null
};

const getters = {
    isAuthenticated: state => !!state.userData.email,    
    userInfo: state => state.userData,    
    StatePosts: state => state.posts,
    StateUser: state => state.userData.email,
};

const actions = {
    async Register({dispatch}, registerData) {
        let response = await axios.post('user/signup/', registerData)
        console.log(`\n auuuuth: ${JSON.stringify(response.data)}`);

        
        // let username = registerData.username;
        // let email = registerData.email;

        await dispatch("LogIn", registerData)

      },
    
      async LogIn({ dispatch }, loginData) {
        const client = new apiClient(apiClient.urlBase);
        const myHeaders = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
        const response = await client.users.login(myHeaders, loginData)
        .then(r => r.text().then(data => ({status: r.status, body: data})))

        if (response.status == 200) {
          console.log("Logueado exitosamente, mensaje desde vuex")
          const token = (JSON.parse([response.body]).auth_token)

          await dispatch("setAuthToken", token)

          await dispatch("getUserData", token)

          // await commit("setUser", {
          //   // username: username,
          //   email: loginData.email,
          // });
        }
        return response;
        // console.log(response)

        // let response = await axios.post("user/login/", loginData);
        // // console.log(response);
        // let username = response.data.username;
        // let email = response.data.email;
      },

      async setAuthToken({ commit }, token) {
        commit("setToken", token)
      },

      async getUserData({ commit }, token) {
        console.log("llego aki")
        const client = new apiClient(apiClient.urlBase);
        const myHeaders = new Headers({"Authorization": `Bearer ${token}`});
        const response = await client.users.getUserDetails(myHeaders)
        .then(r => r.text().then(data => ({status: r.status, body: data})))

        if (response.status == 200) {
          var payload = JSON.parse([response.body])
          commit("setUserData", payload)
        }
      },
    
      async CreatePost({ dispatch }, post) {
        await axios.post("post", post);
        return await dispatch("GetPosts");
      },
    
      async GetPosts({ commit }) {
        let response = await axios.get("posts");
        commit("setPosts", response.data);
      },
    
      async LogOut({commit}) {

        let username = null;
        let email = null;

        await axios.post("user/logout/", {});

        commit("doLogout", {
          username: username,
          email: email,
        });


      },
};

const mutations = {
    // setUser(state, payload){
    //     // state.username = payload.username
    //     // state.email = payload.email
    //     state.userData.user = payload.username
    //     state.userData.email = payload.email

    // },

    setUserData(state, payload) {
      state.userData.id = payload.id;
      state.userData.email = payload.email;
      state.userData.username = payload.username;
      state.userData.first_name = payload.first_name;
      state.userData.last_name = payload.last_name;
    },

    setToken(state, token) {
      state.userToken.token = token
    },
    
    setPosts(state, posts){
        state.posts = posts
    },
    doLogout(state){
      // state.email = null;
      // state.username = null;
      state.userData.email = null;
      state.userData.user = null;
    },
};


export default {
  state,
  getters,
  actions,
  mutations
};
