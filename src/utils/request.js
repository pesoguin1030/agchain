import axios from 'axios'

// Modify server url here
const request = axios.create({ baseURL:"https://app.freshio.me" })

request.interceptors.response.use(response=>response,
    error=> {
        // Customize error handling
        return Promise.reject(error)
    }
);

export default request