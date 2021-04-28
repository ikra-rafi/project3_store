import React, {useState} from "react";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
//import {useTodoContext} from "../../utils/store";
import "./style.css";

function SignUpForm() {

  const {

    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const temp = {
    email: '',
    password: '',
  }

  const [signup, setSignup] = useState(temp);
//  const [state, dispatch] = useTodoContext();

  function handleChange(event) {
    setSignup({
      ...signup, [event.target.name]: event.target.value
    })
  }

  const onSubmit = (data) => {

    console.log('sign-up email: ' + signup.email)
    const storeLogin = [{
      email: data.email,
      password: data.password,
      securityQuestion: data.securityQuestion,
      securityAnswer: data.answer,
      firstName: data.firstName,
      lastName: data.lastName,
      admin: false,
      discount: 10
    }]
  
    console.log(storeLogin)
    API.saveLogin(storeLogin)
      .then(res => {
        console.log("signup");
        console.log(res.data);
        if(res.status === 200) {
          setSignup({
            redirectTo: "/"
          })
        }
      })
      .catch(err => console.log(err));
      setValue("email", "");
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("securityQuestion", "");
      setValue("answer", "");
      setValue("password", "");
      setValue("confirmPassword", "");
      alert("Account created, please login to continue.")
  };
  const initialValues = {
    firstName:"",
    lastName:"",
    password: "",
    confirmPassword:"",
    email: "",
    securityQuestion:"",
    answer:"",

  };

  return (
  
      <form  onSubmit={handleSubmit(onSubmit)} >
         <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input
          defaultValue={initialValues.email}
          placeholder="Email"
          type="email"
          onChange={handleChange}
//          value={signup.email}
          {...register("email")}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          defaultValue={initialValues.firstName}
          placeholder="First Name"
          type="firstName"
          onChange={handleChange}
//          value={firstName}
          {...register("firstName")}
        />
        <label htmlFor="LastName">Last Name</label>
        <input
          defaultValue={initialValues.lastName}
          placeholder="Last Name"
          type="lastName"
//          value={lastName}
          onChange={handleChange}
          {...register("lastName")}
        />

        <label htmlFor="securityQuestion">Security Question</label>
        <input
          defaultValue={initialValues.securityQuestion}
          placeholder="Security Question"
          type="securityQuestion"
//          value={securityQuestion}
          onChange={handleChange}
          {...register("securityQuestion")}
        />

        <label htmlFor="answer">Answer</label>
        <input
          defaultValue={initialValues.answer}
          placeholder="Answer"
          type="answer"
//          value={answer}
          onChange={handleChange}
          {...register("answer")}
        />
  
        <label htmlFor="password">Password</label>
        <input
          defaultValue={initialValues.password}
          placeholder="Password"
          type="password"
//          value={password}
          onChange={handleChange}
          {...register("password", {
            validate: (value) => value.length >= 6
          })}
        />
        {errors.password&& <p>Your Password is less than 6 characters</p>}
        
        <label htmlFor="confrimPassword">Confirm your Password</label>
        <input
          defaultValue={initialValues.confirmPassword}
          placeholder="Confirm your Password"
          type="password"
          onChange={handleChange}
          {...register("confirmPassword", {
            validate: (value) => value.length >= 6
          })}
        />
        {errors.confirmPassword&& <p>Your Password Doesn't Match!</p>}  
        <input type="submit" />
      </form>
    );
  }

export default SignUpForm;