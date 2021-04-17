import React from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

function Login() {
  return (
    <div>

        <LoginForm />
        <SignUpForm />
        <ForgotPasswordForm />

</div>
  );
}

export default Login;