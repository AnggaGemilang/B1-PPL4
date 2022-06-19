import api from '../index'

export default {
  get: () => api.get("/divisions?populate=*").then((res) => res.data),
  find: (query) => api.get(`/divisions?populate=*${query}`).then((res) => res.data),
  add: (data) => api.post('/divisions', data).then((res) => res.data),
  delete: (id) => api.delete(`/divisions/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/divisions/${id}`, data).then((res) => res.data),
}
