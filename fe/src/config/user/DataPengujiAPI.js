import api from '../index'

export default {
  get: () => api.get('/examiners?populate[1]=employee.grade&populate[2]=employee.level&populate[3]=employee.Photo'),
  findEmployee: (query) => api.get(`/employees?populate[1]=Photo&populate[2]=account&filters[NIP][$eq]=${query}`),  
  findExaminers: (query) => api.get(`/examiners?populate[1]=employee&populate[2]=employee.Photo${query}`),  
  add: (data) => api.post('/examiners', data),
  delete: (id) => api.delete(`/examiners/${id}`),
  edit: (id, data) => api.put(`/examiners/${id}`, data),
}