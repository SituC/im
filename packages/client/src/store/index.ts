import {createStore} from 'vuex'

const store = createStore({
  state() {
    return {
      user: {},
      currentRoom: {},
    }
  },
  mutations: {
    setUser: (state: any, newValue) => {
      state.user = newValue
    },
    clearUser: (state: any) => {
      localStorage.clear()
      state.user = {}
    },
    setRoom: (state: any, newValue) => {
      state.currentRoom = newValue
    },
  },
  actions: {
  }
})

export default store