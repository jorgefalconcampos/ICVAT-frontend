
const state = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: 'dark',
    SidebarBg: 'dark',
    content: '',
    color: '',
    activeListen: false,
};

const getters = {
    sidebar: state => state.Sidebar_drawer,
    isActiveListenMode: state => state.activeListen
};

const actions = {
    setActiveListenMode({ commit }, value){
        commit("SET_ACTIVE_LISTEN_MODE", value)
    }
};

const mutations = {
    SET_SIDEBAR_DRAWER (state, payload) {
        state.Sidebar_drawer = payload
    },
    SET_CUSTOMIZER_DRAWER (state, payload) {
        state.Customizer_drawer = payload
    },
    SET_SIDEBAR_COLOR (state, payload) {
        state.SidebarColor = payload
    },

    SET_ACTIVE_LISTEN_MODE (state, payload) {
        state.activeListen = payload
    }

    // showMessage (state, payload) {
    //   state.content = payload.content
    //   state.color = payload.color
    // }
}

const uiux = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default uiux