/* eslint-disable no-param-reassign */
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import helpers from './mixins/helpers';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../css/variables.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue, {
  BFormDatepicker: {
    locale: 'es-BO',
    labelNoDateSelected: 'Seleccionar fecha',
    labelHelp: 'Use las teclas de cursor para navegar las fechas del calendario',
  },
  BTable: {
    striped: true,
    bordered: true,
    outlined: false,
  },
});
// Directive to handle scroll
Vue.directive('scroll', {
  inserted(el, binding) {
    const onScroll = (event) => {
      binding.value(event);
    };
    el.addEventListener('scroll', onScroll);
    el.onScroll = onScroll;
  },
  unbind(el) {
    el.removeEventListener('scroll', el.onScroll);
    delete el.onScroll;
  },
});
// Directive to handle scroll in a table
const apiScroll = {
  bind(el, binding) {
    binding.value.originalPerPage = binding.value.perPage;
  },
  inserted(el, binding) {
    const onScroll = (event) => {
      apiScroll.handleScroll(event, binding.value);
    };
    el.addEventListener('scroll', onScroll);
    el.onScroll = onScroll;
  },
  unbind(el) {
    el.removeEventListener('scroll', el.onScroll);
    delete el.onScroll;
  },
  isElementVisibleInScrollable(parent, tr) {
    const rect = tr.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    // Check if the element is within the visible area of the scrollable parent
    const isVisibleInScrollable = rect.top >= parentRect.top
      && rect.left >= parentRect.left
      && rect.bottom <= parentRect.bottom
      && rect.right <= parentRect.right;

    return isVisibleInScrollable;
  },
  handleScroll(event, binding) {
    const table = event.target;
    const tr = table.querySelector('tbody tr:last-child');
    const currentCount = (binding.currentPage - 1) * binding.perPage
      + binding.itemsLength;
    if (
      this.isElementVisibleInScrollable(table, tr)
      && currentCount < binding.totalRows
    ) {
      this.fetchMoreData(binding);
    }
  },
  fetchMoreData(binding) {
    if (!binding.loading) {
      binding.perPage += binding.originalPerPage;
    }
  },
};
Vue.directive('api-scroll', apiScroll);
Vue.mixin(helpers);

// Intl.DateTimeFormat().resolvedOptions().locale = 'es-BO';
// navigator.language = "es";

const originalFetch = window.fetch;
window.fetch = (url, options = {}, ...args) => {
  options.headers = options.headers || {};
  if (!options.headers['X-Requested-With']) {
    options.headers['X-Requested-With'] = 'XMLHttpRequest';
    // csrf token
    const token = document.head.querySelector('meta[name="csrf-token"]');
    if (token) {
      options.headers['X-CSRF-TOKEN'] = token.content;
    }
  }
  return originalFetch(url, options, ...args);
};
