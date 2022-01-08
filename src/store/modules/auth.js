import axios from "axios";

const state = {
    // username: null,
    // email: null,

    userData: {
      user: null,
      email: null
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
    
      async LogIn({commit}, loginData) {
        let response = await axios.post("user/login/", loginData);
        // console.log(response);
        let username = response.data.username;
        let email = response.data.email;
        await commit("setUser", {
          username: username,
          email: email,
        });
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
    setUser(state, payload){
        // state.username = payload.username
        // state.email = payload.email
        state.userData.user = payload.username
        state.userData.email = payload.email

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
