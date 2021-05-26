import React, { Fragment, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {Container} from "../components/Grid";
import API from "../utils/API";
import { useTodoContext} from "../utils/store";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";
import { Link } from 'react-router-dom';

function AddProducts() {
  // setup references to fields on page
  let name = React.createRef();
  let description = React.createRef();
  let packagingSize1 = React.createRef();
  let packagingPrice1 = React.createRef();
  let packagingQuantity1 = React.createRef();
  let packagingSize2 = React.createRef();
  let packagingPrice2 = React.createRef();
  let packagingQuantity2 = React.createRef();
  let healthBenefit = React.createRef();
  let historyDetails = React.createRef();
  let familyBaking = React.createRef();
  let familyGrilling = React.createRef();
  let familySeasoning = React.createRef();
  let productID = React.createRef();

  const [state, dispatch] = useTodoContext();
  let history = useHistory();

  var familyCheckbox = {
    baking: false,
    grilling: false,
    seasoning: false,
    extract: false,
    tea: false
    }

  var regionCheckbox = {
    india: false,
    asia: false,
    carribean: false,
    africa: false,
    middleEast: false,
    latinAmerica: false,
    europe: false
    }

    useEffect(() => {
      if(!state.admin) {
        history.push("/");
      }
      window.scrollTo(0, 0);
    }, [])


  var picURLInput;

  const [family, setFamily] = useState(familyCheckbox);
  const [region, setRegion] = useState(regionCheckbox);

  // these functions handle setting the correct boolean value of checkboxes to state
  function handleBakingCheck(e) {
      setFamily({...family, baking: e.target.checked});
  }

  function handleGrillingCheck(e) {
      setFamily({...family, grilling: e.target.checked});
  }

  function handleSeasoningCheck(e) {
    setFamily({...family, seasoning: e.target.checked});
  }

  function handleExtractsCheck(e) {
    setFamily({...family, extract: e.target.checked});
  }

  function handleTeaCheck(e) {
    setFamily({...family, tea: e.target.checked});
  }

  function handleIndia(e) {
      setRegion({...region, india: e.target.checked})
  }

  function handleAsia(e) {
      setRegion({...region, asia: e.target.checked});
  }

  function handleCarribean(e) {
      setRegion({...region, carribean: e.target.checked});
  }

  function handleAfrica(e) {
      setRegion({...region, africa: e.target.checked});
  }

  function handleMiddleEast(e) {
      setRegion({...region, middleEast: e.target.checked});
  }

  function handleLatinAmerica(e) {
      setRegion({...region, latinAmerica: e.target.checked});
  }

  function handleEurope(e) {
      setRegion({...region, europe: e.target.checked});
  }

  // function to handle submit button
  function handleSubmitBtnClick(e) {
    e.preventDefault();
    // object to capture product info before saving to database
    const ProductInfo =
    {
      name: name.current.value,
      description: description.current.value,
      packaging: [{
          size: packagingSize1.current.value,
          price: packagingPrice1.current.value,
          quantity: packagingQuantity1.current.value
      },
      {
          size: packagingSize2.current.value,
          price: packagingPrice2.current.value,
          quantity: packagingQuantity2.current.value
      }],
      healthBenefit: healthBenefit.current.value,
      picLink: picURLInput,
      historyDetails: historyDetails.current.value,
      family: {
          baking: family.baking,
          grilling: family.grilling,
          seasoning: family.seasoning,
          extracts: family.extract,
          teas: family.tea
      },
      region: {
          india: region.india,
          asia: region.asia,
          carribean: region.carribean,
          middleEast: region.middleEast,
          african: region.africa,
          latinAmerica: region.latinAmerica,
          europe: region.europe
      },
      productID: productID.current.value,
    }

    console.log(ProductInfo);
    // api call to save new product to db
    API.saveProducts(ProductInfo)
      .then(res => {
        // check if successful save
        if(res.status === 200) {
        }
      })
      .catch(err => console.log(err));
  }

  // function to upload spice photo to Cloudinary using their widget
  function showWidget() {

    window.cloudinary.openUploadWidget({
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      sources: [
        "local"
      ],
      googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#F5F5F5",
          sourceBg: "#438945",
          windowBorder: "#F7F4E9",
          tabIcon: "#438945",
          inactiveTabIcon: "#E8D5BB",
          menuIcons: "#B59B4D",
          link: "#F7F4E9",
          action: "#F7F4E9",
          inProgress: "#99cccc",
          complete: "#78b3b4",
          error: "#F5F5F5",
          textDark: "#1B1918",
          textLight: "#695A5A"
        },
        fonts: {
          default: null,
          "'Kalam', cursive": {
            url: "https://fonts.googleapis.com/css?family=Kalam",
            active: true
          }
        }
      }
    },
    (error, result) => {
      if (!error) {
        if (result.event === "success") {
          // save the returned URL link for uploaded photo to store in db
          picURLInput = result.info.url;
        };
      };
    })
  }

  return (
    <Fragment>
    <MetaTags>
      <title>spice-A-holic | Add Product</title>
      <meta
        name="Spice-A-Holic admin"
        content="admin."
      />
    </MetaTags>

    <div className="checkout-page">
        {/*====================  breadcrumb area ====================*/}

        <Breadcrumb title="Add Product" />

        {/*====================  End of breadcrumb area  ====================*/}


        {/*====================  Start of Checkout  Section    ====================*/}
     <section className="py-5">
     <div style={{textAlign:'right', margin:0, paddingRight:'15px'}}>
     <Link to="admin" id="adminBtn" className="slider_btn_one more-link" style={{marginRight:"15px"}}><i className="fa fa-cogs" aria-hidden="true"> ADMIN</i></Link>
        <Link to="/salestax" id="adminBtn" className="slider_btn_one more-link" style={{marginRight:"15px"}}><i className="fa fa-wrench" aria-hidden="true"> UPDATE SALES TAX</i></Link>
        <Link to="/shipping" id="adminBtn" className="slider_btn_one more-link"><i className="fa fa-truck" aria-hidden="true"> UPDATE SHIPPING COSTS</i></Link>
      </div>
      <Container fluid>
        <Container >
        <div className="pb-5 text-center">
        <h1 className="text-center">Add Products Page</h1>
    <div className="row">




                    <form className="needs-validation" novalidate="" id={1}  key={1}>

                    <div className="row">
                    <div className="mb-3">
                      <label className="label" htmlFor="name"></label>
                      <input name="name" ref={name} id="name" className="form-control form-control-lg" placeholder="Product Name" />
                    </div>
                    <div className="mb-3">
                      {/* <label className="label" htmlFor="exampleInputEmail1" >Description</label> */}
                      <input name="description" ref={description} id="description" className="form-control form-control-lg" placeholder="Description" />
                    </div>
                    <div className="mb-3">
                      {/* <label className="label" htmlFor="historyDetails">History Details</label> */}
                      <input name="historyDetails" ref={historyDetails} id="historyDetails" className="form-control form-control-lg" placeholder="History Details" />
                    </div>
                    <div className="col-md-6 mb-3">
                      {/* <label className="label" htmlFor="packagingSize1">Package Size 1</label> */}
                      <input name="packagingSize1" ref={packagingSize1} id="packagingSize1" className="form-control form-control-lg" placeholder="Package Size 1" />
                    </div>
                    <div className="col-md-6 mb-3">
                      {/* <label className="label" htmlFor="packagingPrice1">Package Price 1</label> */}
                      <input name="packgingPrice1" ref={packagingPrice1} id="packagingPrice1" className="form-control form-control-lg" placeholder="Package Price 1" />
                    </div>
                    <div className="col-md-6 mb-3">
                      {/* <label className="label" htmlFor="packagingQuantity1">Package Quantity 1</label> */}
                      <input name="packagingQuantity1" ref={packagingQuantity1} id="packagingQuantity1" className="form-control form-control-lg" placeholder="Package Quantity 1" />
                    </div>
                    <div className="col-md-6 mb-3">
                      {/* <label className="label" htmlFor="packagingSize2">Package Size 2</label> */}
                      <input name="packagingSize2" ref={packagingSize2} id="packagingSize2" className="form-control form-control-lg" placeholder="Package Size 2" />
                    </div>
                    <div className="col-md-6 mb-3">
                      {/* <label className="label" htmlFor="packagingPrice2">Package Price 2</label> */}
                      <input name="packgingPrice2" ref={packagingPrice2} id="packagingPrice2" className="form-control form-control-lg" placeholder="Package Price 2" />
                    </div>
                    <div className="col-md-6 mb-3">
                      {/* <label className="label" htmlFor="packagingQuantity2">Package Quantity 2</label> */}
                      <input name="packagingQuantity2" ref={packagingQuantity2} id="packagingQuantity2" className="form-control form-control-lg" placeholder="Package Quantity 2" />
                    </div>
                    <div className="mb-3">
                      {/* <label className="label" htmlFor="healthBenefit">Health Benefit Link</label> */}
                      <input name="healthBenefit" ref={healthBenefit} id="healthBenefit" className="form-control form-control-lg" placeholder="Health Benefit Link" />
                    </div>

                      <br />
                      <div className="span6">
                      <fieldset>

                        <h3>Family</h3>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="familyBaking">Baking</label>
                              <input type="checkbox" id="familyBaking" ref={familyBaking} onChange={handleBakingCheck} name="familyBaking" value="Baking"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="familyGrilling">Grilling</label>
                              <input type="checkbox" id="familyGrilling" ref={familyGrilling} onChange={handleGrillingCheck} name="familyGrilling" value="Grilling"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="familySeasoning">Seasoning</label>
                              <input type="checkbox" id="familySeasoning" ref={familySeasoning} onClick={handleSeasoningCheck} name="familySeasoning" value="Seasoning"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="familyExtracts">Extracts</label>
                              <input type="checkbox" id="familyExtracts" onClick={handleExtractsCheck} name="familyExtracts" value="Extract"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="familyTeas">Tea</label>
                              <input type="checkbox" id="familyTeas" onClick={handleTeaCheck} name="familyTeas" value="Tea"/>
                          </div>
                          <br />
                          <br />
                          <h3>Region</h3>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="regionIndia">Region India</label>
                              <input type="checkbox" id="regionIndia" onClick={handleIndia} name="regionIndia" value="India"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="regionAsia">Region Asia</label>
                              <input type="checkbox" id="regionAsia" onClick={handleAsia} name="regionAsia" value="Asia"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="regionCarribean">Region Carribean</label>
                              <input type="checkbox" id="regionCarribean" onClick={handleCarribean} name="regionCarribean" value="Carribean"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="regionAfrican">Africa</label>
                              <input type="checkbox" id="regionAfrican" onClick={handleAfrica} name="regionAfrican" value="Africa"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="regionMiddleEast">Middle East</label>
                              <input type="checkbox" id="regionMiddleEast" onClick={handleMiddleEast} name="regionMiddleEast" value="Middle East"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px"}}>
                              <label className="label" htmlFor="regionLatinAmerica">Latin America</label>
                              <input type="checkbox" id="regionLatinAmerica" onClick={handleLatinAmerica} name="regionLatinAmerica" value="Latin America"/>
                          </div>
                          <div id="payment" className="clearfix"  style={{display: "inline-block", margin: "10px 20px" }}>
                              <label className="label" htmlFor="regionEurope">Europe</label>
                              <input type="checkbox" id="regionEurope" onClick={handleEurope} name="regionEurope" value="Europe"/>
                          </div>
                          <br />
                          <div className="mb-3">
                              <input name="productID" ref={productID} id="productID=" className="form-control form-control-lg" placeholder="Product ID" />
                          </div>
                          </fieldset>
             </div>

                      </div>
                    </form>
                    <br />
                    <br />
        <div className="mb-3">
         <label className="label" htmlFor="picLink">Picture Link</label>
          <div id="photo-form-container">
            <button className="more-link" onClick={showWidget}>Upload Product Photo</button>
          </div>
         <button type="submit" className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleSubmitBtnClick}><strong>Add Product</strong></button>
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

export default AddProducts;