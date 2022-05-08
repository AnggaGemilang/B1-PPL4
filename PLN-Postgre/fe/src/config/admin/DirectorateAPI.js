import api from '../index'

export default {
  get: () => api.get('/directorates?populate=*').then((res) => res.data),
  add: () => api.get('/directorates?populate=*').then((res) => res.data),
  delete: () => api.get('/directorates?populate=*').then((res) => res.data),
  edit: () => api.get('/directorates?populate=*').then((res) => res.data),
}
