import axios, {AxiosInstance} from 'axios';

const authHttp: AxiosInstance = axios.create ({
  baseURL: process.env.VUE_APP_FB_AUTH_URL
})

export default authHttp