import api from '../index'

export default {
  get: () => api.get('/registrants?populate[1]=employee.grade&populate[2]=employee.level&populate[3]=employee.Photo&populate[4]=employee.position'),
  getActive: () => api.get('/registrants?populate[1]=employee.grade&populate[2]=employee.level&populate[3]=employee.Photo&populate[4]=employee.position&filters[status][$eq]=active'),
  findEmployee: (query) => api.get(`/employees?filters[NIP][$eq]=${query}`),  
  findRegistrants: (query) => api.get(`/registrants/?populate[1]=employee&populate[2]=employee.Photo&populate[3]=employee.position&populate[4]=employee.position.grade&populate[5]=cv&populate[6]=ppt&populate[7]=employee.level${query}`),  
  add: (data) => api.post('/registrants', data),
  delete: (id) => api.delete(`/registrants/${id}`),
  edit: (id, data) => api.put(`/registrants/${id}`, data),
  addFile: (data) => api.post("/upload", data),
  deletePhoto: (query) => api.delete(`/upload/files/${query}`),  
}