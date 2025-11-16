import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom"; 

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        
        const res = await api.get("/projects/public/active");
        
        console.log("Data from backend:", res.data);
        setProjects(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="container">
        <p>Loading projects...</p>
      </div>
    );

  return (
    <div className="container">
      <h2>Active Projects</h2>
      <div className="grid grid-3">
        {projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          projects.map((p) => (
            <div className="card" key={p._id}>
              <h4>{p.title}</h4>
              <p>{p.summary}</p>
              <p>
                <strong>Goal:</strong> ₹{p.goal}
              </p>
              <p>
                <strong>Raised:</strong> ₹{p.raised}
              </p>
              <Link
                to="/donate"
                state={{ projectId: p._id, projectTitle: p.title }}
                className="btn"
              >
                Support
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}