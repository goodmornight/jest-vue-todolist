import { createStore } from 'vuex'

const store = createStore({
  state () {
    return { inputValue: '' }
  },
  mutations: {
    changeInputValue (state, payload) {
      state.inputValue = payload
    }
  }
})

export default store
