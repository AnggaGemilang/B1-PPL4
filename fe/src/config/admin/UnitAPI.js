import api from '..'

export default {
  get: () => api.get("/units?populate=*").then((res) => res.data),
  find: (query) => api.get(`/units?populate=*${query}`).then((res) => res.data),
  add: (data) => api.post('/units', data).then((res) => res.data),
  delete: (id) => api.delete(`/units/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/units/${id}`, data).then((res) => res.data),
}
