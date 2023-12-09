import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const secureinstance = axios.create({
    baseURL: 'http://localhost:5000',
  });

const useAxiosSecure = () => {
    const navegate = useNavigate()
    const {logOut} = useAuth()

    secureinstance.interceptors.request.use(function(config){
      const token = localStorage.getItem('access-token')
      config.headers.authorization = `Bearer ${token}`
      return config
    },function(error){
      return Promise.reject(error)
    })

    secureinstance.interceptors.response.use(function(response){
      return response
    },function(error){
      const status = error.response?.status
      if(status === 401 || status === 403){
        logOut()
        navegate('/login')
      }
      return Promise.reject(error)
    })

    return secureinstance
};

export default useAxiosSecure;