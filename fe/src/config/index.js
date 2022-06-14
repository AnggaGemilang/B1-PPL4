import axios from "axios";
import url from "./setting"

const api = axios.create({
    baseURL: url + "/api",
    headers: {
        "Content-type": "application/json",
    },
})

export default api