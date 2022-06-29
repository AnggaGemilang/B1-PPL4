import api from '../index'

export default {
  get: () => api.get('/grades?populate=*'),
  find: (query) => api.get(`/grades?populate=*${query}`),
  add: (data) => api.post('/grades', data),
  delete: (id) => api.delete(`/grades/${id}`),
  edit: (id, data) => api.put(`/grades/${id}`, data),
}
