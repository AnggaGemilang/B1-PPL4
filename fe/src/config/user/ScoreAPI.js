import api from '../index'

export default {
  add: (data) => api.post(`/scores`, data),
  edit: (id, data) => api.put(`/scores/${id}`, data),
  delete: (id) => api.delete(`/scores/${id}`),
  getFitProperPenilaian : (lineMapping) => api.get(`/scores?populate[1]=registrant&populate[2]=examiner&populate[3]=line_mapping_fitproper.mapping.position&populate[4]=criterion&filters[line_mapping_fitproper][id][$eq]=${lineMapping}&filters[type][$eq]=1`),
  getWawancaraPenilaian : (lineMapping) => api.get(`/scores?populate[1]=registrant&populate[2]=examiner&populate[3]=line_mapping_fitproper.mapping.position&populate[4]=criterion&filters[line_mapping_interview][id][$eq]=${lineMapping}&filters[type][$eq]=2`),
  getNilaiFitProper : (registrant, examiner, projection) => api.get(`/line-mappings?populate[1]=mapping&populate[2]=mapping.position&populate[3]=scores_fitproper&populate[4]=scores_fitproper.criterion&populate[5]=examiner.employee&filters[mapping][registrant][id][$eq]=${registrant}&filters[mapping][position][id][$eq]=${projection}&filters[examiner][id][$eq]=${examiner}`),
  getNilaiWawancara : (registrant, examiner, projection) => api.get(`/line-mappings?populate[1]=mapping&populate[2]=mapping.position&populate[3]=scores_interview&populate[4]=scores_interview.criterion&populate[5]=examiner.employee&filters[mapping][registrant][id][$eq]=${registrant}&filters[mapping][position][id][$eq]=${projection}&filters[examiner][id][$eq]=${examiner}`),
}