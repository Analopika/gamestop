# Reaction Timer Game

A simple web application to measure and record users' reaction times. Users enter their name, press SPACE to start the timer, and react as quickly as possible when the screen turns green. The reaction time, along with the user's name and request metadata, is saved to a MongoDB database.

---

## 🔗 Live Demo

The application is deployed and accessible here:  
[https://gamestop-9loh.onrender.com/](https://gamestop-9loh.onrender.com/)

---

## 🛠 Project Overview

**Technologies Used:**
- Backend: Node.js, Express.js  
- Frontend: EJS, HTML, CSS, JavaScript  
- Database: MongoDB Atlas (cloud-hosted NoSQL database)  
- Deployment: Render (Node.js backend)  
- Version Control: Git + GitHub  

**Project Structure:**
gamestop/
├─ index.js # Main Node.js / Express application
├─ package.json # Node.js dependencies
├─ package-lock.json # Locked dependency versions
├─ views/
│ └─ index.ejs # Frontend template for reaction timer
├─ public/ # (Optional) Static assets if any
└─ .env.example # Example environment variables

## ⚙ Features

- Capture user reaction time with a randomized start delay.  
- Require user to enter their name before starting.  
- Store each reaction time along with:
  - Name of the user
  - Timestamp
  - Request metadata (HTTP method, URL, IP address, user-agent)  
- Console logging for server-side request tracking.  
- Easily extendable for leaderboards or analytics.  

---

## 📂 Database Structure

**Collection:** `reactions`  
**Document fields:**
- `name` (string) — user’s name  
- `time` (number) — reaction time in seconds  
- `requestInfo` (object) — includes method, URL, IP, user-agent, timestamp  
- `createdAt` (Date) — automatic creation timestamp  