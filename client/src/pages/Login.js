import React,{ Fragment, Component} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";


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

    <Fragment>
    <MetaTags>
      <title>spice-A-holic | Login</title>
      <meta
        name="Spice-A-Holic Login"
        content="Login or Sign UP."
      />
    </MetaTags>

    <div className="checkout-page">
        {/*====================  breadcrumb area ====================*/}

        <Breadcrumb title="Login or Signup" />
        
        {/*====================  End of breadcrumb area  ====================*/} 


        {/*====================  Start of Checkout  Section    ====================*/}    
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
      </div> 
  </Fragment>    
  );
}
}
export default Login;