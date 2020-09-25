import axios from 'axios'
import api from '../constants/api'

const fetchUser=async()=>{
    const { data } = await axios.get(`${api.SERVER_URL}/users/`)

}