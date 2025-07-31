# TrustFlag.in 🚩 — A Trustpilot-like Review Platform

**TrustFlag.in** was an independent review platform aimed to bring transparent, user-generated feedback for businesses, similar to what Trustpilot offers.  
The platform allowed users to sign in with Google, search and review companies, and read customer feedback with ease.

Although the project has been discontinued due to lack of user traction, it remains a solid technical example of building a scalable review system using **Next.js**, **Tailwind**, **NextAuth**, and a Node.js backend.

---

## 🚀 Features

- Company & category browsing
- Search and review system
- Star rating support
- Google Sign-In using NextAuth
- API integration with backend
- Fully responsive UI with Tailwind CSS

---

## 🛠️ Getting Started

Clone the repo and install dependencies:

```
npm install
Then create a .env file in the root and add the following environment variables:

env
Copy
Edit
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/v1
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

BACKEND_URL=http://localhost:8080
NEXTAUTH_SECRET=secret12
JWT_SECRET=secret12
NODE_ENV=production
NEXTAUTH_URL=http://localhost:3000
▶️ Running the Dev Server

npm run dev
The app will start on http://localhost:3000 
```
---

The backend server for this project is available here:
👉 https://trustflag-backend.example.com