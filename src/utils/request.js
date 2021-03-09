import axios from "axios";
import {} from "../appContext";
// Modify server url here
//baseURL:"http://localhost:4000"
// const baseURL = "http://localhost:4000";
const baseURL = "https://app.freshio.me";
const request = axios.create({ baseURL: baseURL });

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      console.error(error);
    }
    // Customize error handling
    return Promise.reject(error);
  }
);

export default request;
