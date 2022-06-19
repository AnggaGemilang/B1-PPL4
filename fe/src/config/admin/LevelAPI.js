import api from '../index'

export default {
  get: () => api.get("/levels?populate=*").then((res) => res.data),
  find: (query) => api.get(`/levels?populate=*${query}`).then((res) => res.data),
  add: (data) => api.post('/levels', data).then((res) => res.data),
  delete: (id) => api.delete(`/levels/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/levels/${id}`, data).then((res) => res.data),
}
