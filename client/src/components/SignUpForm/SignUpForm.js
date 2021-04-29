import React, {useState} from "react";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
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

  // function to save the signup name to state
  function handleChange(event) {
    setSignup({
      ...signup, [event.target.name]: event.target.value
    })
  }

  // function to handle the submit button
  const onSubmit = (data) => {

    // object to store the new user info from fields before saving to db
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
    // api call to save the new user info
    API.saveLogin(storeLogin)
      .then(res => {
        // check if successful save
        if(res.status === 200) {
          // clear all the signup fields
          setValue("email", "");
          setValue("firstName", "");
          setValue("lastName", "");
          setValue("securityQuestion", "");
          setValue("answer", "");
          setValue("password", "");
          setValue("confirmPassword", "");
          // display alert informing user their signup was successful
          alert("Account created, please login to continue.")
        }
      })
      .catch(err => console.log(err));

  };

    // object for initial values of fields on page
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
  
      <form id="signup" onSubmit={handleSubmit(onSubmit)} >
         <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input className="signup-input"
          defaultValue={initialValues.email}
          placeholder="Email"
          type="email"
          onChange={handleChange}
          {...register("email")}
        />
        <label htmlFor="firstName">First Name</label>
        <input 
          defaultValue={initialValues.firstName}
          placeholder="First Name"
          type="firstName"
          onChange={handleChange}
          {...register("firstName")}
        />
        <label htmlFor="LastName">Last Name</label>
        <input className="signup-input"
          defaultValue={initialValues.lastName}
          placeholder="Last Name"
          type="lastName"
          onChange={handleChange}
          {...register("lastName")}
        />

        <label htmlFor="securityQuestion">Security Question</label>
        <input 
          defaultValue={initialValues.securityQuestion}
          placeholder="Security Question"
          type="securityQuestion"
          onChange={handleChange}
          {...register("securityQuestion")}
        />

        <label htmlFor="answer">Answer</label>
        <input 
          defaultValue={initialValues.answer}
          placeholder="Answer"
          type="answer"
          onChange={handleChange}
          {...register("answer")}
        />
  
        <label htmlFor="password">Password</label>
        <input 
          defaultValue={initialValues.password}
          placeholder="Password"
          type="password"
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
        <input className="signup-input" value="Sign Up" type="submit" />
      </form>
    );
  }

export default SignUpForm;