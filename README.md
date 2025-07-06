# 🏢 Building Management System (BMS)

A modern single-building management web application with separate roles for **User**, **Member**, and **Admin**.
Users can view available apartments, request agreements, make rent payments via Stripe, and more — all with a
secure authentication system and dynamic dashboard experiences for different user roles.

---

## 🌐 Live URL

> [🚀 View Live Site](https://incandescent-cocada-df31e4.netlify.app/)

---

## 📦 Frontend Tech Stack

- **React** (Vite)
- **TailwindCSS**, **DaisyUI**, **Material Tailwind**
- **React Router DOM**, **React Icons**, **React Hook Form**
- **React Toastify**, **Lottie React**
- **@Tanstack/react-query** for fetching and caching
- **Lucide React** for modern icons
- **Moment.js**, **date-fns** for time formatting
- **Stripe** for card payment
- **jsPDF & jsPDF-Autotable** for PDF invoice generation

### 🔧 Frontend Setup

```bash
npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest
npm i @material-tailwind/react
npm install react-slick slick-carousel
npm install react-icons --save
npm install react-hook-form react-toastify
npm i react-helmet
npm i lottie-react
npm install @tanstack/react-query
npm install lucide-react
npm install date-fns
npm install --save moment
npm i @stripe/react-stripe-js
npm install jspdf jspdf-autotable

```

### 🔧 Backend Setup

```bash
npm init -y
npm i express cors mongodb dotenv
npm install -g nodemon
npm install jsonwebtoken
require('crypto').randomBytes(64).toString('hex')
npm install cookie-parser
nodemon index.js
npm install --save stripe

```
