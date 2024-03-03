import './bootstrap';
import Vue from 'vue';

import Login from './components/Login.vue';

export default new Vue({
  el: '#app',
  components: {
    Login,
  },
  template: '<Login />',
});
