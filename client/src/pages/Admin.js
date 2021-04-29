import React , { Fragment, useEffect, useState} from "react";
import { useTodoContext} from "../utils/store";
import API from "../utils/API";
import AdminTable from "../components/AdminTable";
import MetaTags from "react-meta-tags";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";

function Admin() {

  const [product, setProducts]= useState([]);
  const [state, dispatch] = useTodoContext();

  useEffect(() => {
    getProducts();
  }, [])

  function getProducts() {
    API.getProductsFromStore()
    .then(res=> {
      setProducts(res.data);
      var products = [];
      res.data.forEach(element => {
        products.push(element);

      });
      console.log(products);

      dispatch({
        type: "products",
        products: products
      });
    })
    .catch(err => console.log(err))
  }

  return (
    <Fragment>
    <MetaTags>
      <title>spice-A-holic | Admin</title>
      <meta
        name="description"
        content="Organic spices."
      />
    </MetaTags>

   <div className="contact-page">

     {/*====================  breadcrumb area ====================*/}

     <Breadcrumb title="Admin" />

     {/*====================  End of breadcrumb area  ================*/}


      {/*====================  Contact Form  area  ====================*/}    

        <AdminTable />
    </div>
        </Fragment>

  );
}

export default Admin;