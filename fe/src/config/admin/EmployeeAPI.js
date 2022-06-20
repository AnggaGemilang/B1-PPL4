import api from '../index'

export default {
  get: () => api.get("/employees?populate[1]=Photo&populate[2]=position&populate[3]=sub_field&populate[4]=level&populate[5]=account").then((res) => res.data),
  find: (query) => api.get(`/employees?populate[1]=Photo&populate[2]=position&populate[3]=sub_field&populate[4]=level&populate[5]=account${query}`).then((res) => res.data),
  findById: (query) => api.get(`/employees?populate[1]=Photo&populate[2]=position&populate[3]=sub_field&populate[4]=level&populate[5]=account&filters[id][$eq]=${query}`).then((res) => res.data),
  add: (data) => api.post("/employees", data).then((res) => res.data),
  delete: (id) => api.delete(`/employees/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/employees/${id}`, data).then((res) => res.data),
  addPhoto: (data) => api.post("/upload", data).then((res) => res.data),
  deletePhoto: (query) => api.delete(`/upload/files/${query}`).then((res) => res.data),
}
