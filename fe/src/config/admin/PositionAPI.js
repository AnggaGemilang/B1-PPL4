import api from '../index'

export default {
  get: () => api.get("/positions?populate=*"),
  find: (query) => api.get(`/positions?populate=*${query}`),
  add: (data) => api.post('/positions', data),
  delete: (id) => api.delete(`/positions/${id}`),
  edit: (id, data) => api.put(`/positions/${id}`, data),
}