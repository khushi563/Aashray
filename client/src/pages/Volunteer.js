import api from '../api';
import React, { useState } from 'react';

export default function Volunteer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', availability: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/volunteers', form);
      setMsg('Thanks — we will contact you.');
      setForm({ name: '', email: '', phone: '', availability: '' });
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error submitting form');
    }
  };

  return (
    <div>
      <h2>Volunteer</h2>
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
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          name="availability"
          placeholder="Availability / Notes"
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
