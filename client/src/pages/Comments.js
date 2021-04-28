import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import API from "../utils/API";
import { useHistory} from "react-router-dom";
import {useTodoContext} from "../utils/store";

function Comments() {
  const {
    register,
    handleSubmit,
 //   formState: { errors }
  } = useForm();

  let history=useHistory()
  useEffect(() => {
    if(state.loggedIn) {
      setLoginInfo({...loginInfo, email: state.email})
      var email = state.email;
      getLogin(email);
    }
    else {
      alert("need to be logged in to post comment");
    }
  }, [])

  const [comment, setComment] = useState();
  const [productID, setProductID] = useState();
  const [state, dispatch] = useTodoContext();
  const [loginInfo, setLoginInfo] = useState({_id: null, email: ""});

  function getLogin(){
    var loginObj = {
      password: "",
      email: state.email
    }
    API.getCommentAcct(loginObj)
      .then(res => {

         setLoginInfo({...loginInfo, email: state.email, _id: res.data._id })
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }

  const onSubmit = (data) => {

    var commentObj = {
      userComment: comment,
      productID: productID
    }
    API.saveComments(loginInfo._id, commentObj)
    .then(res => {
      if(res.status === 200) {
        console.log("success on save");
         history.push("/");
      }
    })
    .catch(err => console.log(err));
  };

  const handleChange=e=>{
    setComment(e.target.value);
  }

  const handleProductID=e=> {
    setProductID(e.target.value);
  }
  
  return (
    <form  onSubmit={handleSubmit(onSubmit)} >
      <h1>Enter your User Comment</h1>
      {/* <h2 id="h2">We will send you an email to reset your password.</h2> */}
      <label htmlFor="email">Comment</label>
      <input
        defaultValue=""
        placeholder="Comment"
        type="comment"
        {...register("comment")}
        onChange={handleChange}
      />
      <label htmlFor="productid"> Product ID</label>
      <input
        defaultValue=""
        placeholder= "productid"
        type="productID"
        {...register("productID")}
        onChange={handleProductID}
      />

      <input type="submit" />
      <br></br>

    </form>
  );
}

export default Comments;