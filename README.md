# 📇 Contact Manager – MERN Stack Application

A full-stack **Contact Management Web Application** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project was developed completely from scratch as part of a **Web Developer Interview Assignment**, following real-world development practices, clean Git history, and production deployment.

---

## 🚀 Live Project Links

- **Frontend (Vercel)**  
  https://contact-manager-mern-dun.vercel.app/

- **Backend API (Render)**  
  https://contact-manager-mern-0y8k.onrender.com/

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS (official Vite integration)
- Axios
- React Hooks (`useState`, `useEffect`)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## ✨ Features

### Core Features
- Contact form with fields:
  - Name (required)
  - Email (valid email required)
  - Phone (required)
  - Message (optional)
- Client-side form validation with error messages
- Submit button disabled when form is invalid
- Contacts stored securely in MongoDB
- Fetch and display contacts without page reload
- Responsive and clean UI

### Bonus Features
- Delete contact functionality
- Success message after submission
- Basic sorting (Latest / Oldest)
- Reusable React components
- Environment-based configuration for production

---

## 📂 Project Structure

contact-manager-mern/

│

├── client/ # React frontend

│ ├── src/

│ │ ├── components/

│ │ │ └── ContactCard.jsx

│ │ ├── api.js

│ │ ├── App.jsx

│ │ ├── main.jsx

│ │ └── index.css

│ └── vite.config.js

│

├── server/ # Node + Express backend

│ ├── config/

│ │ └── db.js

│ ├── models/

│ │ └── Contact.js

│ ├── routes/

│ │ └── contact.routes.js

│ ├── index.js

│ └── package.json

│

├── .gitignore

└── README.md


---

## ⚙️ Local Setup (Optional)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Subhadeep2609/contact-manager-mern.git
cd contact-manager-mern
```
### 2️⃣ Backend Setup
```bash
cd server
npm install
```
Create a .env file inside server:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
```
Run backend:
```bash
npm run dev
```

---
### 3️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev
```
---
## 🔐 Environment Variables 

 Backend (Render)
 ```nginx
 MONGO_URI
PORT
```
Frontend (Vercel)
```nginx
VITE_API_URL
```
---
## 📡 API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/contacts` | Create a new contact |
| GET | `/api/contacts` | Fetch all contacts |
| DELETE | `/api/contacts/:id` | Delete a contact |

---

## 📌 Assignment Summary

- Built within the given time constraints

- Focused on functionality and clarity

- Clean Git commit history from project initialization

- Production deployment on Vercel and Render

- Bonus features implemented beyond requirements
  
---

### 👨‍💻 Author

Subhadeep Saha

GitHub: https://github.com/Subhadeep2609

---

### 🏁 Conclusion

This project demonstrates:

- Strong understanding of MERN stack fundamentals

- REST API design and database integration

- Frontend-backend communication

- Production deployment and environment management

Feel free to explore the project and review the code.

Feedback is always welcome! 🚀
