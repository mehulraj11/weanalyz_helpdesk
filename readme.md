# 🛠️ Helpdesk System

The **Helpdesk System** is a web-based application designed for managing and tracking support tickets within an organization. Built using the **MERN stack**, it offers user authentication and basic ticket handling capabilities, along with an intuitive UI.

---

## 🚀 Overview

This system helps organizations streamline ticket creation and management by providing a simple, role-based interface. While the backend supports key functionality like authentication and ticket creation, the frontend includes rich UI components for future enhancements.

---

## 🧰 Technology Stack

- **Frontend**: React  
  - React Router  
  - React Icons  
- **Backend**: Node.js with Express  
- **Database**: MongoDB  
- **HTTP Client**: Axios  

---

## ✅ Functionalities Implemented

### 🧾 Backend Functionalities

1. **User Authentication**
   - Signup
   - Login
   - Role-based Dashboards (User, Operation, Admin, Technical)

2. **Ticket Handling**
   - Create a new ticket
   - Ticket opprovals for resolving
   - Database Access in Admin panel

3. **Analytics**
   - API to fetch total ticket count

---

### 🎨 UI-Only Features

These features are implemented in the frontend only (no backend functionality yet):

- Ticket Update and Delete
- Team Creation Modal
- Feedback and Ratings UI
- Charts, Logs, and Database UI Pages
- Profile and Settings Pages

---

## 🛠️ How to Run

### 🔁 Backend Setup
```bash
cd backend
npm install
node app.js
