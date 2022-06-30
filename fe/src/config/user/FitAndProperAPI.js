import api from '../index'

export default {
  get : () => api.get('/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&filters[status][$eq]=false'),
  add: (data) => api.post('/mappings', data),
  nilai: (id, data) => api.put(`/scores/${id}`, data),
  delete: (id) => api.delete(`/mappings/${id}`),

  getRekapManualFitProper : (registrant, projection) => api.get(`/line-mappings?populate[1]=mapping&populate[2]=mapping.position&populate[3]=scores_fitproper&populate[4]=scores_fitproper.criterion&populate[5]=examiner.employee&populate[6]=mapping.registrant.employee&populate[7]=mapping.level&filters[mapping][registrant][id][$eq]=${registrant}&filters[mapping][position][id][$eq]=${projection}`),
  getRekapManualWawancara : (registrant, projection) => api.get(`/line-mappings?populate[1]=mapping&populate[2]=mapping.position&populate[3]=scores_interview&populate[4]=scores_interview.criterion&populate[5]=examiner.employee&populate[6]=mapping.registrant.employee&populate[7]=mapping.level&filters[mapping][registrant][id][$eq]=${registrant}&filters[mapping][position][id][$eq]=${projection}&filters[is_interview][$eq]=true`),
  
  getLineMapping: () => api.get(`/line-mappings?populate[1]=examiner.employee&populate[2]=mapping.registrant.employee&populate[3]=mapping.position&populate[4]=mapping.registrant.employee.position&populate[5]=mapping.registrant.cv&populate[6]=mapping.registrant.ppt&filters[examiner][employee][NIP][$eq]=${JSON.parse(sessionStorage.getItem("auth")).user.employee.NIP}`),
  findLineMapping: (query) => api.get(`/line-mappings?populate[1]=examiner.employee&populate[2]=mapping.registrant.employee&populate[3]=mapping.position&populate[4]=mapping.registrant.employee.position&populate[5]=mapping.registrant.cv&populate[6]=mapping.registrant.ppt&filters[examiner][employee][NIP][$eq]=${JSON.parse(sessionStorage.getItem("auth")).user.employee.NIP}${query}`),
  addLineMapping: (data) => api.post('/line-mappings', data),
  editLineMapping: (id, data) => api.put(`/line-mappings/${id}`, data),  
}