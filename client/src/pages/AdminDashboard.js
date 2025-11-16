import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../App";


const initialState = {
  title: "",
  summary: "",
  content: "",
  goal: "",
  active: false,
  images: "", 
};

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState(initialState);
  const [editingId, setEditingId] = useState(null); 
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [pRes, dRes] = await Promise.all([
        api.get("/projects"),
        api.get("/donations")
      ]);
      setProjects(pRes.data);
      setDonations(dRes.data);
    } catch (err) {
      console.log("Error loading admin data", err);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

 
    const projectData = {
      ...form,
      goal: Number(form.goal),
  
      images: form.images.split(",").map(img => img.trim()).filter(img => img)
    };

    try {
      if (editingId) {
       
        await api.put(`/projects/${editingId}`, projectData);
      } else {
       
        await api.post("/projects", projectData);
      }
      resetForm(); 
      fetchAll(); 
    } catch (err) {
      console.error("Create/Update project failed", err);
      setError("Failed to save project. Check all fields.");
    }
  };

  
  const startEdit = (project) => {
    setEditingId(project._id);
    setForm({
      ...project,
      
      images: project.images ? project.images.join(", ") : ""
    });
    window.scrollTo(0, 0); 
  };


  const deleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${id}`);
        fetchAll(); 
      } catch (err) {
        console.error("Delete project failed", err);
      }
    }
  };

 
  const resetForm = () => {
    setForm(initialState);
    setEditingId(null);
    setError("");
  };

  if (!user || user.role !== "admin")
    return <div className="container"><h3>Access denied</h3></div>;

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <section style={{ marginTop: 12 }}>
        <h3>{editingId ? "Edit Project" : "Create New Project"}</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            name="summary"
            placeholder="Summary"
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            required
          />
          <textarea
            name="content"
            placeholder="Full Description"
            rows="4"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <input
            name="goal"
            placeholder="Goal (INR)"
            type="number"
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            required
          />
          <input
            name="images"
            placeholder="Image URLs (comma-separated)"
            type="text"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              style={{ width: 'auto' }}
            />
            <label htmlFor="active" style={{ margin: 0 }}>Project is Active (visible on public site)</label>
          </div>
          <button className="btn" type="submit">
            {editingId ? "Update Project" : "Create Project"}
          </button>
          {editingId && (
            <button
              className="btn btn-secondary"
              type="button"
              onClick={resetForm}
              style={{ marginLeft: 10 }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </section>

      <section style={{ marginTop: 22 }}>
        <h3>Projects ({projects.length})</h3>
        {projects.map((p) => (
          <div className="card" key={p._id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{p.title}</strong>
                <span style={{ marginLeft: 10, color: p.active ? 'green' : '#777' }}>
                  ({p.active ? "Active" : "Inactive"})
                </span>
              </div>
              <div>
                <button
                  onClick={() => startEdit(p)}
                  className="btn-small"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(p._id)}
                  className="btn-small btn-danger"
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </button>
              </div>
            </div>
            <p>{p.summary}</p>
            <p><strong>Goal:</strong> ₹{p.goal} | <strong>Raised:</strong> ₹{p.raised}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 22 }}>
        <h3>Donations ({donations.length})</h3>
        {donations.map((d) => (
          <div className="card" key={d._id}>
            <strong>{d.name}</strong> ₹{d.amount} — {d.email}
            {d.project && <span> (Project: {d.project.title})</span>}
          </div>
        ))}
      </section>
    </div>
  );
}