import React,{Component} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";


class Login extends Component {
 
  constructor(){
    super()
    this.state=({
      showMe: false
    });
  }
  operation()
  {
   this.setState({
     showMe: true
   });
  }
 

render(){
  return (
    <div id="login" className="container py-5">
    <div className="row">
    <div className="col-lg-6 col-xm-12">
        <LoginForm /> 
        <label  onClick={()=>this.operation()} id="forget">FORGOT YOUR PASSWORD?</label>
        {this.state.showMe?
        <ForgotPasswordForm />:null
        }
    </div>
    <div className="col-lg-6 col-xm-12"> 
         <SignUpForm />
      </div> </div>
     
        </div>     
  );
}
}
export default Login;