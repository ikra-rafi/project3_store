import React from "react";
import Container from "../components/Container";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

function Admin() {
  return (
    <div>
      <Container>
        <LoginForm />
        <SignUpForm />
        <ForgotPasswordForm />
      </Container>
</div>
  );
}

export default Admin;