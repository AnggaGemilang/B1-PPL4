import api from ".";

export default {
    get: () => api.get("/teams?populate=*").then((res) => res.data),
    add: () => api.get("/teams?populate=*").then((res) => res.data),
    delete: () => api.get("/teams?populate=*").then((res) => res.data),
    edit: () => api.get("/teams?populate=*").then((res) => res.data)
}