import React, {useEffect, useState} from "react";
import { set, useForm } from "react-hook-form";
//import "./style.css";
import API from "../utils/API";
import {useTodoContext} from "../utils/store";
//import Login from "../../pages/Login.js";
//import { Link } from "react-router-dom";

function Comments() {
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
    _id: "",
    password: ""
  }]

  useEffect(() => {
    console.log("comment Effect");
    if(state.loggedIn) {
      setAnswer({...answer, email: state.email})
      var email = state.email;
      getLogin(email);
    }
    else {
      alert("need to be logged in to post comment");
    }
  }, [])


  const [showMe, setShowMe] = useState(false);
  const [comment, setComment] = useState();
  const [state, dispatch] = useTodoContext();
  const [answer, setAnswer] = useState({question: "", userAnswer: "", answer: "", _id: null, password: "", firstName: "", lastName: "", email: ""});



  function getLogin(){
    var loginObj = {
      password: "",
      email: state.email
    }
    API.getCommentAcct(loginObj)
      .then(res => {

         setAnswer({...answer, securityQuestion: res.data.securityQuestion, email: state.email, securityAnswer: res.data.securityAnswer, firstName: res.data.firstName, lastName: res.data.lastName, _id: res.data._id })
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }

//   function getSecurityInfo() {
//     // var loginObj = {
//     //   email: email
//     // }
//     API.getAcctQuestionAnswer(loginObj)
//       .then(res => {
//         if(res.status ===200) { 
//           console.log(res.data);
// //          tempObj.email = email;
// //          tempObj.firstName = res.data.firstName;
// ///          tempObj.lastName = res.data.lastName;
// //          tempObj.securityQuestion = res.data.securityQuestion;
// //          tempObj.securityAnswer = res.data.securityAnswer;
// //          tempObj._id = res.data._id;
// //          console.log(tempObj);
//         // setAnswer({...answer, securityQuestion: res.data.securityQuestion, securityAnswer: res.data.securityAnswer, firstName: res.data.firstName, lastName: res.data.lastName, _id: res.data._id })
//           setValue("securityQuestion", res.data.securityQuestion);
//         }
//       })
//       .catch(err => console.log(err));
//     }

  const onSubmit = (data) => {
//    alert(JSON.stringify(data));
console.log("data.email = " + data.email);
//setEmail("");
//setAnswer({...answer, password: data.password});
storeLogin[0] = answer;
console.log(storeLogin)
//setAnswer({...answer, securityQuestion: "", securityAnswer: "", answer: ""});

console.log(storeLogin)
console.log("data.password = " + data.password);
    API.saveUpdate(storeLogin)
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
    setComment(e.target.value);
  }

  function storeComment(){

  }

  return (
    <form  onSubmit={handleSubmit(onSubmit)} >
      <h1>Enter your User Comment</h1>
      {/* <h2 id="h2">We will send you an email to reset your password.</h2> */}
      <label htmlFor="email">Comment</label>
      <input
        defaultValue={initialValues.comment}
        placeholder="Comment"
        type="comment"
        {...register("comment")}
        onChange={handleChange}
      />
      <button type="button"
        onClick = { () => {
          storeComment();
        }}
      />
      <input type="submit" />
      <br></br>
      <label  id="luna"  onClick={scrollToTop}>LOGIN</label>
    </form>
  );
}

export default Comments;