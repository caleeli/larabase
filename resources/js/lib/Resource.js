export default class Resource {
  static index(array, url, params) {
    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        array.splice(0, array.length, ...data.data);
      });
    return array;
  }
}
