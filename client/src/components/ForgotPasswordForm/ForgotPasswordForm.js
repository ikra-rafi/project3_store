import React from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import Login from "../../pages/Login.js";
import { Link } from "react-router-dom";

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const intialValues = {
  email: "",

  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)} >
         <h1>Reset your password</h1>
         {/* <h2 id="h2">We will send you an email to reset your password.</h2> */}
        <label htmlFor="email">Email</label>
        <input
          defaultValue={intialValues.email}
          placeholder="Email"
          type="email"
          {...register("email")}
        />
         <input type="submit" />
         <br></br>
         <Link href="Login">Login</Link>
    </form>
  );
}

export default ForgotPasswordForm;