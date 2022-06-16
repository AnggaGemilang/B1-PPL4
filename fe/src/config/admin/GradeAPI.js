import api from '../index'

export default {
  get: () => api.get('/grades?populate=*').then((res) => res.data),
  find: (query) => api.get(`/grades?populate=*${query}`).then((res) => res.data),
  // findById: (query) => api.get(`/grades?filters[id][$eq]=${query}`).then((res) => res.data),
  // add: (data) => api.post('/grades', data).then((res) => res.data),
  // delete: (id) => api.delete(`/grades/${id}`).then((res) => res.data),
  // edit: (id, data) => api.put(`/grades/${id}`, data).then((res) => res.data),
}
