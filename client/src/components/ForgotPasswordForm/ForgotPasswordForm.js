import React from "react";
import { useForm } from "react-hook-form";
import "./style.css";
// import Login from "../../pages/Login.js";
// import { Link } from "react-router-dom";

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
  securityQuestion:"",
    answer:"",
    password: "",

  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

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
         <label htmlFor="securityQuestion">Security Question</label>
        <input
          defaultValue={intialValues.securityQuestion}
          placeholder="Security Question"
          type="securityQuestion"
          {...register("securityQuestion")}
        />

        <label htmlFor="answer">Answer</label>
        <input
          defaultValue={intialValues.answer}
          placeholder="Answer"
          type="answer"
          {...register("answer")}
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
         <label  id="luna"  onClick={scrollToTop}>LOGIN</label>
    </form>
  );
}

export default ForgotPasswordForm;