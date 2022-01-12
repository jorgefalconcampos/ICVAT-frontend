

const state = ()=> ({
    content: '',
    color: ''
})



const mutations = {
    showMessage (state, payload) {
      state.content = payload.content
      state.color = payload.color
    }
}


export default {
    state, 
    mutations
}