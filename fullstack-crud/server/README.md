# Fullstack CRUD App

This project is a complete **full-stack CRUD application** built during Week 4 of the 4-Month SaaS-Founder Intensive.  
It connects a **React frontend** to a **Node + Express + Prisma backend** with a persistent database and live deployment.

---

## 🌐 Live Links
- **Frontend (React / Netlify):** [https://devfoundations.netlify.app]
- **Backend (API / Render):** [https://dev-foundations.onrender.com]

---

## 🧭 Project Overview
Users can:
- Add new items  
- View all items  
- Delete items  
- Refresh and retain data (persistent via Prisma + SQLite)

Each action flows through:
**React → API Helper → Express → Prisma → Database**

---

## 🧰 Tech Stack
| Layer | Tool | Purpose |
|-------|------|----------|
| Frontend | React (Vite) | Build UI and handle user input |
| Backend | Node + Express | Manage routes, logic, and API |
| ORM | Prisma | Interface between JS and SQL |
| Database | SQLite | Local persistent data storage |
| Deployment | Netlify (frontend) + Render (backend) | Live hosting |
| Version Control | Git + GitHub | Code sync and auto-deploy triggers |

---

## ⚙️ Local Setup
```bash
# clone repo
git clone https://github.com/caseytaitel/dev-foundations.git
cd fullstack-crud

# run server
cd server
npm install
npm run dev

# run client
cd ../react
npm install
npm run dev