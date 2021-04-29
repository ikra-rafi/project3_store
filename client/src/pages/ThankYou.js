
// import React from "react";
import '../App.css';

import React , { Fragment} from "react";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";


function ThankYou() {
  return (
    <Fragment>
      <MetaTags>
        <title>spice-A-holic | Thank you</title>
        <meta
          name="description"
          content="Organic spices."
        />
      </MetaTags>

     <div className="contact-page">

       {/*====================  breadcrumb area ====================*/}

       <Breadcrumb title="Product Details" />
    <section>
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-md-5 col-lg-4">
        <div className="blog_quote">
          <h1>Thank you for placing your order!!!!</h1>
        </div>
    </div>
    </div>
    </div>
    </section>
    </div>
    </Fragment>
  );
}

export default ThankYou;