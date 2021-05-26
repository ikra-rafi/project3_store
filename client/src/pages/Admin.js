import React , { Fragment, useEffect, useState} from "react";
import { useTodoContext} from "../utils/store";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import AdminTable from "../components/AdminTable";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";


function Admin() {

  const [products, setProducts]= useState([]);
  const [state, dispatch] = useTodoContext();
  let history = useHistory();

  // The useEffect() scrolls to the top of the page on render.
  // It checks to see if the logged in user is an admin and then calls getProducts().  If not, they are re-directed to the home page.
  useEffect(() => {
    console.log(state);
    window.scrollTo(0, 0);
    if(!state.admin) {
      history.push("/");
    } else
    {
      getProducts();
    }

  }, [])

  // getProducts() makes an API call to get the Products from the store and sets them in a products array. The products are then dispatched to the store.
  function getProducts() {
    API.getProductsFromStore()
    .then(res=> {
      setProducts(res.data);
      var products = [];
      res.data.forEach(element => {
        products.push(element);

      });

      dispatch({
        type: "products",
        products: products
      });
    })
    .catch(err => console.log(err))
  }

  // Returns breadcrumbs and AdminTable component
  return (
    <Fragment>
    <MetaTags>
      <title>spice-A-holic | Admin</title>
      <meta
        name="description"
        content="Organic spices."
      />
    </MetaTags>

   {/* <div className="contact-page"> */}

     {/*====================  breadcrumb area ====================*/}

     <Breadcrumb title="Admin" />

     {/*====================  End of breadcrumb area  ================*/}


      {/*====================  Contact Form  area  ====================*/}

        <AdminTable />
    {/* </div> */}
        </Fragment>

  );
}

export default Admin;