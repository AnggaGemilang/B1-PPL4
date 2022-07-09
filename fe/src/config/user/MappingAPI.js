import api from '../index'

export default {
  get : () => api.get('/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&populate[9]=level&populate[10]=line_mappings&populate[11]=line_mappings.scores_fitproper&populate[12]=line_mappings.scores_interview&populate[13]=registrant.employee.position.grade&populate[14]=registrant.employee.Photo'),
  getOne : (id) => api.get(`/mappings/${id}?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&populate[9]=level&populate[10]=line_mappings&populate[11]=line_mappings.scores_fitproper&populate[12]=line_mappings.scores_interview`),
  findFitProper : (query) => api.get(`/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&populate[9]=level${query}`),
  getPenguji : (registrant, position) => api.get(`/mappings?populate[1]=examiners&populate[2]=examiners.employee&populate[3]=examiners_interview.employee&filters[registrant][id][$eq]=${registrant}&filters[position][id][$eq]=${position}`),
  add: (data) => api.post('/mappings', data),
  delete: (id) => api.delete(`/mappings/${id}`),
  edit: (id, data) => api.put(`/mappings/${id}`, data),

  getWawancara : () => api.get('/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&populate[9]=level&populate[10]=examiners_interview.employee&populate[11]=registrant.employee.Photo&filters[is_interview][$eq]=true'),
  findWawancara : (query) => api.get(`/mappings?populate[1]=registrant&populate[2]=registrant.employee&populate[3]=position&populate[4]=registrant.employee.position&populate[5]=examiners&populate[6]=examiners.employee&populate[7]=registrant.cv&populate[8]=registrant.ppt&populate[9]=level&populate[10]=examiners_interview.employee&filters[is_interview][$eq]=true${query}`),
}