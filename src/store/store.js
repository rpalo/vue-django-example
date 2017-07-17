import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex)
const apiRoot = 'http://localhost:8000'

const store = new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    'GET_TODOS': function (state, response) {
      state.todos = response.body
    },
    'ADD_TODO': function (state, response) {
      state.todos.push(response.body)
    },
    'CLEAR_TODOS': function (state) {
      const todos = state.todos
      todos.splice(0, todos.length)
    },
    'API_FAIL': function (state, error) {
      console.error(error)
    }
  },
  actions: {
    getTodos (store) {
      return api.get(apiRoot + '/todos/')
        .then((response) => store.commit('GET_TODOS', response))
        .catch((error) => store.commit('API_FAIL', error))
    },
    addTodo (store, todo) {
      return api.post(apiRoot + '/todos/', todo)
        .then((response) => store.commit('ADD_TODO', response))
        .catch((error) => store.commit('API_FAIL', error))
    },
    clearTodos (store) {
      return api.delete(apiRoot + '/todos/clear_todos/')
        .then((response) => store.commit('CLEAR_TODOS'))
        .catch((error) => store.commit('API_FAIL', error))
    }
  }
})

export default store
