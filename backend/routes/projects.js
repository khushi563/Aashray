const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); 


const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')      
    .replace(/[^\w-]+/g, '')    
    .replace(/--+/g, '-')     
    .replace(/^-+/, '')        
    .replace(/-+$/, '');       
};


router.post("/", async (req, res) => {
  try {
    const { title, summary, content, goal, active, images } = req.body;
    if (!title || !summary || !goal) {
      return res.status(400).json({ error: "Title, summary, and goal are required" });
    }

    const project = new Project({
      title,
      slug: slugify(title),
      summary,
      content: content || "",
      goal: Number(goal),
      active: active || false, 
      images: images || [],
      raised: 0
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Server error while creating project" });
  }
});


router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects); 
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error while fetching projects" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ error: "Server error while fetching project" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { title, summary, content, goal, active, images, raised } = req.body;

    const projectFields = {};
    if (title) {
      projectFields.title = title;
      projectFields.slug = slugify(title);
    }
    if (summary) projectFields.summary = summary;
    if (content) projectFields.content = content;
    if (goal) projectFields.goal = Number(goal);
    if (raised) projectFields.raised = Number(raised);
    if (active !== undefined) projectFields.active = active;
    if (images) projectFields.images = images;

    let project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true } 
    );

    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project removed successfully" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/public/active", async (req, res) => {
  try {
    const projects = await Project.find({ active: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching active projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;