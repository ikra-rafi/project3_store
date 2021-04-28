import React from "react";
import { Link } from "react-router-dom"; 

const Breadcrumb = ({ title }) => {
  return (

    <header id="page-top" className="blog-banner" style={{backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/images/header.jpg"})` }}> 
        <div className="container" id="blog">
            <div className="row blog-header text-left">
                <div className="col-sm-12"> 
                    <h3>{title}</h3>
                    <h4><Link to="/"> Home </Link> &gt; {title} </h4>
                </div>
            </div>
        </div>  
    </header>
    
  );
};
 

export default Breadcrumb;