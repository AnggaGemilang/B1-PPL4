import api from '../index'

export default {
  get: () => api.get("/subfields?populate=*").then((res) => res.data),
  add: () => api.get("/subfields?populate=*").then((res) => res.data),
  delete: () => api.get("/subfields?populate=*").then((res) => res.data),
  edit: () => api.get("/subfields?populate=*").then((res) => res.data),
}
