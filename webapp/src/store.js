import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const mutations = {
  login: function(state) {
    state.loginState = { ...state.loginState, loggedIn: true };
  },
  logout: function(state) {
    state.loginState = { ...state.loginState, loggedIn: false };
  },
  addToDo(state, todo) {
    state.todoIdx = state.todoIdx + 1;
    state.todos = [...state.todos, { ...todo, done: false, id: state.todoIdx}];
  },
  updateToDo(state, todo) {
    state.todos = state.todos.map(td => (td.id === todo.id ? todo : td));
  },
  deleteToDo(state, todo) {
    state.todos = state.todos.filter(td => td.id !== todo.id);
  },
  todosLoaded(state, todos) {
    state.todos = todos;
  },
  categoriesLoaded(state, categories) {
    state.categories = categories;
  }
};

export const actions = {
  login: function({ commit, dispatch }, payload) {
    const { email, password } = payload;
    return axios.post("/api/login", { email, password }).then(() => {
      commit("login");
      return dispatch("loadTodos");
    });
  },
  logout: function({ commit }) {
    return axios.get("/api/logout").then(() => {
      commit("logout");
    });
  },
  addToDo({ commit }, toDo) {
    return axios.post("/api/todos", toDo).then(response => {
      commit("addToDo", response.data);
    });
  },
  updateTodo({ commit }, toDo) {
    return axios.put(`/api/todos/${toDo.id}`, toDo).then(response => {
      commit("updateToDo", response.data);
    });
  },
  deleteTodo({ commit }, toDo) {
    return axios.delete(`/api/todos/${toDo.id}`).then(() => {
      commit("deleteToDo", toDo);
    });
  },
  loadToDos({ commit }) {
    return axios.get("/api/todos").then(response => {
      commit("todosLoaded", response.data);
    });
  },
  checkLoggedIn({ commit }) {
    return axios.get("/api/checkLogin").then(() => {
      commit("login");
    });
  },
  loadCategories({ commit }) {
    //commit("categoriesLoaded", [{id: 1, name: "meep"}, {id: 2, name:"moop"}])
    return axios.get("/api/cats").then(response => {
      commit("categoriesLoaded", response.data);
    });
  }
};

export default new Vuex.Store({
  state: {
    todos: [],
    categories: [],
    loginState: {
      loggedIn: false
    },
    todoIdx: 0
  },
  mutations,
  actions
});
