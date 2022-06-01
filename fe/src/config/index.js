import axios from "axios";

const api = axios.create({
    baseURL: "https://97e1-123-253-233-233.ap.ngrok.io/api",
    headers: {
       "Content-type": "application/json",
    },
})

export default api