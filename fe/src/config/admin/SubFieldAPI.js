import api from '../index'

export default {
  get: () => api.get("/sub-fields?populate=*").then((res) => res.data),
  add: () => api.get("/sub-fields?populate=*").then((res) => res.data),
  delete: () => api.get("/sub-fields?populate=*").then((res) => res.data),
  edit: () => api.get("/sub-sfields?populate=*").then((res) => res.data),
}
