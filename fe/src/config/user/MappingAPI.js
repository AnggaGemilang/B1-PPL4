import api from '../index'

export default {
  get : () => api.get('/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&populate[9]=level').then((res) => res.data),
  getPenguji : (registrant, position) => api.get(`/mappings?populate[1]=examiners&populate[2]=examiners.employee&filters[registrant][id][$eq]=${registrant}&filters[position][id][$eq]=${position}`).then((res) => res.data),
  add: (data) => api.post('/mappings', data).then((res) => res.data),
  delete: (id) => api.delete(`/mappings/${id}`).then((res) => res.data),
  edit: (id, data) => api.put(`/mappings/${id}`, data).then((res) => res.data),

  getWawancara : () => api.get('/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&populate[9]=level&populate[10]=examiners_interview.employee&filters[is_interview][$eq]=true').then((res) => res.data),
}