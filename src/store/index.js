import { createStore } from 'vuex'

export default createStore({
  state: {
    store: '',
  },
  getters: {
    getStore(state) {
      return state.store
    }
  },
  mutations: {
    setStore(state, payload) {
      state.store = payload
    }
  },
  actions: {
    setStore({ commit }, payload) {
      commit('setStore', payload)
    }
  },
  modules: {
  }
})
