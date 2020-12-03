import axios from "axios";
import {} from "../appContext";
// Modify server url here
const request = axios.create({ baseURL: "http://localhost:4000" });

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.error(error);
    }
    if (error.response.status === 401) {
      window.location.href = `/login`;
    }
    // Customize error handling
    return Promise.reject(error);
  }
);

export default request;
