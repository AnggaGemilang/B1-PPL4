import api from '../index'

export default {
  get: () => api.get('/examiners?populate[1]=employee.grade&populate[2]=employee.level&populate[3]=employee.Photo').then((res) => res.data),
  find: (query) => api.get(`/employees?filters[NIP][$eq]=${query}`).then((res) => res.data),  
  add: () => api.get('/examiners?populate=*').then((res) => res.data),
  delete: () => api.get('/examiners?populate=*').then((res) => res.data),
  edit: () => api.get('/examiners?populate=*').then((res) => res.data),
}