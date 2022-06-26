import api from '../index'

export default {
  get: () => api.get('/examiners?populate[1]=employee.grade&populate[2]=employee.level&populate[3]=employee.Photo').then((res) => res.data),
  findEmployee: (query) => api.get(`/employees?populate[1]=Photo&filters[NIP][$eq]=${query}`).then((res) => res.data),  
  findExaminers: (query) => api.get(`/examiners?populate[1]=employee&populate[2]=employee.Photo${query}`).then((res) => res.data),  
  add: (data) => api.post('/examiners', data).then((res) => res.data),
  delete: (id) => api.delete(`/examiners/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/examiners/${id}`, data).then((res) => res.data),
}