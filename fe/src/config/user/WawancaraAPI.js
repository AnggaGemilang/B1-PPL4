import api from '../index'

export default {
  get: () => api.get(`/line-mappings?populate[1]=examiner.employee&populate[2]=mapping.registrant.employee&populate[3]=mapping.position&populate[4]=mapping.registrant.employee.position&populate[5]=mapping.registrant.cv&populate[6]=mapping.registrant.ppt&filters[is_interview][$eq]=true`),
  edit: (query, data) => api.put(`/line-mappings/${query}`, data),

  getLineMapping: () => api.get(`/line-mappings?populate[1]=examiner.employee&populate[2]=mapping.registrant.employee&populate[3]=mapping.position&populate[4]=mapping.registrant.employee.position&populate[5]=mapping.registrant.cv&populate[6]=mapping.registrant.ppt&filters[examiner][employee][NIP][$eq]=${JSON.parse(sessionStorage.getItem("auth")).user.employee.NIP}&filters[is_interview][$eq]=true`),
  findLineMapping: (query) => api.get(`/line-mappings?populate[1]=examiner.employee&populate[2]=mapping.registrant.employee&populate[3]=mapping.position&populate[4]=mapping.registrant.employee.position&populate[5]=mapping.registrant.cv&populate[6]=mapping.registrant.ppt&filters[examiner][employee][NIP][$eq]=${JSON.parse(sessionStorage.getItem("auth")).user.employee.NIP}&filters[is_interview][$eq]=true${query}`),
  addLineMapping: (data) => api.post('/line-mappings', data),
  editLineMapping: (id, data) => api.put(`/line-mappings/${id}`, data),    
}