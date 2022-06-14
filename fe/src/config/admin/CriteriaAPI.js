import api from '../index'

export default {
  get: () => api.get('/criterias?populate=*').then((res) => res.data),
  find: (query) => api.get(`/criterias?filters[criteria][$contains]=${query}`).then((res) => res.data),
  findById: (query) => api.get(`/criterias?filters[id][$eq]=${query}`).then((res) => res.data),
  add: (data) => api.post('/criterias', data).then((res) => res.data),
  delete: (id) => api.delete(`/criterias/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/criterias/${id}`, data).then((res) => res.data),
}