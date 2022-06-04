import api from '../index'

export default {
  get: () => api.get("/employees?populate=*").then((res) => res.data),
  find: (query) => api.get(`/employees/filters[employees][Nama][$contains]=${query}`).then((res) => res.data),
  edit: (id, data) => api.put(`/employees/${id}`, data).then((res) => res.data),
}