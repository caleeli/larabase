import Vue from 'vue';
import Vuex from 'vuex';

function importAll(r) {
  const modules = {};
  Object.keys(r).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(r, key) && key !== './index.js') {
      const name = key.replace(/\.\/|\.js/g, '');
      modules[name] = r[key].default;
    }
  });
  return modules;
}

const modules = importAll(import.meta.globEager('./*.js'));

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
});
