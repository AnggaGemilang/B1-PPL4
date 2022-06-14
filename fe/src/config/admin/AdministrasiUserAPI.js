import api from '../index'

export default {
  get: () => api.get("/employees?populate=*").then((res) => res.data),
  find: (query) => api.get(`/accounts?filters[employee][NIP][$eq]=${query}`).then((res) => res.data),
  add: (data) => api.post(`/accounts`, data).then((res) => res.data),
  edit: (id, data) => api.put(`/accounts/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/accounts/${id}`).then((res) => res.data),
}