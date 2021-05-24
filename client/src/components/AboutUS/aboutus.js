import React from "react"; 

const AboutUS = () => {
  return (
 
	<section className="about-section">
        <div className="container"> 
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="about_img"> 
                        <img src="assets/images/about.jpg" alt="about" /> 
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="about_item_tb">
                        <div className="about_item_tbcell">
                             <div id="aboutus" className="base-header base_header_left">
                                <small>Welcome To Our spice-A-holic</small>
                                <h3>Organic Spices and Teas - Fresh Extracts, Spices and Teas Right to Your Door</h3>
                             </div>
                            <div id="whoarewe" className="about_item">
                                <h4>Who We Are</h4>
                                 <p>We’ve spent over 60 years curating our global network of premium growers and distributors in order to offer our customers unrivaled quality and selection. Our products range from essential and rare spice varietals to proprietary rubs and blends.</p>
                            </div>
                            <div id="deliveryschedule" className="about_item">
                                <h4>Delivery Schedule</h4>
                                 <p>The United States Postal Service (USPS) is struggling with increased package volume and decreased revenue, each of which is related to COVID-19. Most of our free shipping is delivered by the USPS. This includes free shipping on orders over $49 and flatpack free shipping. These economy shipping services are the most prone to delay. To minimize the chance of delivery delays, we encourage customers to select UPS Ground.</p> 
                            </div> 
                            <div id="returnscancellations" className="about_item">
                                <h4>Returns & Cancellations</h4>
                                 <p>We are happy to accept a return for a refund within 30 days, with the original receipt, provided the packaging remains intact and sealed, without signs of tampering. Returns without a receipt may receive store credit. Please contact us at support@spiceaholic.com and we will be happy to assist you with the return process.</p> 
                            </div> 
                            <div id="privatepolicy" className="about_item">
                                <h4>Privacy Policy</h4>
                                 <p>We share your Personal Information with third parties and with third party marketing partners for commercial purposes, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information.</p> 
                            </div> 
                        </div>
                    </div>
                </div>
                {/*about_wrp*/}
            </div>
            {/* row */}
        </div>
        {/* container */}
    </section>


  );
};

export default AboutUS;
