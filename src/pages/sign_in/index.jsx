import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

const SignIn = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); // useNavigate hookini chaqiramiz

  const handleLogin = (event) => {
    event.preventDefault();
    const userData = {
      username: usernameRef.current.value + "",
      password: passwordRef.current.value + "",
    };

    // Foydalanuvchini autentifikatsiya qilish
    fetch("https://expense.uz/account/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          alert("Parol yoki username xato!");
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access", data?.data?.tokens?.access);
        localStorage.setItem("refresh", data?.data?.tokens?.refresh);
        localStorage.setItem("username", data?.data?.username);
        localStorage.setItem("id", data?.data?.id);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="sign_in">
      <form onSubmit={handleLogin} autoComplete="off">
        <input
          ref={usernameRef}
          type="text"
          name="username"
          autoComplete="off"
          placeholder="Username"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
        />
        <button type="submit">Войти</button>
        <Link to={"/"}>
          Нет аккаунта? <span>Регистрация</span>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
