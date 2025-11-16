import api from '../api';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Login(){
  const [form,setForm] = useState({email:'',password:''});
  const [msg,setMsg] = useState('');
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try{
      const res = await api.post("/auth/login", form);
      const {token, user} = res.data;
      localStorage.setItem('ngo_token', token);
      localStorage.setItem('ngo_user', JSON.stringify(user));
      setUser(user);
      setMsg('Logged in');
      navigate('/');
    }catch(err){ setMsg('Invalid credentials'); }
  }

  return (
    <div className="container" style={{maxWidth:420}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input name="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button className="btn" type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
