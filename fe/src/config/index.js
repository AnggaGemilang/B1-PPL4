import axios from "axios";

const api = axios.create({
    baseURL: "https://e624-140-0-220-95.ap.ngrok.io/api",
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": "true",
    //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //     "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    //     "Content-type": "application/json",
    // },
})

export default api