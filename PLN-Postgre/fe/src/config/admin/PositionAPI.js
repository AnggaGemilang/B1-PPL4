import api from '../index'

export default {
  get: () => api.get("/positions?populate=*").then((res) => res.data),
  add: () => api.get("/positions?populate=*").then((res) => res.data),
  delete: () => api.get("/positions?populate=*").then((res) => res.data),
  edit: () => api.get("/positions?populate=*").then((res) => res.data),
}
