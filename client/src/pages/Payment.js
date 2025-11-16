import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [form, setForm] = useState({ name: '', email: '', amount: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const pay = async (e) => {
    e.preventDefault();

    const amt = Number(form.amount);
    if (!amt || amt <= 0) {
      setMsg("Please enter a valid amount.");
      return;
    }

    setMsg("Processing payment...");
    

    setTimeout(() => {
      setMsg("Payment successful! Thank you for your donation.");
      
      setTimeout(() => {
        navigate('/');
      }, 1200);

    }, 900);
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <h2>Secure Payment</h2>
      <p>Use this mock payment page to simulate a donation flow.</p>

      <form onSubmit={pay}>
        <input
          placeholder="Full name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Amount (INR)"
          type="number"
          min="1"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          required
        />

        <button className="btn" type="submit" disabled={!form.amount || form.amount <= 0}>
          Pay ₹{form.amount || '0'}
        </button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
