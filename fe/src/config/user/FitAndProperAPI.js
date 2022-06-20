import api from '../index'

export default {
  get : () => api.get('/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&filters[status][$eq]=false').then((res) => res.data),
  add: (data) => api.post('/mappings', data).then((res) => res.data),
  nilai: (data) => api.post('/scores', data).then((res) => res.data),
  delete: (id) => api.delete(`/mappings/${id}`).then((res) => res.data),
}