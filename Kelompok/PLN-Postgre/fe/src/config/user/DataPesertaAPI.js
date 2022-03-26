import api from '../index'

export default {
  get: () => api.get('/registrants?populate[1]=employee.grade&populate[2]=employee.level&populate[3]=employee.Photo').then((res) => res.data),
  add: () => api.get('/registrants?populate=*').then((res) => res.data),
  delete: () => api.get('/registrants?populate=*').then((res) => res.data),
  edit: () => api.get('/registrants?populate=*').then((res) => res.data),
}