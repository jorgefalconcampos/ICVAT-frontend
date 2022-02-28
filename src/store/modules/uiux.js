
const state = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: 'dark',
    SidebarBg: 'dark',

    content: '',
    color: ''
};

const getters = {
    sidebar: state => state.Sidebar_drawer,
}

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

    // showMessage (state, payload) {
    //   state.content = payload.content
    //   state.color = payload.color
    // }
}

const uiux = {
    namespaced: true,
    state,
    getters,
    mutations
};

export default uiux