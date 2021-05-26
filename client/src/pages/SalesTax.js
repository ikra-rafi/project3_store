import React, { Fragment, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {Container} from "../components/Grid";
import API from "../utils/API";
import { useTodoContext} from "../utils/store";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';

function SalesTax() {
  // setup references to fields on page
  let stateID = React.createRef();
  let salesTaxRate = React.createRef();

  const [state, dispatch] = useTodoContext();
  let history = useHistory();

    useEffect(() => {
      if(!state.admin) {
        history.push("/");
      }
      window.scrollTo(0, 0);
    }, [])

  // function to handle submit button
  function handleSubmitBtnClick(e) {
    e.preventDefault();
    // object to capture product info before saving to database
    const taxInfo =
    {
      stateID: stateID.current.value,
      salestax: salesTaxRate.current.value
    }

    console.log(taxInfo);
    //api call to save tax rate to db
    API.updateSalesTaxRate(taxInfo)
      .then(res => {
        // check if successful save
        if(res.status === 200) {
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <Fragment>
    <MetaTags>
      <title>spice-A-holic | Update Sales Tax Rate</title>
      <meta
        name="Spice-A-Holic sales tax"
        content="salestax."
      />
    </MetaTags>

    <div className="checkout-page">
        {/*====================  breadcrumb area ====================*/}

        <Breadcrumb title="Update Sales Tax Rate" />

        {/*====================  End of breadcrumb area  ====================*/}


        {/*====================  Start of Update Sales Tax Rate  Section    ====================*/}
     <section>
     <div style={{textAlign:'right', margin:0, paddingRight:'15px'}}>
     <Link to="admin" id="adminBtn" className="slider_btn_one more-link" style={{marginRight:"15px"}}><i className="fa fa-cogs" aria-hidden="true"> ADMIN</i></Link>
     <Link to="/addproducts" id="adminBtn" className="slider_btn_one more-link"><i className="fa fa-plus-circle" aria-hidden="true"> ADD Product</i></Link>
      </div>
      <Container fluid>
        <Container >
        <div className="container">
    <div className="row justify-content-center">
    <div className="col-sm-6 col-md-5 col-lg-6">
              <div className="container-fluid containerColor marginBottomCont">
               <h1 className="text-center">Update Sales Tax Rate</h1>
                  <div>
                    <form id={1}  key={1}>
                      <label className="label" htmlFor="stateID">State Name</label>
                      <div className="select" >
                        <select className="custom-select d-block w-100" ref={stateID} id="stateID" defaultValue="" required="">
                          <option value=""  disabled="">Choose...</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="DC">District of Columbia</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massaschusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </select>
                      </div>
                      <label className="label" htmlFor="salesTaxRate" >Sales Tax Rate</label>
                      <input name="salesTaxRate" ref={salesTaxRate} id="salesTaxRate" className="form-control form-control-lg" placeholder="Sales Tax Rate" />
                    </form>
                  </div>
                </div>
                <br />
                <br />
             <button type="submit" className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleSubmitBtnClick}><strong>Update Sales Tax Rate</strong></button>
             </div>
      </div>
      </div>
        </Container>
      </Container>

      </section>
        </div>

      </Fragment>
  );
}

export default SalesTax;