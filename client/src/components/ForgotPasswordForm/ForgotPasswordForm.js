import React, {useState} from "react";
import { set, useForm } from "react-hook-form";
import "./style.css";
import API from "../../utils/API";

function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  var initialValues = {
    email: "",
    securityQuestion:"",
    answer:"",
    password: "",
  
  };
  var storeLogin = [{
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
    firstName: "",
    lastName: "",
    password: ""
  }]
  const [showMe, setShowMe] = useState(false);
  const [email, setEmail] = useState();
  const [answer, setAnswer] = useState({question: "", userAnswer: "", answer: "", _id: null, password: "", firstName: "", lastName: ""});

  function getSecurityInfo() {
    var loginObj = {
      email: email
    }
    API.getAcctQuestionAnswer(loginObj)
      .then(res => {
        if(res.status ===200) { 
          console.log(res.data);
          setAnswer({...answer, securityQuestion: res.data.securityQuestion, securityAnswer: res.data.securityAnswer, firstName: res.data.firstName, lastName: res.data.lastName, _id: res.data._id })
          setValue("securityQuestion", res.data.securityQuestion);
        }
      })
      .catch(err => console.log(err));
    }

  const onSubmit = (data) => {

    console.log("data.email = " + data.email);
    storeLogin[0] = answer;
    console.log(storeLogin)
    var passwordUpdate = {
      password: data.password
    }
    console.log(storeLogin)
    console.log("data.password = " + data.password);
      API.resetPassword(email, passwordUpdate)
      .then(res => {
        if(res.status === 200) {
          console.log("success");
        }
      })
      .catch(err => console.log(err));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const handleChange=e=>{
    setEmail(e.target.value);
  }

  const handleAnswerChange=e=>{
    setAnswer({...answer, answer: e.target.value});
  }

  const handlePasswordChange=e=>{
    setAnswer({...answer, password: e.target.value});
  }

  function checkSecurityAnswer() {
    if(answer.answer === answer.securityAnswer) {
      setShowMe(true);
    }
    else {
      alert("Security Answer is incorrect.");
    }
  }

  return (
    <form className="forgot-login"  onSubmit={handleSubmit(onSubmit)} >
      <h1>Reset your password</h1>
      {/* <h2 id="h2">We will send you an email to reset your password.</h2> */}
      <label htmlFor="email">Email</label>
      <input
        defaultValue={initialValues.email}
        placeholder="Email"
        type="email"
        {...register("email")}
        onChange={handleChange}
      />
      <button className="login-forgot" type="button"
        onClick = { () => {
          getSecurityInfo();
        }}
      />
      {answer.securityQuestion ? 
        <div>
          <label htmlFor="securityQuestion">Security Question</label>
          <input
            defaultValue={initialValues.securityQuestion}
            name="securityQuestion"
            placeholder="Security Question"
            {...register("securityQuestion")}
          />

          <label htmlFor="answer">Answer</label>
          <input
            defaultValue={initialValues.answer}
            placeholder="Answer"
            {...register("answer")}
            onChange={handleAnswerChange}
          />
  
          <button className="login-forgot" type="button"
            onClick = {() => {
              checkSecurityAnswer();
            }}
          />

          {showMe?
            <div>
              <label htmlFor="password">Password</label>
              <input
                defaultValue={initialValues.password}
                placeholder="Password"
                type="password"
                {...register("password", {
                  validate: (value) => value.length >= 6
                })}
                onChange={handlePasswordChange}
              />
            </div>                  
            :null
          }
        </div>
          : null
      }
      {errors. password&& <p>Your Password is less than 6 characters</p>} 

      <input type="submit" />
      <br></br>
      <label  id="luna"  onClick={scrollToTop}>LOGIN</label>
    </form>
  );
}

export default ForgotPasswordForm;