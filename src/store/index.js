import { createStore } from 'vuex'

export default createStore({
  state: {
    store: '',
    payment: {
      nome: '', // Nome do recebedor
      valor: '', // Valor do pagamento
      cidade: '', // Cidade do recebedor
      saida: '', // Use br para string e qr para imagem
      txid: '', // Identificador único do pagamento
      chave: '', // Chave pix do recebedor
    }
  },
  getters: {
    getStore(state) {
      return state.store
    },
    getPayment(state) {
      return state.payment
    }
  },
  mutations: {
    setStore(state, payload) {
      state.store = payload
    },
    setPayment(state, payload) {
      state.payment = payload
    }
  },
  actions: {
    setStore({ commit }, payload) {
      commit('setStore', payload)
    },
    setPayment({ commit }, payload) {
      commit('setPayment', payload)
    }
  },
  modules: {
  }
})
