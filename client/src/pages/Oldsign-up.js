import React, { useEffect, useState } from 'react'
//import { Redirect } from 'react-router-dom'
import API from "../utils/API";
//import {useTodoContext} from "../utils/store";


function SignUp() {
	const temp = {
		email: '',
		password: '',
		confirmPassword: ''
	}

	const [signup, setSignUp] = useState(temp);
//	const [state, dispatch] = useTodoContext();

	useEffect(() => {
		console.log("in signup effect");
	})

	function handleChange(event) {
		setSignUp({
			...signup, [event.target.name]: event.target.value
		})
	}

	function handleSubmit(event) {
		console.log('sign-up handleSubmit, email: ' + signup.email)
		event.preventDefault()

		const storeLogin = [{
			email: signup.email,
			password: signup.password,
			securityQuestion: "1",
			securityAnswer: "2",
			admin: true,
			discount:10
		}]
		console.log(storeLogin)
		//request to server to add a new email/password
        API.saveLogin(storeLogin)
            .then(res => {
                console.log("signup");
                console.log(res.data);
				if(res.status===200){
                   // this.props.updateUser({
                    //     loggedIn: true,
                    //     email: res.data.email
                    // })					
					setSignUp({
						redirectTo: '/'
					})
				}
//                setLogin(res.data);
            })
            .catch(err => console.log(err));

	}

	return (
		<div className="SignupForm">
			<h4>Sign up</h4>
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username">Email</label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="email"
							name="email"
							placeholder="Email"
							value={signup.email}
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
							value={signup.password}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="form-group ">
					<div className="col-7"></div>
					<button
						className="btn btn-primary col-1 col-mr-auto"
						onClick={handleSubmit}
						type="submit"
					>Sign up</button>
				</div>
			</form>
		</div>
	);
}

export default SignUp