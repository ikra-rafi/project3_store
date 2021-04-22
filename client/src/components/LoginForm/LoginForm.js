import React from "react";
import { useForm } from "react-hook-form";
// import ForgotPasswordForm from "../ForgotPasswordForm";

import "./style.css";


function LoginForm() {
   const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const intialValues = {

    password: "",
    email: "",

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <h1>Log In</h1>
      <label htmlFor="email">Email</label>
      <input
        defaultValue={intialValues.email}
        placeholder="Email"
        type="email"
        {...register("email")}
      />

      <label htmlFor="password">Password</label>
      <input
        defaultValue={intialValues.password}
        placeholder="Password"
        {...register("password", {
          validate: (value) => value.length > 6
        })}
      />
      {errors. password&& <p>Your Password is less than 6 characters</p>}


      <input type="submit" />
      <br></br>
      <a href="">FORGOT YOUR PASSWORD?</a>

      
  
    </form>

  );
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<LoginForm/>, rootElement);



export default LoginForm;
