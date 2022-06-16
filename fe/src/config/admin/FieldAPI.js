import api from '../index'

export default {
  get: () => api.get("/fields?populate=*").then((res) => res.data),
  find: (query) => api.get(`/fields?populate=*${query}`).then((res) => res.data),
  // add: () => api.get("/fields?populate=*").then((res) => res.data),
  // delete: () => api.get("/fields?populate=*").then((res) => res.data),
  // edit: () => api.get("/fields?populate=*").then((res) => res.data),
}
