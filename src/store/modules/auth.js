import axios from "axios";

const state = {
    username: null,
    email: null,
    // posts: null
};

const getters = {
    isAuthenticated: state => !!state.email,    
    StatePosts: state => state.posts,
    StateUser: state => state.email,
};

const actions = {
    async Register({dispatch}, form) {
        await axios.post('register', form)
        let UserForm = new FormData()
        UserForm.append('email', form.username)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
      },
    
      async LogIn({commit}, loginData) {
        let response = await axios.post("user/login/", loginData);

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
        state.username = payload.username
        state.email = payload.email
    },
    setPosts(state, posts){
        state.posts = posts
    },
    doLogout(state){
      state.email = null;
      state.username = null;
    },
};


export default {
  state,
  getters,
  actions,
  mutations
};
