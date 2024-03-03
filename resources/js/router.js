import VueRouter from 'vue-router';
import routes from './pages';
import store from './store';

const router = new VueRouter({
  mode: 'hash',
  routes,
});

// on before
router.beforeEach(async (to, from, next) => {
  next();
  if (to.query.instance) {
    await store.dispatch('workflow/openInstance', to.query.instance);
  } else if (to.query.record) {
    await store.dispatch('workflow/openRecord', to.query.record);
  }
});

export default router;
