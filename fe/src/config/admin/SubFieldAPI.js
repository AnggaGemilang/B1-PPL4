import api from '../index'

export default {
  get: () => api.get('/sub-fields?populate=*'),
  find: (query) => api.get(`/sub-fields?populate=*${query}`),
  add: (data) => api.post('/sub-fields', data),
  delete: (id) => api.delete(`/sub-fields/${id}`),
  edit: (id, data) => api.put(`/sub-fields/${id}`, data),
}
