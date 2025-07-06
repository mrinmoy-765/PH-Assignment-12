# 🏢 Building Management System (BMS)

A modern single-building management web application with separate roles for **User**, **Member**, and **Admin**.
Users can view available apartments, request agreements, make rent payments via Stripe, and more — all with a
secure authentication system and dynamic dashboard experiences for different user roles.

---

## 🌐 Live URL

> [🚀 View Live Site](https://your-live-site-link.com)

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

```bash

This is a BUILDING MANAGEMENT(Single building) that
caters to both user, member and admin functionalities.
The website consist of Home Page, Authentication System ( email, password and google login via firebase).
User can uodate their email, password and regarding other profile information. We have Apartment details in card where
a user need to login to make an agreement request. After successfull agreement user will be promoted to member. We have three different dashboard for user, member and admin.
Members can pay rent via card through stripe where members can enjoy coupons.The admin/owner will be able to change the availability of a coupon. Members and users can leave a review and every visitor can reach out to our admin team.

```

```bash
Functionality:
The website uses URL param based backend filtering, searching, I have used tanstack query in this project. For authentication Firebase and for database mongodb is used. For frontend react and backend express is used.
Hooks and components have been used in this project to ensure clean and sufficient code reusability. The website is protected via JWT implementation. I have also used axios interceptor.

```
