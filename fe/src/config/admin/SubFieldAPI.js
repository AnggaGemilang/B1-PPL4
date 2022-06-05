import api from '../index'

export default {
  get: () => api.get('/sub-fields?populate=*').then((res) => res.data),
  find: (query) => api.get(`/sub-fields?populate=*&filters[subfield_name][$contains]=${query}`).then((res) => res.data),
  add: (data) => api.post('/sub-fields', data).then((res) => res.data),
  delete: (id) => api.delete(`/sub-fields/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/sub-fields/${id}`, data).then((res) => res.data),
}
