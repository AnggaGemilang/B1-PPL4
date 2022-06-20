import api from '../index'

export default {
  get : (registrant, examiner, position) => api.get(`/scores?populate[1]=registrant&populate[2]=examiner&populate[3]=mapping.position&populate[4]=criterion&filters[registrant][id][$eq]=${registrant}&filters[examiner][id][$eq]=${examiner}&filters[mapping][position][id][$eq]=${position}`).then((res) => res.data),
}