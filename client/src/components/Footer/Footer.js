import React, { useState, useEffect } from "react";
//import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
 
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const scrollToTop = () => {
  //   animateScroll.scrollToTop();
  // };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return(
  <footer className="footer-section">
      <div className="container">
          <div className="row"> 
              {/*  Start:About  */}
              <div className="col-lg-3 col-sm-12">
                  <div className="widget">
                      <div className="footer_logo">
                          <img className="img-responsive" src="assets/logo/spice-a-holic_logo-horizontal.png" alt="spice-a-holic" width="200"/>
                      </div>
                      <div className="footer_p">
                          <p className="footer_para">Why do we use 100% biodegradable packaging? And encourage sustainable farming? And get certified as a green business? Ask your great grandchildren. The real question is, why doesn't everyone?</p>
                      </div>
                      <div className="footer_socil">
                          <ul className="list-icons link-list footer_soc">
                              <li>
                                  <a href="//facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                              </li>
                              <li>
                                  <a href="//twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                              </li>
                              <li>
                                  <a href="//facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-behance"></i></a>
                              </li>
                              <li>
                                  <a href="//instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
                              </li>
                              <li>
                                  <a href="//pinterest.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-pinterest"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div> 
              {/*  End:About  */}

              {/*  Start:Quick Link  */} 
              <div className="col-lg-3 col-sm-12">
                  <div className="widget quick_lnk">
                      <h5>Quick Links</h5>
                      <ul>
                          <li>
                              <Link to="/contact">Who We Are</Link>
                          </li>
                          <li>
                              <Link to="/about">Return & Cancellation</Link>
                          </li>
                          <li>
                              <Link to="/about">FAQ</Link>
                          </li>
                          <li>
                              <Link to="/about">Delivery Schedule</Link>
                          </li>
                          <li>
                              <Link to="/about">Terms and Conditions</Link>
                          </li> 
                      </ul>
                  </div>
              </div> 
              {/*  End:Quick Link  */}

              {/*  Start:Latest post   */}
              <div className="col-lg-3 col-sm-12">
                  <div className="widget">
                      <h5>Latest Articles</h5>
                      <ul className="footer_recent_blog">
                          <li> 
                              <img className="img-responsive" src="assets/images/blog1.jpg" alt="" />  
                              <span className="post_cont">
                                  <span className="post-date">
                                      <i className="fa fa-calendar"></i>March 14, 2021
                                  </span>
                                  <a href="https://www.marksdailyapple.com/health-benefits-turmeric/" target="_blank" rel="noopener noreferrer">
                                      <span>The Health Benefits of Turmeric</span>
                                  </a>
                              </span>
                          </li>
                           <li> 
                              <img className="img-responsive" src="assets/images/blog2.jpg" alt="" />  
                              <span className="post_cont">
                                  <span className="post-date">
                                      <i className="fa fa-calendar"></i>October 20, 2020
                                  </span>
                                  <a href="https://www.marksdailyapple.com/cumin" target="_blank" rel="noopener noreferrer">
                                      <span>Benefits of Cumin</span>
                                  </a>
                              </span>
                          </li>
                      </ul>
                  </div>
              </div> 
              {/*  End:Latest post  */}


              {/*  Start:Newsletter  */} 
              <div className="col-lg-3 col-sm-12">
                  <div className="widget">
                      <h5>Newsletter</h5> 
                      {/*  Start:Subscribe  */}
                      <div className="news_letter_wrp">
                          <p>Subscribe our newsletter to get more update &  join to spice-A-holic</p>
                          <form className="mailchimp"> 
                              <input className="email_field" type="text" name="email" id="subscriber-email" placeholder="Email Address" />
                              <button className="submit-contact" type="submit" id="subscribe-button">Subscribe</button>
                              <span className="subscription-success"> </span>
                              <span className="subscription-error"> </span>
                              <label className="subscription-label" htmlFor="subscriber-email"></label>
                          </form> 
                          {/*  END MAILCHIMP FORM  */}                         
                      </div> 
                  </div>
              </div> 
              {/*  End:Start Subscribe  */} 

 
          </div>
      </div> 
      {/*  Start:Subfooter  */}
      <div className="subfooter">
          <p>2021 © Copyright <Link to= "/">spice-A-holic.</Link> All rights Reserved.</p>
      </div> 
      {/* End:Subfooter  */}
  </footer> 

      )

}

export default Footer;