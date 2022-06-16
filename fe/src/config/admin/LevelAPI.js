import api from '../index'

export default {
  get: () => api.get("/levels?populate=*").then((res) => res.data),
  find: (query) => api.get(`/levels?populate=*${query}`).then((res) => res.data),
  // add: () => api.get("/levels?populate=*").then((res) => res.data),
  // delete: () => api.get("/levels?populate=*").then((res) => res.data),
  // edit: () => api.get("/levels?populate=*").then((res) => res.data),
}
