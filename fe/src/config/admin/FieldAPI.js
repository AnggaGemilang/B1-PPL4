import api from '../index'

export default {
  get: () => api.get("/fields?populate=*"),
  find: (query) => api.get(`/fields?populate=*${query}`),
  add: (data) => api.post('/fields', data),
  delete: (id) => api.delete(`/fields/${id}`),
  edit: (id, data) => api.put(`/fields/${id}`, data),
}
