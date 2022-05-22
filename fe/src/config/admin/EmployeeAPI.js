import api from '../index'

export default {
  get: () => api.get("/employees?populate=*").then((res) => res.data),
  add: () => api.post("/employees").then((res) => res.data),
  delete: () => api.delete("/employees/{id}").then((res) => res.data),
  edit: () => api.put("/employees").then((res) => res.data),
}
