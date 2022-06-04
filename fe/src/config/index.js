import axios from "axios";

const api = axios.create({
    baseURL: "https://d77a-123-253-233-233.ap.ngrok.io/api",
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": "true",
    //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //     "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    //     "Content-type": "application/json",
    // },
})

export default api