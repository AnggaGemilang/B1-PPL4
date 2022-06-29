import api from '../index'

export default {
  get: () => api.get('/directorates?populate=*'),
  find: (query) => api.get(`/directorates?populate=*${query}`),
  findById: (query) => api.get(`/directorates?filters[id][$eq]=${query}`),
  add: (data) => api.post('/directorates', data),
  delete: (id) => api.delete(`/directorates/${id}`),
  edit: (id, data) => api.put(`/directorates/${id}`, data),
}