import api from '../api';
import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contact', form); 
      setMsg('Message sent — thanks!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error sending');
    }
  };

  return (
    <div>
      <h2>Contact</h2>
      <form onSubmit={submit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button type="submit">Send</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
