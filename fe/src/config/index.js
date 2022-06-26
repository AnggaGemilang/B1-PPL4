import axios from "axios";
import url from "./setting"

const api = axios.create({
    baseURL: url + "/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": JSON.parse(sessionStorage.getItem("auth"))?.jwt === undefined
            ? ""
            : "Bearer " + JSON.parse(sessionStorage.getItem("auth")).jwt
    },
})

export default api