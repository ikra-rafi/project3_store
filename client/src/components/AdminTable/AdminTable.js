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

  // Returns a table with all the associated Admin fields
  return (
    <section>
   <div className="table-responsive text-center">
     <table id="table"className="table table-hover">
        <thead className="align-left text-left" id="th">
          <tr>
            <th className="align-left text-center"></th>
            <th className="align-left text-center" id="prdBtn"><button id="btn"onClick={sortTableByProdID}>Product ID</button></th>

            <th className="align-left text-left" id="prdNm"><button id="btn"onClick={sortTableByName}>Product Name</button></th>
            <th className="align-left text-left"><button id="btn">Price</button></th>
            <th className="align-left text-left"><button id="btn">Size</button></th>
            <th className="align-left text-left"><button id="btn">Quantity</button></th>
            <th className="align-left text-left"></th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(result=>(
            console.log(result),
            result.packaging.map(res=>(
              console.log(res),
              <tr key={result._id + res.size}>
                <td style={{width:"150px", overflow:"hidden", textOverflow:"ellipsis"}}>
                <Link className="nav-link" to={{pathname: `/products/${result._id}`}} ><img className="thumbnail-image" alt={result.name} src={result.picLink} /></Link>
                </td>
                <td className="align-left text-left"><p id="tdp"> {result.productID}</p></td>
                <td className="align-left text-left"><p id="tdp"> {result.name}</p></td>
                <td className="align-left text-left"><p id="tp" val={res.price}>{res.price}</p></td>
                <td className="align-left text-left"><p id="pp"val={res.size}>{res.size}</p></td>
                <td className="align-left text-left"><input id="tdIn"
                defaultValue={res.quantity}  /></td>
                <td className="align-middle text-center">
                  <a href="#" id= "updateButton" >Update</a>
                </td>

              </tr>
            ))
          ))}
        </tbody>
      </table>
   </div>
   </section>
  );
}

export default AdminTable;