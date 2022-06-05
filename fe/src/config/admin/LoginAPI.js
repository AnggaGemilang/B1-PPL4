import api from '../index'

export default {
  find: (email, password) => api.get(`/accounts?populate=*&filters[employee][Email][$eq]=${email}&filters[password][$eq]=${password}`).then((res) => res.data),
}