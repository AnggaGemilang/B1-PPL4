import api from '../index'

export default {
  getFitProper : (registrant, examiner, position) => api.get(`/scores?populate[1]=registrant&populate[2]=examiner&populate[3]=mapping.position&populate[4]=criterion&filters[registrant][id][$eq]=${registrant}&filters[examiner][id][$eq]=${examiner}&filters[mapping][position][id][$eq]=${position}&filters[type][$eq]=1`).then((res) => res.data),
  getWawancara : (registrant, examiner, position) => api.get(`/scores?populate[1]=registrant&populate[2]=examiner&populate[3]=mapping.position&populate[4]=criterion&filters[registrant][id][$eq]=${registrant}&filters[examiner][id][$eq]=${examiner}&filters[mapping][position][id][$eq]=${position}&filters[type][$eq]=2`).then((res) => res.data),
}