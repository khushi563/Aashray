🌟 Aashray – MERN NGO Management System

Aashray is a full-stack MERN (MongoDB, Express, React, Node) application designed for NGOs to manage projects, donations, volunteers, and admin operations.

🚀 Features
👥 User Features

📌 View all NGO projects

❤️ Donate to any project

🙋 Register as volunteer

💬 Contact / support page

🔐 Admin Features

🔑 Admin login (JWT Authentication)

📂 Create, update, delete projects

🧑‍🤝‍🧑 Manage volunteers

💵 View all donations

📊 Dashboard with statistics

📁 Project Structure
Aashray/
  backend/
    models/
    routes/
    server.js
    .env
    package.json
  frontend/
    src/
    public/
    package.json

🛠️ Tech Stack

Frontend: React.js, Axios, React Router

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT

Database: MongoDB / MongoDB Atlas

⚙️ Backend Setup

Open terminal and go to backend folder:
cd backend

Install dependencies:
npm install

Create .env file with:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000


Start backend:
node server.js

🌐 Frontend Setup

Go to frontend folder:
cd frontend

Install dependencies:
npm install

Start frontend:
npm start

🔗 API Endpoints
📂 Projects

GET /projects

POST /projects

GET /projects/:id

PUT /projects/:id

DELETE /projects/:id

💰 Donations

POST /donations

GET /donations

🙋 Volunteers

POST /volunteers

GET /volunteers

🔑 Auth

POST /auth/login

🔒 Admin Login System

Admin login includes:

Email and password

JWT token stored on frontend

Protected admin routes

🚧 Future Improvements

💳 Payment gateway (Razorpay/Stripe)

👥 Multi-admin support

📅 Event registration system

🧾 Automatic donation receipts

📨 Newsletter and email system
