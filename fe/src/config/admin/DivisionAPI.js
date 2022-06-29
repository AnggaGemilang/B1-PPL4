import api from '../index'

export default {
  get: () => api.get("/divisions?populate=*"),
  find: (query) => api.get(`/divisions?populate=*${query}`),
  add: (data) => api.post('/divisions', data),
  delete: (id) => api.delete(`/divisions/${id}`),
  edit: (id, data) => api.put(`/divisions/${id}`, data),
}
