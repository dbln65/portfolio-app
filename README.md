# 🌐 Portfolio App — AWS EKS Fullstack Web Application

This project is a **modern fullstack web application** built with **React**, **Node.js (Express)**, and **AWS Cloud Services** such as **Cognito**, **EKS**, **S3**, and **CloudFront**.  
<img width="1918" height="1052" alt="website" src="https://github.com/user-attachments/assets/c302238f-4d2f-44da-8567-40817d5989d1" />


---

## 🚀 Overview

The application consists of:
- A **React frontend** (SPA) deployed via **S3 + CloudFront**
- A **Node.js/Express backend API** running on **AWS EKS (Elastic Kubernetes Service)**
- **AWS Cognito** for secure user authentication (login/logout)
- A **Contact form** connected to the backend API
- A **PrivateRoute system** that protects access to personal sections of the site
- Modern **responsive design** powered by **TailwindCSS**

This setup demonstrates how a developer can build, containerize, and deploy a secure, scalable, and fully cloud-native web application.

---

## 🧭 Website Structure & Flow

The website is designed as a clean, single-page application with multiple routes managed by **React Router DOM**.

### 🌍 Public Pages
Accessible to all visitors:
- `/` → **Home / Hero Section**  
  Introduction of the developer, profile picture, and navigation buttons  
- `/contact` → **Contact Form**  
  Visitors can send messages via a backend POST endpoint  

### 🔒 Protected Pages
Only visible to authenticated users:
- `/aboutme` 
  This page shows **personal or professional project data**, visible only after a **successful login** through AWS Cognito.  
  The protection is handled by a **custom PrivateRoute** component which checks if a valid user session exists.

If a visitor tries to access these protected routes without being logged in, they are automatically **redirected to the `/login` page**.

This section is intentionally **not publicly visible**.  
It becomes accessible only after authentication, ensuring that **private or professional details** are shared only with verified users (e.g., recruiters, clients, or collaborators).

---

## 🧱 Project Structure

### Frontend (`/frontend`)

