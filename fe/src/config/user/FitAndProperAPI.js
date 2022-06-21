import api from '../index'

export default {
  get : () => api.get('/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&filters[status][$eq]=false').then((res) => res.data),
  add: (data) => api.post('/mappings', data).then((res) => res.data),
  nilai: (data) => api.post('/scores', data).then((res) => res.data),
  delete: (id) => api.delete(`/mappings/${id}`).then((res) => res.data),

  getLineMapping: () => api.get(`/line-mappings?populate[1]=examiner.employee&populate[2]=mapping.registrant.employee&populate[3]=mapping.position&populate[4]=mapping.registrant.employee.position&populate[5]=mapping.registrant.cv&populate[6]=mapping.registrant.ppt&filters[examiner][employee][NIP][$eq]=${JSON.parse(sessionStorage.getItem("auth")).user.employee.NIP}`).then((res) => res.data),
  addLineMapping: (data) => api.post('/line-mappings', data).then((res) => res.data),
  editLineMapping: (id, data) => api.put(`/line-mappings/${id}`, data).then((res) => res.data),  
}