import axios from 'axios'

export const api_rest = axios.create({
  baseURL: 'http://localhost:5000',
  paramsSerializer: (params) => {
    let result = '';
    Object.keys(params).forEach(key => {
        result += `${key}=${encodeURIComponent(params[key])}&`;
    });
    return result.substr(0, result.length - 1);
  }
})
