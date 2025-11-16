import axios from 'axios';
const api=axios.create({
  baseURL:'https://aashray-backend-h535.onrender.com',
  headers:{'Content-Type':'application/json'}
});
api.interceptors.request.use(c=>{const t=localStorage.getItem('ngo_token');if(t)c.headers.Authorization=`Bearer ${t}`;return c;});
export default api;
