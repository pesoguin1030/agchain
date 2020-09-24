import axios from 'axios'

// Modify server url here
const instance = axios.create({baseURL:"https://app.freshio.me"})

instance.interceptors.response.use(response=>response,
    error=>{
      const fallbackValue = [
        {userId: "Not authorized",id: "aerw15311sq",
         title: "Please try     again",completed: false}];
       return Promise.reject(fallbackValue);}
    );

export default instance

const setAuthToken = token => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
}

export {
    setAuthToken
}