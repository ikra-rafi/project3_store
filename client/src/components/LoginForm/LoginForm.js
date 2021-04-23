import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
// import ForgotPasswordForm from "../ForgotPasswordForm";
import API from "../../utils/API";
import { useTodoContext } from "../../utils/store";
import "./style.css";


function LoginForm() {
   const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }  } = useForm();

    const initialValues = {
      password: "",
      email: ""
    };

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
//          setJohnData({...johnData, email: res.data.email});
          dispatch({
            type: "loggedIn",
            loggedIn: true,
            email: res.data.email
          })
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
    {loginData.redirectTo ? (
        <Redirect to={{ pathname: loginData.redirectTo }} />
    ) : (
    <form onSubmit={handleSubmit(onSubmit)} >
      <h1>Log In</h1>
      <label htmlFor="email">Email</label>
      <input
//        defaultValue={initialValues.email}
//        value={loginData.email}
        placeholder="Email"
        type="email"
        value={loginData.email}
        onChange={handleChange}
        {...register("email")}
      />

      <label htmlFor="password">Password</label>
      <input
//        value={loginData.password}
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
      <a href="">FORGOT YOUR PASSWORD?</a>  
    </form>
        )}
        </div>
  );
}

export default LoginForm;
