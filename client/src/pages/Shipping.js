import React, { Fragment, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {Container} from "../components/Grid";
import API from "../utils/API";
import { useTodoContext} from "../utils/store";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import MetaTags from "react-meta-tags";

function ShippingCosts() {
  // setup references to fields on page
  let shipWeight = React.createRef();
  let shipCost = React.createRef();
  let shipID;

  const [state, dispatch] = useTodoContext();
  const [shipList, setShipList] = useState([]);
  let history = useHistory();
    
    useEffect(() => {
      if(!state.admin) {
        history.push("/");
      }
      getShipCost();
    }, [])

    var myShip = [];
  // function to retrieve all the shipping costs
  function getShipCost() {

    API.getShippingRates()
      .then(res => {
        console.log(res.data);
        setShipList(res.data);

        res.data.forEach(element => {
          myShip.push(element);
          console.log(myShip);
        })

      })
      .catch(err => console.log(err));
  }

  // function to handle submit button
  function handleSubmitBtnClick(e) {
    e.preventDefault();
    // object to capture shipping cost info before saving to database
    const shipInfo = 
    {
      id: shipID,
      shipCost: parseFloat(shipCost.current.value)
    }

    console.log(shipInfo);
    //api call to save ship cost to db
    API.updateShippingCost(shipInfo)
      .then(res => {
        // check if successful save
        if(res.status === 200) {
        }
      }) 
      .catch(err => console.log(err));
  }

  function selectWeight(e) {
    e.preventDefault();
    var changedWeight = shipWeight.current.value;

    var cost;
    shipList.forEach(element => {
      // find shipping cost based upon weight
      if(parseInt(element.maxWeight) === parseInt(changedWeight)) {
        cost = element.shipCost;
        shipID = element._id;
      }
    })
    // set shipping cost field with shipping cost based upon weight value selected by user
    shipCost.current.value = cost;
  }

  return (
    <Fragment>
    <MetaTags>
      <title>spice-A-holic | Update Shipping Costs</title>
      <meta
        name="Spice-A-Holic shipping"
        content="shipping."
      />
    </MetaTags>

    <div className="checkout-page">
        {/*====================  breadcrumb area ====================*/}

        <Breadcrumb title="Update Shipping Costs" />
        
        {/*====================  End of breadcrumb area  ====================*/} 


        {/*====================  Start of Update Shipping Costs  Section    ====================*/}  
     <section>
  
      <Container fluid>
        <Container >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 col-md-5 col-lg-6">
              <div className="container-fluid containerColor marginBottomCont">
                <h1 className="text-center">Update Shipping Costs</h1> 
                  <div>
                    <form>
                      <select className="custom-select d-block w-100" ref={shipWeight} id="shipWeight" defaultValue="" onChange={selectWeight} required="">
                        <option  value = "Null">---Select Weight---</option>
                        {shipList.map(result => (
                          <option key={result._id} value={result.maxWeight}>{parseInt(result.minWeight / 16)} lbs - {parseInt(result.maxWeight / 16)} lbs</option>
                        ))}
                      </select>
                      <br />
                      <label className="label" htmlFor="shipCost">Shipping Cost</label>
                      <input name="shipCost" ref={shipCost} id="shipCost" className="form-control form-control-lg" placeholder="Shipping Cost" />
                    </form>
                  </div>
                </div>
                <br />
                <br />
             <button type="submit" className="btn myButton buttonMargin" style={{ fontSize: "20px"}} onClick={handleSubmitBtnClick}><strong>Update Shipping Cost</strong></button>
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

export default ShippingCosts;