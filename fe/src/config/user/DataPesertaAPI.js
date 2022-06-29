import api from '../index'

export default {
  get: () => api.get('/registrants?populate[1]=employee.grade&populate[2]=employee.level&populate[3]=employee.Photo&populate[4]=employee.position'),
  findEmployee: (query) => api.get(`/employees?filters[NIP][$eq]=${query}`),  
  findRegistrants: (query) => api.get(`/registrants/?populate[1]=employee&populate[2]=employee.Photo${query}`),  
  add: (data) => api.post('/registrants', data),
  delete: (id) => api.delete(`/registrants/${id}`),
  edit: (id, data) => api.put(`/registrants/${id}`, data),
  addFile: (data) => api.post("/upload", data),
  deletePhoto: (query) => api.delete(`/upload/files/${query}`),  
}