- **index.html**
- **vite.config.js**
- **tailwind.config.js**
- **postcss.config.js**
- **package.json**
- **package-lock.json**
- **public/**
  - `david.jpg` — profile image
- **src/**
  - **App.jsx** — Main router (`/`, `/projects`, `/contact`, `/login`)
  - **main.jsx** — App bootstrap (React root + `AuthProvider`)
  - **index.css** — Tailwind base styles
  - **api.js** — Central Axios instance (adds Bearer token)
   
  - **components/**
    - `Navbar.jsx` — navigation (login/logout state aware)
    - `Hero.jsx` — landing/intro section
    - `AboutMe.jsx` — protected project list
    - `Contact.jsx` — contact form
    - `Footer.jsx` — footer
  - **context/**
    - `AuthContext.jsx` — Cognito session handling (global auth state)
  - **auth/**
    - `Login.jsx` — Cognito login form
    - `PrivateRoute.jsx` — route guard for protected pages
    - `cognito.js` — AWS Amplify Cognito config (region, pool, client)

### Backend (`/backend`)

- **server.js** — Express server (routes, CORS, JSON)
- **aboutme.js** — static project data source
- **package.json**
- **package-lock.json**
- Dockerfile
- .dockerignore

---

## 🖥️ Frontend Details

The frontend is built with **React 18**, **Vite**, and **TailwindCSS** for a fast, modular, and modern development workflow.

### Key Components
| Component | Description |
|------------|-------------|
| **App.jsx** | Main routing logic with React Router (`/`, `/projects`, `/contact`, `/login`) |
| **Navbar.jsx** | Sticky top navigation bar with conditional rendering for authenticated users |
| **Hero.jsx** | Landing page with personal introduction and quick navigation |
| **AboutMe.jsx** | Displays user projects fetched from the backend (protected route) |
| **Contact.jsx** | Contact form connected to the backend (`/contact` POST request) |
| **Login.jsx** | Login form using AWS Cognito authentication |
| **PrivateRoute.jsx** | Protects sensitive routes by verifying Cognito session before rendering |
| **Footer.jsx** | Footer section with copyright |
| **AuthContext.jsx** | Manages authentication state globally using AWS Amplify’s Auth module |
| **cognito.js** | AWS Amplify configuration (region, User Pool ID, and App Client ID) |
| **api.js** | Axios instance managing all API requests and automatic token attachment |

---

## 🔐 Authentication & Protected Routes

Authentication is handled by **AWS Cognito** through **AWS Amplify**.  
When a user logs in, Cognito returns an **ID token (JWT)** which is stored in `localStorage`.  

### Authentication Flow:
1. User logs in via `/login`
2. Cognito validates credentials and returns an ID token
3. The token is stored in `localStorage`
4. Axios automatically attaches this token as a Bearer header in every request
5. The **AuthContext** updates the global user state
6. Protected components (like `/projects` or `/about-me`) are only rendered if a valid user session exists

If no token or expired session is found, the user is **redirected to the login page**.

This ensures that personal information, such as the developer’s background or private project details, remains **hidden to the public**.

---

## ⚙️ Backend Details

The backend is a lightweight **Express.js** API, containerized and deployed on **AWS EKS**.

### Endpoints
| Method | Endpoint | Description |
|---------|-----------|-------------|
| **GET** | `/health` | Health check (“API läuft!”) |
| **GET** | `/projects` | Returns project data from `projects.js` |
| **POST** | `/contact` | Receives form submissions from the frontend and logs them |


### Features
- `express.json()` for JSON body parsing  
- `cors()` for secure cross-origin access  
- `.env` configuration with `dotenv`  
- Modular and ready for future expansion (database, email, etc.)

---

## ☁️ AWS Integration

| Service | Role |
|----------|------|
| **Cognito** | Authentication and user management |
| **S3** | Static hosting for the React build |
| **CloudFront** | CDN with global HTTPS distribution |
| **EKS (Kubernetes)** | Backend container orchestration |
| **ACM (Certificate Manager)** | SSL/TLS certificates for HTTPS |

---

## 🧠 Technologies Used

**Frontend:**
- React 18
- Vite
- TailwindCSS
- AWS Amplify (Cognito Auth)
- Axios
- React Router DOM
- Framer Motion (animations)

**Backend:**
- Node.js + Express
- dotenv
- cors

**Infrastructure:**
- AWS EKS (Docker + Kubernetes)
- AWS ECR (Container Registry)
- AWS S3 + CloudFront
- AWS Cognito
- AWS Certificate Manager

---

## 💡 Future Improvements

| Feature | Description |
|----------|-------------|
| 🧾 **AWS SES Integration** | Send real emails from the contact form |
| 📊 **CloudWatch Monitoring** | Log and visualize user and API activity |
| 🧩 **Admin Dashboard** | Secure admin interface to manage projects |
| 🔄 **CI/CD with GitHub Actions** | Automated deployment pipeline |
| 📱 **PWA or Mobile App** | Progressive Web App for mobile devices |
| 🧠 **Database Integration** | Store projects and messages in DynamoDB or MongoDB |

---

## 🧰 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- AWS Cognito configuration (User Pool + App Client)
- `.env` file with API URL and credentials

### 1️⃣ Clone this repo and install


```bash
cd frontend
npm install
```
### 2️⃣ Run frontend
```bash
npm run dev
```
### 3️⃣ Run backend
```bash
cd ../backend
npm install
node server.js
```
Frontend default: http://localhost:5173
Backend default: http://localhost:8080

---

⭐ Final Note

This project demonstrates how to build a secure and scalable fullstack cloud application using AWS technologies.
It combines modern frontend design with a containerized backend and integrates AWS Cognito for authentication and role-based access.

Sensitive sections like About Me are protected and only visible to verified users — showcasing how frontend security and backend authentication can be combined seamlessly in a professional cloud-native setup.


---

🎓 Learning Purpose

This application was developed as a DevOps learning project, combining multiple cloud and web technologies into one workflow.
It serves as a hands-on foundation for understanding how modern web applications are built, containerized, deployed, and scaled in the cloud.

The project provides a strong base for further extensions — such as adding CI/CD pipelines, monitoring, database integration, or automated infrastructure provisioning with Terraform or AWS CDK.

In summary, this web application is both a portfolio project and a DevOps training environment, demonstrating practical end-to-end cloud deployment principles using real AWS services.




