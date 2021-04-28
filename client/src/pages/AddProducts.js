import React, { Fragment, useEffect, useState} from "react";
import { Redirect, useHistory } from "react-router-dom";
import {Container} from "../components/Grid";
import API from "../utils/API";
import { useTodoContext} from "../utils/store";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";

function AddProducts() {
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
      console.log("add products");
      if(!state.admin) {
        history.push("/");
      }
      // if(state.loggedIn) {
      //   applyDiscount = true;
      // }
      // else {
      //   applyDiscount = false;
      // }
    }, [])


  var picURLInput;

  const [family, setFamily] = useState(familyCheckbox);
  const [region, setRegion] = useState(regionCheckbox);

  function handleBakingCheck(e) {
      setFamily({...family, baking: e.target.checked});
      console.log(family);
  }

  function handleGrillingCheck(e) { 
      setFamily({...family, grilling: e.target.checked});
      console.log(family);
  }

  function handleSeasoningCheck(e) {
    setFamily({...family, seasoning: e.target.checked});
      console.log(family);
  }

  function handleExtractsCheck(e) {
    setFamily({...family, extract: e.target.checked});
      console.log(family);
  }

  function handleTeaCheck(e) {
    setFamily({...family, tea: e.target.checked});
      console.log(family);
  }

  function handleIndia(e) {
      setRegion({...region, india: e.target.checked})
      console.log(region);
  }

  function handleAsia(e) {
      setRegion({...region, asia: e.target.checked});
      console.log(region);
  }

  function handleCarribean(e) {
      setRegion({...region, carribean: e.target.checked});
      console.log(region);
  }

  function handleAfrica(e) {
      setRegion({...region, africa: e.target.checked});
      console.log(region);
  }

  function handleMiddleEast(e) {
      setRegion({...region, middleEast: e.target.checked});
      console.log(region);
  }

  function handleLatinAmerica(e) {
      setRegion({...region, latinAmerica: e.target.checked});
      console.log(region);
  }

  function handleEurope(e) {
      setRegion({...region, europe: e.target.checked});
      console.log(region);
  }

  function handleSubmitBtnClick(e) {
    e.preventDefault();
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

    API.saveProducts(ProductInfo)
      .then(res => {
        if(res.status === 200) {
          console.log("success on product save");
        }
      }) 
      .catch(err => console.log(err));
  }

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
     <section>
    <div className="container">
    <div className="row justify-content-center">
    <div className="col-md-5 col-lg-4">
      <Container fluid>
        <Container >
              <div className="container-fluid containerColor marginBottomCont">
               <h1 className="text-center">Add Products Page</h1> 
                  <div>
                    <form id={1} className="searchForm justify-content-center m-2" key={1}>
                      <label className="label" htmlFor="name">Name of Product</label>
                      <input name="name" ref={name} id="name" className="form-control form-control-lg" placeholder="Product Name" />
                      <label className="label" htmlFor="description">Description</label>
                      <input name="description" ref={description} id="description" className="form-control form-control-lg" placeholder="Description" />
                      <label className="label" htmlFor="historyDetails">History Details</label>
                      <input name="historyDetails" ref={historyDetails} id="historyDetails" className="form-control form-control-lg" placeholder="History Details" />
                      <label className="label" htmlFor="packagingSize1">Package Size 1</label>
                      <input name="packagingSize1" ref={packagingSize1} id="packagingSize1" className="form-control form-control-lg" placeholder="Package Size 1" />
                      <label className="label" htmlFor="packagingPrice1">Package Price 1</label>
                      <input name="packgingPrice1" ref={packagingPrice1} id="packagingPrice1" className="form-control form-control-lg" placeholder="Package Price 1" />
                      <label className="label" htmlFor="packagingQuantity1">Package Quantity 1</label>
                      <input name="packagingQuantity1" ref={packagingQuantity1} id="packagingQuantity1" className="form-control form-control-lg" placeholder="Package Quantity 1" />
                      <label className="label" htmlFor="packagingSize2">Package Size 2</label>
                      <input name="packagingSize2" ref={packagingSize2} id="packagingSize2" className="form-control form-control-lg" placeholder="Package Size 2" />
                      <label className="label" htmlFor="packagingPrice2">Package Price 2</label>
                      <input name="packgingPrice2" ref={packagingPrice2} id="packagingPrice2" className="form-control form-control-lg" placeholder="Package Price 2" />
                      <label className="label" htmlFor="packagingQuantity2">Package Quantity 2</label>
                      <input name="packagingQuantity2" ref={packagingQuantity2} id="packagingQuantity2" className="form-control form-control-lg" placeholder="Package Quantity 2" /> 
                      <label className="label" htmlFor="healthBenefit">Health Benefit Link</label>
                      <input name="healthBenefit" ref={healthBenefit} id="healthBenefit" className="form-control form-control-lg" placeholder="Health Benefit Link" />
                      <br />
                      <h3>Family</h3>
                      <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="familyBaking">Baking</label>
                            <input type="checkbox" id="familyBaking" ref={familyBaking} onChange={handleBakingCheck} name="familyBaking" value="Baking"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="familyGrilling">Grilling</label>
                            <input type="checkbox" id="familyGrilling" ref={familyGrilling} onChange={handleGrillingCheck} name="familyGrilling" value="Grilling"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="familySeasoning">Seasoning</label>
                            <input type="checkbox" id="familySeasoning" ref={familySeasoning} onClick={handleSeasoningCheck} name="familySeasoning" value="Seasoning"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="familyExtracts">Extracts</label>
                            <input type="checkbox" id="familyExtracts" onClick={handleExtractsCheck} name="familyExtracts" value="Extract"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="familyTeas">Tea</label>
                            <input type="checkbox" id="familyTeas" onClick={handleTeaCheck} name="familyTeas" value="Tea"/>
                        </div>
                        <br />
                        <br />
                        <h3>Region</h3>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="regionIndia">Region India</label>
                            <input type="checkbox" id="regionIndia" onClick={handleIndia} name="regionIndia" value="India"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="regionAsia">Region Asia</label>
                            <input type="checkbox" id="regionAsia" onClick={handleAsia} name="regionAsia" value="Asia"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="regionCarribean">Region Carribean</label>
                            <input type="checkbox" id="regionCarribean" onClick={handleCarribean} name="regionCarribean" value="Carribean"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="regionAfrican">Africa</label>
                            <input type="checkbox" id="regionAfrican" onClick={handleAfrica} name="regionAfrican" value="Africa"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="regionMiddleEast">Middle East</label>
                            <input type="checkbox" id="regionMiddleEast" onClick={handleMiddleEast} name="regionMiddleEast" value="Middle East"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="regionLatinAmerica">Latin America</label>
                            <input type="checkbox" id="regionLatinAmerica" onClick={handleLatinAmerica} name="regionLatinAmerica" value="Latin America"/>
                        </div>
                        <div style={{display: "inline-block"}}>
                            <label className="label" htmlFor="regionEurope">Europe</label>
                            <input type="checkbox" id="regionEurope" onClick={handleEurope} name="regionEurope" value="Europe"/>
                        </div>
                        <br />
                        <label className="label" htmlFor="productID">Product ID</label>
                        <input name="productID" ref={productID} id="productID=" className="form-control form-control-lg" placeholder="Product ID" />
                    </form>
                  </div>
                  <label className="label" htmlFor="picLink">Picture Link</label>
                  <div id="photo-form-container">
                        <button onClick={showWidget}>Upload Photo</button>
                      </div>
                </div>
                <br />
                <br />
             <button className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleSubmitBtnClick}><strong>Add Product</strong></button>
        </Container>
      </Container>
      </div>
      </div>
      </div>
      </section>
        </div>

      </Fragment>

    
  );
}

export default AddProducts;