import api from '../index'

export default {
  get: () => api.get(`/line-mappings?populate[1]=examiner.employee&populate[2]=mapping.registrant.employee&populate[3]=mapping.position&populate[4]=mapping.registrant.employee.position&populate[5]=mapping.registrant.cv&populate[6]=mapping.registrant.ppt&filters[is_interview][$eq]=true`).then((res) => res.data),
  edit: (query, data) => api.put(`/line-mappings/${query}`, data).then((res) => res.data),

  getLineMapping: () => api.get(`/line-mappings?populate[1]=examiner.employee&populate[2]=mapping.registrant.employee&populate[3]=mapping.position&populate[4]=mapping.registrant.employee.position&populate[5]=mapping.registrant.cv&populate[6]=mapping.registrant.ppt&filters[examiner][employee][NIP][$eq]=${JSON.parse(sessionStorage.getItem("auth")).user.employee.NIP}&filters[is_interview][$eq]=true`).then((res) => res.data),
  addLineMapping: (data) => api.post('/line-mappings', data).then((res) => res.data),
  editLineMapping: (id, data) => api.put(`/line-mappings/${id}`, data).then((res) => res.data),    
}