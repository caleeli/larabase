import './bootstrap';
import Vue from 'vue';
import { mapState } from 'vuex';
import Layout from './components/Layout.vue';
import BFormButtons from './components/BFormButtons.vue';
import SearchInput from './components/SearchInput.vue';
import Upload from './components/Upload.vue';
import UploadButton from './components/UploadButton.vue';
import Pagination from './components/Pagination.vue';
import router from './router';
import store from './store';
import ApiService from './lib/ApiService';
import FormSelect from './components/FormSelect.vue';
import Workflow from './lib/Workflow';

Vue.prototype.$api = new ApiService();
Vue.component('b-form-buttons', BFormButtons);
Vue.component('search-input', SearchInput);
Vue.component('b-form-file', Upload);
Vue.component('b-button-upload', UploadButton);
Vue.component('b-pagination', Pagination);
Vue.component('b-form-select', FormSelect);

window.app = new Vue({
  router,
  store,
  el: '#app',
  components: {
    Layout,
  },
  template: '<Layout />',
});

Vue.prototype.$workflow = new Workflow(window.app);
Vue.prototype.dateFormat = (datetimeString) => {
  // convert a datetime string like "2023-07-15T01:35:54.000000Z" to a date string
  // like "15/07/2023"
  const datetime = new Date(datetimeString);
  // Fix local time zone
  if (datetimeString.indexOf('T') === -1) {
    datetime.setMinutes(datetime.getMinutes() + datetime.getTimezoneOffset());
  }
  const day = datetime.getDate();
  const month = datetime.getMonth() + 1;
  const year = datetime.getFullYear();

  // Padding single digits with leading zeros
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');

  return `${formattedDay}/${formattedMonth}/${year}`;
};
Vue.prototype.dateTimeFormat = (datetimeString) => {
  // convert a datetime string like "2023-07-15T01:35:54.000000Z" to a date string
  // like "15/07/2023 01:35:54"
  const datetime = new Date(datetimeString);
  const day = datetime.getDate();
  const month = datetime.getMonth() + 1;
  const year = datetime.getFullYear();
  const hours = datetime.getHours();
  const minutes = datetime.getMinutes();
  const seconds = datetime.getSeconds();

  // Padding single digits with leading zeros
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
Vue.prototype.mixins = [
  {
    computed: {
      ...mapState({
        user: (state) => state.user,
      }),
    },
  },
];

window.alertMsg = (message, variant = 'info') => {
  // first line is the title
  const title = variant === 'danger' ? 'Error' : 'Información';
  window.app.$bvToast.toast(message, {
    title,
    variant,
    solid: true,
    autoHideDelay: 5000,
  });
};

window.alert = window.alertMsg;
