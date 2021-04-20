import React from "react";
import { useForm } from "react-hook-form";
import "./style.css";

function SignUpForm() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const intialValues = {
    firstName:"",
    lastName:"",
    password: "",
    confirmPassword:"",
    email: "",

  };

  return (
  
      <form  onSubmit={handleSubmit(onSubmit)} >
         <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input
          defaultValue={intialValues.email}
          placeholder="Email"
          type="email"
          {...register("email")}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          defaultValue={intialValues.firstName}
          placeholder="First Name"
          type="firstName"
          {...register("firstName")}
        />
        <label htmlFor="LastName">Last Name</label>
        <input
          defaultValue={intialValues.lastName}
          placeholder="Last Name"
          type="lastName"
          {...register("lastName")}
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
        <label htmlFor="confrimPassword">Confirm your Password</label>
        <input
          defaultValue={intialValues.confirmPassword}
          placeholder="Confirm your Password"
          {...register("confirmPassword", {
            validate: (value) => value.length > 6
          })}
        />
        {errors.confirmPassword&& <p>Your Password Doesn't Match!</p>}
  
  
        <input type="submit" />
      </form>
  
    );
  }
export default SignUpForm;