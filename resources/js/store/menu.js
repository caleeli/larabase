/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/**
 * HOW TO: get user from localstorage if present
 * const user = JSON.parse(localStorage.getItem('user'));
 * const rolId = user ? user.rol_id : null;
 * const roles = {
 *   ADMIN: 1,
 *   GERENCIA: 2,
 *   SUPERVISOR: 3,
 *   AUDITOR: 4,
 * };
 */

// menues disponibles:
const Inicio = {
  title: 'Mis tareas',
  icon: 'fas fa-home',
  page: '/Inicio',
};
const Proyectos = {
  title: 'Proyectos',
  icon: 'fas fa-project-diagram',
  page: '/Proyectos',
};
const Archivos = {
  title: 'Archivos',
  icon: 'fas fa-archive',
  page: '/Archivos',
};
const Usuarios = {
  title: 'Usuarios',
  icon: 'fas fa-users',
  page: '/UsuarioLista',
};

const state = {
  menuItems: [
    Inicio,
    Proyectos,
    Archivos,
    Usuarios,
  ],
};

const mutations = {
  setMenuItems(state, menuItems) {
    state.menuItems = menuItems;
  },
};

const actions = {
  fetchMenuItems({ commit }) {
    fetch('/api/menu')
      .then((response) => response.json())
      .then((data) => {
        commit('setMenuItems', data);
      });
  },
};

const getters = {
  getMenuItems: (state) => state.menuItems,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
