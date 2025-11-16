import api from '../api';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      const r = await api.post('/auth/login', { email: form.email, password: form.password }); 

      const { token, user } = r.data;
      localStorage.setItem('ngo_token', token);
      localStorage.setItem('ngo_user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error creating account');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <h2>Create an account</h2>
      <form onSubmit={submit}>
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn" type="submit">Sign up</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
