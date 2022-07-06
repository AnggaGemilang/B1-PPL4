import api from '../index'

export default {
  find: (query) => api.get(`/users?populate[1]=employee&populate[2]=account&filters[employee][NIP][$eq]=${query}`),
  add: (data) => api.post(`/auth/local/register`, data),
  edit: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
}