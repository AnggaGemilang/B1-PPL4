import api from '../index'

export default {
  get: () => api.get("/positions?populate=*").then((res) => res.data),
  find: (query) => api.get(`/positions?populate=*${query}`).then((res) => res.data),
  add: (data) => api.post('/positions', data).then((res) => res.data),
  delete: (id) => api.delete(`/positions/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/positions/${id}`, data).then((res) => res.data),
}
