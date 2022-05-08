import api from '../index'

export default {
  get: () => api.get("/grades?populate=*").then((res) => res.data),
  add: () => api.get("/grades?populate=*").then((res) => res.data),
  delete: () => api.get("/grades?populate=*").then((res) => res.data),
  edit: () => api.get("/grades?populate=*").then((res) => res.data),
}
