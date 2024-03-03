function importAllEager(r) {
  return Object.keys(r).map((key) => ({
    path: `/${key.replace(/\.\/|\.vue/g, '')}`,
    component: r[key].default,
    meta: {
      // You might need to adjust this if the .bpmn property does not exist
      bpmn: r[key].bpmn,
    },
  }));
}

const routes = importAllEager(import.meta.globEager('./**/*.vue'));

export default routes;
