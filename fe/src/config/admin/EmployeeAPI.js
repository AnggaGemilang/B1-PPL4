import api from '../index'

export default {
  get: () => api.get("/employees?populate[1]=Photo&populate[2]=position&populate[3]=sub_field&populate[4]=level&populate[5]=account"),
  find: (query) => api.get(`/employees?populate[1]=Photo&populate[2]=position&populate[3]=sub_field&populate[4]=level&populate[5]=account${query}`),
  findById: (query) => api.get(`/employees?populate[1]=Photo&populate[2]=position&populate[3]=sub_field&populate[4]=level&populate[5]=account&filters[id][$eq]=${query}`),
  add: (data) => api.post("/employees", data),
  delete: (id) => api.delete(`/employees/${id}`),
  edit: (id, data) => api.put(`/employees/${id}`, data),
  addPhoto: (data) => api.post("/upload", data),
  deletePhoto: (query) => api.delete(`/upload/files/${query}`),
}
