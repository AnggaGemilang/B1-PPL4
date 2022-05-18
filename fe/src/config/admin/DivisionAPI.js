import api from '../index'

export default {
  get: () => api.get("https://d316-140-0-220-95.ap.ngrok.io/api/divisions?populate[fields][populate]&populate[directorate][populate]=division").then((res) => res.data),
  add: () => api.get("/divisions?populate=*").then((res) => res.data),
  delete: () => api.get("/divisions?populate=*").then((res) => res.data),
  edit: () => api.get("/divisions?populate=*").then((res) => res.data),
}
