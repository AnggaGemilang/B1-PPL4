import api from '../index'

export default {
  get: () => api.get('/criterias?populate=*'),
  getFitProper: () => api.get('/criterias?populate=*&filters[defaultUsed][$eq]=fitproper'),
  find: (query) => api.get(`/criterias?populate=*${query}`),
  findById: (query) => api.get(`/criterias?populate=*&filters[id][$eq]=${query}`),
  add: (data) => api.post('/criterias', data),
  delete: (id) => api.delete(`/criterias/${id}`),
  edit: (id, data) => api.put(`/criterias/${id}`, data),
}