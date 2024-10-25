import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

const SignUp = () => {
  const usernameRef = useRef();
  const password = useRef();
  const password2 = useRef();
  const navigate = useNavigate(); // useNavigate hookini chaqiramiz

  const handleForm = async (event) => {
    event.preventDefault();
    const userData = {
      username: usernameRef.current.value + "",
      password: password.current.value + "",
      password2: password2.current.value + "",
    };

    if (userData.password === userData.password2) {
      try {
        const response = await fetch("https://expense.uz/account/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        console.log(response); // Javob obyekti chiqadi

        if (!response.ok) {
          console.log("Xato bo'ldi, kod:", response.status);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Salom, ma'lumot keldi:", data);

        localStorage.setItem("access", data?.data?.tokens?.access);
        localStorage.setItem("refresh", data?.data?.tokens?.refresh);
        localStorage.setItem("username", data?.data?.username);

        navigate("/home");
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    } else {
      alert("2 xil yozding");
    }
  };

  return (
    <div className="sign_up">
      <form autoComplete="off" onSubmit={handleForm}>
        <input
          ref={usernameRef}
          type="text"
          name="username123"
          autoComplete="off"
          placeholder="username"
        />
        <input
          ref={password}
          type="password"
          name="password123"
          autoComplete="new-password"
          placeholder="password"
        />
        <input
          ref={password2}
          type="password"
          name="password_confirm"
          autoComplete="new-password"
          placeholder="confirm password"
        />
        <button type="submit">Регистрация</button>
        <Link to={"./login"}>
          Уже есть аккаунт? <span>Войти</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
