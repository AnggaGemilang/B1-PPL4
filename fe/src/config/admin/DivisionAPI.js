import api from '../index'

export default {
  get: () => api.get("/divisions?populate[fields][populate]&populate[directorate][populate]=division").then((res) => res.data),
  add: () => api.get("/divisions?populate[fields][populate]&populate[directorate][populate]=division").then((res) => res.data),
  delete: () => api.get("/divisions?populate=*").then((res) => res.data),
  edit: () => api.get("/divisions?populate=*").then((res) => res.data),
}
