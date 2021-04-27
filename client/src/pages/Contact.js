import React , {Component, Fragment } from 'react';  
import MetaTags from "react-meta-tags";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import ContactMap from "../components/ContactMap/ContactMap";

class Contact extends Component{
    
    render(){

        return(
        <Fragment>
            <MetaTags>
              <title>spice-A-holic | Contact Us</title>
              <meta
                name="description"
                content="Organic Food React JS Template."
              />
            </MetaTags>

           <div className="contact-page">
 
             {/*====================  breadcrumb area ====================*/}

             <Breadcrumb title="Contact Us" />
        
             {/*====================  End of breadcrumb area  ================*/}


              {/*====================  Contact Form  area  ====================*/} 
              <section className="contact-section">   
				          <div className="container">
	        				   <div className="base-header">
    	                   <small>Get in touch</small> 
    	                   <h3>Send Us Message</h3> 
	                    </div>
				              <div className="contact_wrp">
				                <div className="row">

 
                            <div className="col-sm-12 map-container">
                              {/* contact map */}
                              <ContactMap latitude="19.313299" longitude="-81.254601" />
                            </div>
				                    <div className="col-md-8 col-sm-12 inner-contact">
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

								           {/*===  Contact Details  ===*/} 
								            <div className="col-md-4 col-sm-12">
			                        <div className="contact_pg_address">
			                            <h3>Hello there, <br/>let's connect.</h3>
			                            <div className="single_con_add">
			                                <a href="#/"><i className="fa fa-globe"></i></a> 
			                                <p><span>Company Address :</span></p>
			                                <p><span>1234 Northern Ave.</span></p>
			                            </div>
			                            <div className="single_con_add">
			                                <a href="#/"><i className="fa fa-envelope"></i></a>
			                                <p><span>Email Address :</span></p>
			                                <p><span>spiceaholic@email.com</span></p>
			                            </div>
			                            <div className="single_con_add">
			                                <a href="#/"><i className="fa fa-phone"></i></a>
			                                <p><span>Contact Us :</span></p>
			                                <p><span>555-555-5555</span></p>
			                            </div>
			                        </div>
			                    </div>
								         {/*===  end: Contact Details  ===*/} 
				                </div>
				            </div>
				        </div>
				    </section>
            {/*====================  End: Contact Form area  ====================*/} 
          </div>
        </Fragment>

        );
    }

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

}

export default Contact;   