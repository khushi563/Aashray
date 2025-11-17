import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 

export default function Donate() {
  const navigate = useNavigate();
  const location = useLocation(); 


  const project = location.state || {
    projectId: null,
    projectTitle: "Our Cause",
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    projectId: project.projectId, 
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const draft = sessionStorage.getItem("donation_draft");
    if (draft) {
      
      setForm((prevForm) => ({
        ...JSON.parse(draft),
        projectId: prevForm.projectId,
      }));
    }
  }, []); 

  const goPayment = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.amount) {
      setMsg("All fields are required");
      return;
    }

    if (isNaN(form.amount) || Number(form.amount) < 1) {
      setMsg("Please enter a valid donation amount");
      return;
    }

    try {
      const res = await fetch("https://aashray-backend-8nc4.onrender.com/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Donation saved:", data);

      sessionStorage.setItem("donation_draft", JSON.stringify(form));
      navigate("/payment");
    } catch (error) {
      console.error(error);
      setMsg("Server error! Donation not saved.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "520px" }}>
      <h2>Support: {project.projectTitle}</h2>
      <p style={{ marginBottom: "16px" }}>
        Your donation brings us one step closer to a better tomorrow.
      </p>

      <form onSubmit={goPayment}>
        <input
          name="name"
          placeholder="Full Name"
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
          name="amount"
          placeholder="Donation Amount (INR)"
          type="number"
          min="1"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value.replace(/\D/, "") })
          }
          required
        />
        <button className="btn" type="submit">
          Proceed to Payment
        </button>
      </form>

      {msg && (
        <p style={{ marginTop: "12px", color: "red" }}>{msg}</p>
      )}
    </div>
  );
}
