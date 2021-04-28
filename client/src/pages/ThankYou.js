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
    <div>
      <h1>Thank you for placing your order!!!!</h1>
    </div>
    </div>
    </Fragment>
  );
}

export default ThankYou;