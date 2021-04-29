import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from 'react-router-dom';
import API from "../../utils/API";
import { useTodoContext } from "../../utils/store";
import "./style.css";

// function to display the login form
function LoginForm() {
   const {
    register,
    handleSubmit,
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
  
    // function to handle a change event
    function handleChange(event) {
      // set state with current email field value
      setLoginData({
        ...loginData, email: event.target.value
      })
    }

  // function to handle submit button
  const onSubmit = (data) => {

    // set state to hold email
    setLoginData({
      ...loginData, email: data.email,
    })

    var loginObj = {
      password: data.password,
      email: data.email
    }
    // api call to retrieve login
    API.getLogin(loginObj)
      .then(res => {
        // check if get login was successful
        if(res.status ===200) {
          // save the login admin status and email to the store
          dispatch({
            type: "loggedIn",
            loggedIn: true,
            admin: res.data.admin,
            email: res.data.email
          })
        }
      })
      .catch(err => console.log(err));
    // upon log in - rediret to the home page
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
        placeholder="Email"
        type="email"
        onChange={handleChange}
        {...register("email")}
      />

      <label className="label-login" htmlFor="password">Password</label>
      <input className="input-login"
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