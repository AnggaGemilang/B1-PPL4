import api from '../index'

export default {
  get: () => api.get("/levels?populate=*"),
  find: (query) => api.get(`/levels?populate=*${query}`),
  add: (data) => api.post('/levels', data),
  delete: (id) => api.delete(`/levels/${id}`),
  edit: (id, data) => api.put(`/levels/${id}`, data),
}
