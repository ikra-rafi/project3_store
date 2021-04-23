import React, { useEffect, useState, Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from "../utils/API";
import {useTodoContext} from "../utils/store";

function LoginForm() {

    const temp = {
        email: '',
        password: '',
        redirectTo: null
    }

    const [loginData, setLoginData] = useState(temp);
    const [state, dispatch] = useTodoContext();
    const [johnData, setjohnData] = useState(temp);

    useEffect(() => {
        console.log("in login Effect");
    })

    function handleChange(event) {
        setLoginData({
            ...loginData, [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        API.getLogin(loginData)
            .then(res=> {
                if(res.status===200){
                    console.log(res.data.email);
                    setjohnData({...johnData, email: res.data.email});
                    dispatch({
                        type: "loggedIn",
                        loggedIn: true,
                        email: res.data.email
                    })
                    //  setLoginData({
                    //      redirectTo: '/'
                    //  })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {loginData.redirectTo ? (
                <Redirect to={{ pathname: loginData.redirectTo }} />
            ) : (
                <div>
                <h4>Login</h4>
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="username">Username</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="email"
                                name="email"
                                placeholder="email"
                                value={loginData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="password">Password: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="col-7"></div>
                        <button
                            className="btn btn-primary col-1 col-mr-auto"
                            onClick={handleSubmit}
                            type="submit">Login
                        </button>
                    </div>
                </form>
            </div>
        )}
        </div>
    ); 
}

export default LoginForm;