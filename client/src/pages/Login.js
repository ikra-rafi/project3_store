import React from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";


function Login() {
  return (
    <div id="login" className="container py-5">
    <div className="row">
    <div className="col-lg-6 col-xm-12">
        <LoginForm /> 
        <ForgotPasswordForm />
    </div>
    <div className="col-lg-6 col-xm-12"> 
         <SignUpForm />
      </div> </div>
     
        </div>     
  );
}
export default Login;