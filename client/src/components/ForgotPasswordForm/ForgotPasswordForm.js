import React, {useState} from "react";
import { useForm } from "react-hook-form";
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
  }]

  // set up state variables
  const [showMe, setShowMe] = useState(false);
  const [email, setEmail] = useState();
  const [answer, setAnswer] = useState({question: "", userAnswer: "", answer: "", _id: null, password: "", firstName: "", lastName: ""});

  // function to get security question/answer for user account
  function getSecurityInfo() {
    var loginObj = {
      email: email
    }
    // api call to retrieve the security question/answer for user account based upon email
    API.getAcctQuestionAnswer(loginObj)
      .then(res => {
        // check if successful retrieval
        if(res.status ===200) { 
          console.log(res.data);
          // set state to values returned
          setAnswer({...answer, securityQuestion: res.data.securityQuestion, securityAnswer: res.data.securityAnswer, firstName: res.data.firstName, lastName: res.data.lastName, _id: res.data._id })
          // set security Question field to value returned about user account
          setValue("securityQuestion", res.data.securityQuestion);
        }
      })
      .catch(err => console.log(err));
    }

  // function to handle the submit button
  const onSubmit = (data) => {

    console.log("data.email = " + data.email);
    // save off the security answer
    storeLogin[0] = answer;
    console.log(storeLogin)
    var passwordUpdate = {
      password: data.password
    }
    console.log(storeLogin)
    console.log("data.password = " + data.password);
    // api call to reset the password based upon new password and user email
      API.resetPassword(email, passwordUpdate)
      .then(res => {
        // check is reset password was successful
        if(res.status === 200) {
          console.log("success");
        }
      })
      .catch(err => console.log(err));
      // display alert upon successful reset that user needs to now login
      alert("Password reset successful.  Please log in.")
  };

  // function to scroll page to top after clicking Login button underneath reset password
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // function to save email field changes as they happen
  const handleChange=e=>{
    setEmail(e.target.value);
  }

  // function to save security answer field changes as they happen 
  const handleAnswerChange=e=>{
    setAnswer({...answer, answer: e.target.value});
  }

  // function to save new password field changes as they happen
  const handlePasswordChange=e=>{
    setAnswer({...answer, password: e.target.value});
  }

  // function to check whether user entered correct security question answer
  function checkSecurityAnswer() {
    // check if user answered question correctly
    if(answer.answer === answer.securityAnswer) {
      // set state to display the password field
      setShowMe(true);
    }
    else {
      // alert user their answer was incorrect
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
        <figure>
        <img src="./assets/icons/click.png" className="btn btn-link" type="button"
        onClick = { () => {
          getSecurityInfo();
        }}
      />
       <figcaption>click here</figcaption>
      </figure>
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
          <figcaption>click here</figcaption>
          <figure>
          <img src="./assets/icons/click.png" className="btn btn-link" type="button"
            onClick = {() => {
              checkSecurityAnswer();
            }}
          />
          </figure>

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
      {errors.password&& <p>Your Password is less than 6 characters</p>} 

      <input type="submit" value="Reset Password"/>
      <br></br>
      <label  id="luna"  onClick={scrollToTop}>LOGIN</label>
    </form>
  );
}

export default ForgotPasswordForm;