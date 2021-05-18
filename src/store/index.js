import { createStore } from 'vuex'

export default createStore({
  state: {
	cart: [],
  item: []
  },
  mutations: {
    addCart(state, data){
      state.cart = [...state.cart, data]
    },
    updateCart(state, data){
      state.cart = [...state.cart, data]
    },
    removeCart(state, id){
      state.cart = state.cart.filter((data) => data.id !== id)
    },
    addData(state, data){
      state[data.name] = [...state[data.name], data.data]
    }
  },
  actions: {
  },
  modules: {
  }
})
