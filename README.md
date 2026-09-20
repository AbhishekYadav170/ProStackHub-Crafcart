# 🛒 CartCraft

CartCraft is a modern full-stack e-commerce web application where
users can browse products, create an account, manage their shopping
cart and place orders.

The project is built with Next.js on the frontend and Node.js,
Express.js and MongoDB on the backend.

---

## 🚀 Live Project

Frontend:

https://pro-stack-hub-crafcart-15xc.vercel.app/

Backend:

https://prostackhub-crafcart-backend.onrender.com/

---

## ✨ Features

### 👤 User Authentication

- User registration
- User login
- JWT authentication
- Logout functionality
- Protected user routes

### 🛍️ Products

- Browse products
- Product categories
- Product details
- Product search/filter functionality
- Real products stored in MongoDB

### 🛒 Shopping Cart

- Add products to cart
- Remove products from cart
- Update product quantity
- Cart item count
- Automatic cart total calculation
- User-specific cart

### 📦 Orders

- Create orders
- View user orders
- Order information
- Protected order routes

### ⭐ Reviews

- Product reviews
- User-based reviews
- Review management

### 🔐 Admin

Admin functionality includes:

- Product management
- Order management
- Dashboard
- Admin-protected routes

---

# 🛠️ Tech Stack

## Frontend

- Next.js
- React
- TypeScript / JavaScript
- CSS
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## Deployment

- Vercel - Frontend
- Render - Backend
- MongoDB - Database

---

# 📁 Project Structure

```text
cartcraft/
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── admin/
│   │
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seedProducts.js
│   └── package.json
│
├── ARCHITECTURE.md
└── README.md


Backend

The Express backend is deployed on Render.

Required environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


🔒 Environment Variables

Do not commit .env files containing real credentials.

Example:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret