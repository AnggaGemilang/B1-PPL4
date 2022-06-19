import api from '../index'

export default {
  get: () => api.get("/fields?populate=*").then((res) => res.data),
  find: (query) => api.get(`/fields?populate=*${query}`).then((res) => res.data),
  add: (data) => api.post('/fields', data).then((res) => res.data),
  delete: (id) => api.delete(`/fields/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/fields/${id}`, data).then((res) => res.data),
}
