import api from '../index'

export default {
  getWawancara : (registrant, examiner, position) => api.get(`/scores?populate[1]=registrant&populate[2]=examiner&populate[3]=line_mapping.mapping.position&populate[4]=criterion&filters[registrant][id][$eq]=${registrant}&filters[examiner][id][$eq]=${examiner}&filters[line_mapping][mapping][position][id][$eq]=${position}&filters[type][$eq]=2`).then((res) => res.data),
  getFitProper : (registrant, examiner, position) => api.get(`/scores?populate[1]=registrant&populate[2]=examiner&populate[3]=line_mapping.mapping.position&populate[4]=criterion&filters[registrant][id][$eq]=${registrant}&filters[examiner][id][$eq]=${examiner}&filters[line_mapping][mapping][position][id][$eq]=${position}&filters[type][$eq]=1`).then((res) => res.data),
}