import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import API from "../../utils/API";
import { useTodoContext} from "../../utils/store";
import Login from "../../pages/Login.js";
import { Link } from "react-router-dom";

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const initialValues = {
    email: "",
    securityQuestion:"",
      answer:"",
      password: "",
  
    };

    const temp = {
      email: "",
      password: "",
      securityQuestion: "",
      securityAnswer: "",
      firstName: "",
      lastName: "",
    }

    useEffect(() => {
      getSecurityInfo();
  })

    const [state, dispatch] = useTodoContext();
    const [reset, setReset] = useState(temp);

    function getSecurityInfo() {
      var john = {
        password: "newfad",
        email: "p@aol.com"
      }
      console.log(john)
      API.getLogin(john)
      .then(res => {
        if(res.status ===200) {
//          setJohnData({...johnData, email: res.data.email});
//          dispatch({
//            type: "loggedIn",
//            loggedIn: true,
//            email: data.email
//          })
          initialValues.securityQuestion = res.data.securityQuestion;
          initialValues.answer = res.data.securityAnswer;
          console.log(initialValues);
        }
      })
      .catch(err => console.log(err));

    }

    function handleChange() {

    }

  const onSubmit = (data) => {
//    alert(JSON.stringify(data));



  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)} >
         <h1>Reset your password</h1>
         {/* <h2 id="h2">We will send you an email to reset your password.</h2> */}
        <label htmlFor="email">Email</label>
        <input
          defaultValue={initialValues.email}
          placeholder="Email"
          type="email"
          onChange={handleChange}
          {...register("email")}
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
        {errors. password&& <p>Your Password is less than 6 characters</p>}
        
         <input type="submit" />
         <br></br>
         <Link href="Login">Login</Link>
    </form>
  );
}

export default ForgotPasswordForm;