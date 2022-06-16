import api from '../index'

export default {
  get: () => api.get("/employees?populate[1]=Photo&populate[2]=grades&populate[3]=sub_fields&populate[4]=levels").then((res) => res.data),
  find: (query) => api.get(`/employees?populate[1]=Photo&populate[2]=grades&populate[3]=sub_fields&populate[4]=levels${query}`).then((res) => res.data),
  // findById: (query) => api.get(`/employees?populate=*&filters[id][$eq]=${query}`).then((res) => res.data),
  // add: (data) => api.post("/employees", data).then((res) => res.data),
  // addPhoto: (data) => api.post("/upload", data).then((res) => res.data),
  // delete: (id) => api.delete(`/employees/${id}`).then((res) => res.data),
  // edit: (id, data) => api.put(`/employees/${id}`, data).then((res) => res.data),
}
