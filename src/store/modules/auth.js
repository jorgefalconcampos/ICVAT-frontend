import axios from "axios";

const state = {
    user: null,
    posts: null
};

const getters = {
    isAuthenticated: state => !!state.user,    
    StatePosts: state => state.posts,
    StateUser: state => state.user,
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
        await axios.post("user/login/", loginData);
        await commit("setUser", loginData.get("email"));
      },
    
      async CreatePost({ dispatch }, post) {
        await axios.post("post", post);
        return await dispatch("GetPosts");
      },
    
      async GetPosts({ commit }) {
        let response = await axios.get("posts");
        commit("setPosts", response.data);
      },
    
      async LogOut({ commit }) {
        let user = null;
        await axios.post("user/logout/", user);
        commit("logout", user);
      },
};

const mutations = {
    setUser(state, email){
        state.user = email
    },
    setPosts(state, posts){
        state.posts = posts
    },
    LogOut(state){
        state.user = null
        state.posts = null
    },
};


export default {
  state,
  getters,
  actions,
  mutations
};
