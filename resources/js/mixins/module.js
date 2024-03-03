import get from 'lodash/get';
import { mapState, mapActions } from 'vuex';

export default ({
  module, perPage, include, filters,
}) => {
  const capModule = module.charAt(0).toUpperCase() + module.slice(1);
  return {
    data() {
      return {
        [`page${capModule}`]: 1,
        [`perPage${capModule}`]: perPage,
      };
    },
    computed: {
      ...mapState({
        [module]: (state) => state[module].data,
        [`total${capModule}`]: (state) => state[module].total,
      }),
    },
    methods: {
      ...mapActions(module, { [`fetch${capModule}`]: 'fetch' }),
      [`navigate${capModule}`](page, params = {}) {
        const filter = [];
        if (filters) {
          filters.forEach(({ where, params: filterParams }) => {
            const paramsValues = [];
            let valid = true;
            filterParams.forEach((param) => {
              const value = get(this, param);
              if (value) {
                paramsValues.push(value);
              } else {
                valid = false;
              }
            });
            if (valid) {
              filter.push({ where, params: paramsValues });
            }
          });
        }
        this[`fetch${capModule}`]({ page, filter, ...params });
      },
    },
    created() {
      this[`navigate${capModule}`](1, {
        include,
        per_page: perPage,
      });
    },
  };
};
