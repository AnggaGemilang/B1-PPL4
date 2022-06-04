import api from '../index'

export default {
  get: () => api.get("/employees?populate=*").then((res) => res.data),
  find: (query) => api.get(`/employees/filters[NIP][$contains]=${query}`).then((res) => res.data),
  add: (data) => api.post("/employees", data).then((res) => res.data),
  delete: (id) => api.delete(`/employees/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/employees/${id}`, data).then((res) => res.data),
}
