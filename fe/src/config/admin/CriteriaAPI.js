import api from '../index'

export default {
  get: () => api.get('/criterias?populate=*').then((res) => res.data),
  find: () => api.get('/criterias/filters[NIP][$eq]=').then((res) => res.data),
  add: (data) => api.post('/criterias', data).then((res) => res.data),
  delete: () => api.delete('/criterias?populate=*').then((res) => res.data),
  edit: () => api.update('/criterias?populate=*').then((res) => res.data),
}