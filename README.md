# Notes Keeper 📝

A simple, responsive full-stack notes app built with React (frontend) and Node.js + Express (backend), using MongoDB Atlas for storage.  
Supports creating, editing, deleting, searching, and tag-based filtering of notes. Designed as a learning / portfolio project.

---

## Demo (local)
- Backend: `http://localhost:5000`  
- Frontend: `http://localhost:3000`

---

## Features

- Create / Read / Update / Delete notes  
- Tag chips and clickable tag filtering  
- Debounced search to reduce API calls  
- Inline editing and optimistic UI updates  
- Live preview while typing (frontend only)

---

## Tech stack

- Frontend: React, Hooks, CSS  
- Backend: Node.js, Express  
- Database: MongoDB Atlas  
- Tools: Git, VS Code, npm

---

## Project structure

Notes-keeper/
├─ Backend/
│ ├─ server.js
│ ├─ routes/
│ ├─ models/
│ └─ package.json
├─ frontend/
│ ├─ public/
│ └─ src/
│ ├─ components/
│ ├─ services/
│ ├─ hooks/
│ ├─ App.js
│ └─ index.js
└─ README.md


---

## Setup (local)

1. Backend
bash
cd Backend
npm install
npm run dev

2. Frontend
cd ../frontend
npm install
npm start
# open http://localhost:3000

Next improvements

Add user authentication (JWT)

Dark mode and mobile tweaks

Deployment: frontend (Vercel) + backend (Railway / Render)

Author

HEMASAI — Full-stack developer

GitHub: https://github.com/HEMASAI1



