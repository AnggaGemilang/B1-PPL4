import api from '../index'

export default {
  get: () => api.get("https://5a59-140-0-220-95.ap.ngrok.io/api/fields?populate[division][populate]&populate[sub_fields][populate]=fields").then((res) => res.data),
  add: () => api.get("/fields?populate=*").then((res) => res.data),
  delete: () => api.get("/fields?populate=*").then((res) => res.data),
  edit: () => api.get("/fields?populate=*").then((res) => res.data),
}
