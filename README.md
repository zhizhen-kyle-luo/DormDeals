# DormDeals

DormDeals is a full-stack web application for buying, selling, and managing items within a campus or dormitory community. The project uses a modern JavaScript stack with React on the frontend, Node.js/Express/MongoDB on the backend, and supports real-time features via Socket.io.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Usage](#usage)
- [Customization](#customization)
- [Key Files](#key-files)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Project Overview
DormDeals provides a platform for campus communities to safely and efficiently buy, sell, and review items and services. It includes user authentication, profile management, shopping cart, order management, reviews, and more. The project is based on the MIT WebLab skeleton for rapid prototyping and learning.

---

## Tech Stack
- **Frontend:** React (JSX), Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (via Mongoose)
- **Authentication:** Google OAuth
- **Real-Time:** Socket.io (optional)
- **Dev Tools:** Prettier, npm, Vite

---

## Directory Structure
```
DormDeals/
├── .gitattributes, .gitignore, .npmrc, .prettierrc
├── package.json, package-lock.json
├── README.md
├── vite.config.js
├── client/
│   ├── dist/
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── client-socket.js
│       ├── components/
│       │   ├── App.jsx
│       │   ├── modules/
│       │   └── pages/
│       │       ├── Cart.jsx, Home.jsx, Login.jsx, Profile.jsx, ...
│       ├── utilities/
│       ├── utilities.js, utilities.css
├── server/
│   ├── api.js
│   ├── auth.js
│   ├── models/
│   ├── server-socket.js
│   ├── server.js
│   └── validator.js
└── .env.example
```

---

## Features
- **User Authentication:** Google OAuth for secure login
- **User Profiles:** View and manage user information
- **Shopping Cart:** Add, remove, and purchase items
- **Order Management:** Create, view, and manage orders
- **Reviews:** Leave and view reviews for users/items
- **Real-Time Updates:** Socket.io for optional real-time features
- **Responsive UI:** Modular React components with dedicated CSS
- **RESTful API:** Express routes for backend logic

---

## Setup and Installation
### Prerequisites
- Node.js v18+
- npm v8+
- MongoDB Atlas account
- Google OAuth CLIENT_ID

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/zhizhen-kyle-luo/DormDeals.git
   cd DormDeals
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Setup environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (MongoDB connection string, Google CLIENT_ID, etc).
4. **Start the application:**
   - Open two terminals:
     - Terminal 1 (Frontend):
       ```sh
       npm run dev
       ```
     - Terminal 2 (Backend):
       ```sh
       npm start
       ```
   - Visit `http://localhost:5173` in your browser.

---

## Configuration
- **Google OAuth:**
  - Set your CLIENT_ID in both the frontend (`Skeleton.jsx`) and backend (`auth.js`).
- **MongoDB:**
  - Set the connection URI and database name in `.env` and `server.js`.

---

## Scripts
- `npm run dev`: Starts the frontend development server (Vite)
- `npm start`: Starts the backend server (with nodemon)
- `npm run build`: Builds the frontend for production
- `npm run preview`: Previews the production build

---

## Usage
- Register or log in with your Google account
- Browse items, add to cart, and make purchases
- Manage your orders and leave reviews
- Access your profile for order and review history

---

## Customization
- **App Name & Metadata:** Update `package.json` and `README.md`
- **Favicon:** Replace `client/dist/favicon.ico`
- **Website Title:** Edit in `client/dist/index.html`
- **Styling:** Each component/page has its own CSS for easy customization

---

## Key Files
- `client/src/components/pages/`: Main React page components (Cart, Home, Login, Profile, etc.)
- `client/src/utilities.js`: Shared frontend utilities
- `server/api.js`: Backend API routes
- `server/models/`: Mongoose schemas
- `server/auth.js`: Google OAuth logic
- `server/server.js`: Express server entry point
- `.env.example`: Reference for required environment variables

---

## License
MIT

---

## Acknowledgements
- Based on the MIT WebLab skeleton app
- Uses open-source libraries including React, Express, Mongoose, and Socket.io

