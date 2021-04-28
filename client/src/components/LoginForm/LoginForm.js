import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from 'react-router-dom';
// import ForgotPasswordForm from "../ForgotPasswordForm";
import API from "../../utils/API";
import { useTodoContext } from "../../utils/store";
import "./style.css";


function LoginForm() {
   const {
    register,
    handleSubmit,
//setValue,
    formState: { errors }  } = useForm();

    const initialValues = {
      password: "",
      email: ""
    };

    let history=useHistory();

    const temp = {
      password: "",
      email: "",
      redirectTo: null
    }

    const [loginData, setLoginData] = useState(temp);
    const [state, dispatch] = useTodoContext();
//    const [johnData, setJohnData] = useState(temp);
  
    function handleChange(event) {
//      console.log("change = " + event.target.value);
      setLoginData({
        ...loginData, email: event.target.value
      })
//      setLoginData({
//        ...loginData, [event.target.name]: event.target.value
//      })
    }

  const onSubmit = (data) => {

    setLoginData({
      ...loginData, email: data.email,
    })

    var john = {
      password: data.password,
      email: data.email
    }
    console.log(john);
    API.getLogin(john)
      .then(res => {
        if(res.status ===200) {
          console.log("data.admin = " + res.data.admin);
//          setJohnData({...johnData, email: res.data.email});
          dispatch({
            type: "loggedIn",
            loggedIn: true,
            admin: res.data.admin,
            email: res.data.email
          })
        }
      })
      .catch(err => console.log(err));
    history.push("/");
  };

  return (

  <div>
    {loginData.redirectTo ? (
        <Redirect to={{ pathname: loginData.redirectTo }} />
    ) : (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)} >
      <h1 className="login-h1">Log In</h1>
      <label htmlFor="email">Email</label>
      <input className="input-login"
        defaultValue={initialValues.email}
//        value={loginData.email}
        placeholder="Email"
        type="email"
//        value={loginData.email}
        onChange={handleChange}
        {...register("email")}
      />

      <label className="label-login" htmlFor="password">Password</label>
      <input className="input-login"
//        value={loginData.password}
        defaultValue={initialValues.password}
        placeholder="Password"
        type="password"
        onChange={handleChange}
        {...register("password", {
          validate: (value) => value.length >= 6
        })}
      />
      {errors.password&& <p>Your Password is less than 6 characters</p>}
      <input className="input-login" type="submit" />
  
    </form >

  )}
  </div>
  )
}

export default LoginForm;
