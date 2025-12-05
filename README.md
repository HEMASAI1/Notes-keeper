# 📝 Notes Keeper — Full Stack MERN Application

A clean and responsive full-stack notes management app built using **React**, **Node.js**, **Express**, and **MongoDB Atlas**.  
This project demonstrates CRUD operations, searching, tag filtering, inline editing, a dynamic UI, debounced search, and optimistic UI updates.

---

## 🚀 Features

### 🖥 Frontend (React)
- Modern, responsive UI with custom theming  
- Create, edit, delete notes  
- Inline editing directly in the list  
- Search notes with **debounce**  
- Tag chips + clickable tag filtering  
- Live preview while typing  
- Optimistic UI for smooth interactions  

### ⚙️ Backend (Node + Express)
- REST API (CRUD endpoints)  
- MongoDB Atlas integration  
- Clean folder structure  
- CORS enabled  
- Error-handled responses  

---

## 🧱 Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React, JSX, CSS, Hooks |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Tools | Git, VS Code, Postman |

---
Notes-keeper/
│
├── Backend/
│ ├── server.js
│ ├── routes/
│ ├── models/
│ ├── config/
│ ├── package.json
│ └── .env (not pushed to GitHub)
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── hooks/
│ │ ├── App.js
│ │ └── index.js
│ ├── public/
│ └── package.json
│
└── README.md

Backend Setup:

cd Backend

npm install

Create .env:
PORT=5000
MONGODB_URI=YOUR_MONGO_ATLAS_URI
Start server:
npm run dev
Frontend Setup
cd frontend
npm install
npm start
Runs on:
http://localhost:3000
🎯 Future Improvements

User authentication (JWT)

Dark mode

Pinned notes

Rich text editor

Deploy on Vercel + Railway

🌟 Author

HEMASAI
Full Stack & AI/ML Developer
GitHub: https://github.com/HEMASAI1


