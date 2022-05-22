import api from '../index'

export default {
  get: () => api.get('/directorates?populate=*').then((res) => res.data),
  find: () => api.get('/directorates/filters[NIP][$eq]=').then((res) => res.data),
  add: (data) => api.post('/directorates', data).then((res) => res.data),
  delete: () => api.delete('/directorates?populate=*').then((res) => res.data),
  edit: () => api.update('/directorates?populate=*').then((res) => res.data),
}
