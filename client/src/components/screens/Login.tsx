"use client";
import { useState } from "react";
import AuthForm from "../elements/AuthForm";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  console.log("Login:" , data);
  
  return (
    <AuthForm
      title="Login"
      description="Enter your email below to login to your account"
      submitText="Login"
      footerText="Don't have an account?"
      footerLink="/sign-up"
      footerLinkText="Sign up"
      image="/anime-girl-1.jpg"
      type="login"
      data={data}
      setData={setData}
    />
  );
}

export default Login;
