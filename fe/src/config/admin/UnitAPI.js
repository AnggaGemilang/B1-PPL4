import api from '..'

export default {
  get: () => api.get("/units?populate=*"),
  find: (query) => api.get(`/units?populate=*${query}`),
  add: (data) => api.post('/units', data),
  delete: (id) => api.delete(`/units/${id}`),
  edit: (id, data) => api.put(`/units/${id}`, data),
}
