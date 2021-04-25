import React,{Component} from 'react'; 
//import { useStoreContext } from "../../utils/GlobalState";
import "./style.css"



 
class ContactUsForm extends Component{

    constructor(){
        super();
        this.state={ email:'',name:'',subject:'',message:'',email_err:'',name_err:'',subject_err:'',message_err:'',return_msg:'',flag : false }

         this.handleChangeEmail = this.handleChangeEmail.bind(this);
         this.handleChangeName = this.handleChangeName.bind(this);
         this.handleChangeSubject = this.handleChangeSubject.bind(this);
         this.handleChangeMessage = this.handleChangeMessage.bind(this);
         this.handleSubmit1 = this.handleSubmit1.bind(this);
         
    }

    handleChangeEmail(e){
        this.setState({email:  e.target.value});
        var EmailReg =  /(\w+)\s(\w+)/;
        if(e.target.value === '') 
          this.setState({email_err: 'Required Field'});
        else if(EmailReg.test(e.target.value)) 
          this.setState({email_err: ''});
        else 
          this.setState({email_err: 'Enter Valid Email'});
      }

      handleChangeName(e){
        this.setState({name:  e.target.value});
          if(e.target.value === '') 
            this.setState({name_err: 'Required Field'});
          else 
            this.setState({name_err: ''});
      }
      handleChangeSubject(e){
        this.setState({subject:  e.target.value});
          if(e.target.value === '') 
            this.setState({subject_err: 'Required Field'});
          else 
            this.setState({subject_err: ''});
      }
      handleChangeMessage(e){
        this.setState({message:  e.target.value});
          if(e.target.message === '') 
            this.setState({message_err: 'Required Field'});
          else 
            this.setState({message_err: ''});
      }

      handleSubmit1()
      {
          if(this.state.name === '') 
              this.setState({name_err: 'Required Field'});
          if(this.state.email === '')
              this.setState({email_err: 'Required Field'});
          if(this.state.subject === '')
             this.setState({subject_err: 'Required Field'});
         if(this.state.message === '')
             this.setState({message_err: 'Required Field'});

             if(this.state.name === '' || this.state.email === '' || this.state.subject === '' || this.state.message === '')
             {
                this.setState({return_msg: 'Fill All First', flag: true });
             }
             else
             {
                this.setState({return_msg: 'Success.', flag: true});
             }
      }
    render(){

    return(
 
 
    <section className="contact-section">
        <div className="contact_bg" style={{backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/images/contact_bg.jpg"})` }}> 
        </div>
        <div className="contact_bg2"> </div>      
        <div className="container">
            <div className="contact_wrp">
                <div className="row">
                    <div className="col-md-12 col-sm-12 inner-contact">
                        <div className="base-header base_header_left">
                            <small>Get in touch</small> 
                            <h3>Send Us Message</h3> 
                        </div>
                        <div className="contact-form">
                            <div id="message">
                                {this.state.flag ? 
                                     <div className="alert alert-success">
                                     <strong>{this.state.return_msg}</strong>
                                     </div>
                                 : null}
                            </div> 
                            <form method="post"  name="contact-form" id="contact-form">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-12"> 
                                        <input type="text" id="name" value={this.state.name} onChange={this.handleChangeName} className="con-field form-control" placeholder="Name" /> 
                                        <span id="err">{this.state.name_err}</span>
                                    </div>
                                    <div className="col-lg-6 col-sm-12"> 
                                        <input type="text" className="con-field form-control" value={this.state.email} onChange={this.handleChangeEmail} id="exampleInputEmail1" placeholder="Email" />
                                                <span id="err">{this.state.email_err}</span>
                                    </div>                            
                                    <div className="col-lg-12 col-sm-12"> 
                                        <input type="text" id="subject" value={this.state.subject} onChange={this.handleChangeSubject} className="form-control con-field" placeholder="Your Subject.." />
                                        <span id="err">{this.state.subject_err}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-sm-12"> 
                                        <textarea name="comments" id="comments" value={this.state.message} onChange={this.handleChangeMessage} rows="6" className="form-control con-field" placeholder="Your Message"></textarea>
                                        <span id="err">{this.state.message_err}</span>
                                        <div className="submit-area"> 
                                            <input type="button" id="submit" name="send" onClick={this.handleSubmit1} className="submit-contact submitBnt" value="Send Message" /> 
                                            <div id="simple-msg"></div>
                                        </div>
                                    </div>
                                </div>
                            </form>

  

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


 

        )

    }
}
export default ContactUsForm;