import api from '../index'

export default {
  find: (query) => api.get(`/users?populate[1]=employee&filters[employee][NIP][$eq]=${query}`).then((res) => res.data),
  add: (data) => api.post(`/auth/local/register`, data).then((res) => res.data),
  edit: (id, data) => api.put(`/users/${id}`, data).then((res) => res.data),
  delete: (id) => api.delete(`/users/${id}`).then((res) => res.data),
}