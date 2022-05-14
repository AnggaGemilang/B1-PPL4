import api from '../index'

export default {
  get: () => api.get("/employees?populate=*").then((res) => res.data),
  add: () => api.get("/employees?populate=*").then((res) => res.data),
  delete: () => api.get("/employees?populate=*").then((res) => res.data),
  edit: () => api.get("/employees?populate=*").then((res) => res.data),
}
