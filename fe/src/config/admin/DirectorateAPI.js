import api from '../index'

export default {
  get: () => api.get('/directorates?populate=*').then((res) => res.data),
  find: (query) => api.get(`/directorates?populate=*${query}`).then((res) => res.data),
  findById: (query) => api.get(`/directorates?filters[id][$eq]=${query}`).then((res) => res.data),
  add: (data) => api.post('/directorates', data).then((res) => res.data),
  delete: (id) => api.delete(`/directorates/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/directorates/${id}`, data).then((res) => res.data),
}