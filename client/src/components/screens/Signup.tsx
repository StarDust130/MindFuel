"use client";
import { useState } from "react";
import AuthForm from "../elements/AuthForm";

function SignUp() {
  const [data, setData] = useState({ email: "", password: "" });

  console.log("SignUp:", data);
  return (
    <AuthForm
      title="Sign Up"
      description="Enter your details below to create a new account"
      submitText="Sign Up"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
      image="/anime-girl-2.jpg"
      type="Signup"
      data={data}
      setData={setData}
    />
  );
}

export default SignUp;
