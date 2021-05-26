import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import {useTodoContext} from "../../utils/store";
import "./style.css";
import { Link } from "react-router-dom";

function AdminTable() {

  const [state, dispatch] = useTodoContext();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [nameSort, setNameSort] = useState("ascending");
  const [productSort, setProductSort] = useState("ascending");

  // useEffect sets the sortedProducts state variable to the products from the store
  useEffect(() => {
    let isMounted = true;
    if ( state.products.length > 0 ) {
      if(isMounted) {
        setSortedProducts(state.products);
      }
    }
  });

  // Handles the sort for the name field
  function sortTableByName() {

    const sortedResults = [sortedProducts];

    if ( nameSort === "ascending"){
        const results = sortedResults[0].sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }

            return 0;
        });
        setSortedProducts(results);
        setNameSort("descending");

    }

    if ( nameSort === "descending"){
        const results = sortedResults[0].sort((a, b) => {
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return -1;
            }
            return 0;
        });

        setSortedProducts(results);
        setNameSort("ascending")
    }
  }

  // Handles the sort for the product ID field
  function sortTableByProdID() {

    const sortedResults = [sortedProducts];

    if ( productSort === "ascending"){
        const results = sortedResults[0].sort((a, b) => {
            if (a.productID < b.productID) {
                return -1;
            }
            if (a.productID > b.productID) {
                return 1;
            }

            return 0;
        });
        setSortedProducts(results);
        setProductSort("descending");

    }

    if ( productSort === "descending"){
      const results = sortedResults[0].sort((a, b) => {
          if (a.productID < b.productID) {
              return 1;
          }
          if (a.productID > b.productID) {
              return -1;
          }

          return 0;
      });
      setSortedProducts(results);
      setProductSort("ascending");

    }
  }

  function updatePackaging(e){
    e.preventDefault();
    const btn = e.target.id;
    const val = btn.split("-");
    const id = val[1];
    const sizes = document.querySelectorAll(`[datavalue=size-${id}]`);
    const packaging = [];

    sizes.forEach(function (item) {
      const s = item.innerHTML;
      const p = document.getElementById(`price-${id}-${item.innerHTML}`).value;
      const q = document.getElementById(`quantity-${id}-${item.innerHTML}`).value;
      const pkg = {
        size: s,
        price: p,
        quantity: q
      }
      packaging.push(pkg);
    })

    API.updateProduct(id, packaging)
    .then(res => {
      console.log(res);
      alert("Your update has been saved!");
    })
  }

  // Returns a table with all the associated Admin fields
  return (
  <section className="py-4">
   <div className="container-fluid">
   <div style={{textAlign:'right', margin:0, paddingRight:'15px'}}>
        <Link to="/addproducts" id="adminBtn" className="slider_btn_one more-link" style={{marginRight:"15px"}}><i className="fa fa-plus-circle" aria-hidden="true"> ADD Product</i></Link>
        <Link to="/salestax" id="adminBtn" className="slider_btn_one more-link" style={{marginRight:"15px"}}><i className="fa fa-wrench" aria-hidden="true"> UPDATE SALES TAX</i></Link>
        <Link to="/shipping" id="adminBtn" className="slider_btn_one more-link"><i className="fa fa-truck" aria-hidden="true"> UPDATE SHIPPING COSTS</i></Link>
      </div>
     <div className="table-responsive">
     <table id="adminTable" className="table table-hover">
        <thead id="th">
          <tr>
            <th className="tohide"></th>
            <th className="tohide" id="prdBtn"><button className="adminBtn" onClick={sortTableByProdID}>Product ID</button></th>

            <th id="prdNm"><button className="adminBtn tohide" onClick={sortTableByName}>Product Name</button></th>
            <th><button className="adminBtn">Size</button></th>
            <th><button className="adminBtn">Price</button></th>

            <th><button className="adminBtn">Quantity</button></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(result=>(
            // console.log(result),
            result.packaging.map(res=>(
              // console.log(res),
              <tr key={result._id + res.size}>
                <td className="tohide" id="picCol">
                <Link className=" " to={{pathname: `/products/${result._id}`}} ><img className="thumbnail-image" alt={result.name} src={result.picLink} /></Link>
                </td>
                <td className="tohide"><p > {result.productID}</p></td>
                <td><p > {result.name}</p></td>
                <td><p val={res.size} datavalue={`size-${result._id}`}>{res.size}</p></td>
                <td><input id={`price-${result._id}-${res.size}`} className={`tdIn price-${result._id}`}
                datavalue={`price-${result._id}`} defaultValue={res.price}/></td>
                <td><input id={`quantity-${result._id}-${res.size}`}
                className="tdIn" datavalue={`quantity-${result._id}`}
                defaultValue={res.quantity}/></td>
                <td>
                  <button id={`updateBtn-${result._id}`} className="inline btn fa fa-floppy-o updateBtn" onClick={updatePackaging}></button>
                </td>

              </tr>
            ))
          ))}
        </tbody>
      </table>
   </div>
   </div>
   </section>
  );
}

export default AdminTable;