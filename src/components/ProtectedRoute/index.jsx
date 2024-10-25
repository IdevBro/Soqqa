import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("access"); // tokenni tekshiramiz

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

// src/components/ProtectedRoute.js

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// // Tokenni muddati o'tganini tekshiradigan funksiya
// // const isTokenExpired = (token) => {
// //   const payload = JSON.parse(atob(token.split(".")[1])); // JWT token payload'ni dekod qilish
// //   const currentTime = Math.floor(Date.now() / 1000); // Joriy vaqtni olish
// //   return payload.exp < currentTime; // Token muddati tugagan bo'lsa true qaytaradi
// // };

// const isTokenExpired = (token) => {
//   if (!token || token.split(".").length !== 3) {
//     // Token mavjud emas yoki JWT formatida emas
//     return true;
//   }

//   try {
//     const payload = JSON.parse(atob(token.split(".")[1])); // JWT tokenning payload qismi
//     const currentTime = Math.floor(Date.now() / 1000); // Joriy vaqtni olish
//     return payload.exp < currentTime; // Token muddati tugagan bo'lsa true qaytaradi
//   } catch (error) {
//     console.error("Tokenni dekod qilishda xatolik: ", error);
//     return true; // Noto'g'ri token, expire bo'lgan deb hisoblaymiz
//   }
// };

// // Access tokenni yangilaydigan funksiya
// const refreshAccessToken = async () => {
//   const refreshToken = localStorage.getItem("refresh");

//   if (!refreshToken) {
//     return null;
//   }

//   // Refresh token orqali access tokenni yangilash
//   const res = await fetch("https://expense.uz/account/refresh/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ refresh: refreshToken }),
//   });

//   if (res.ok) {
//     const data = await res.json();
//     localStorage.setItem("access", data.access); // Yangi access tokenni saqlash
//     return data.access;
//   } else {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     return null;
//   }
// };

// const ProtectedRoute = ({ children }) => {
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       let token = localStorage.getItem("access");

//       // Token muddati o'tgan bo'lsa yangilashga harakat qilamiz
//       if (isTokenExpired(token)) {
//         token = await refreshAccessToken();
//       }

//       if (token) {
//         setIsAuth(true); // Foydalanuvchi autentifikatsiyadan o'tgan
//       } else {
//         setIsAuth(false); // Autentifikatsiya bo'lmagan
//       }
//     };

//     checkAuth();
//   }, []);

//   if (!isAuth) {
//     return <Navigate to="/login" />; // Foydalanuvchi autentifikatsiya qilinmagan bo'lsa login sahifasiga yo'naltirish
//   }

//   return children; // Agar autentifikatsiya qilingan bo'lsa, himoyalangan sahifaga kirish
// };

// export default ProtectedRoute;
