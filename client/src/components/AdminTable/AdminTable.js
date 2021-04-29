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

  useEffect(() => {
    let isMounted = true;
    if ( state.products.length > 0 ) {
      if(isMounted) {
        setSortedProducts(state.products);
      }

    }
  });

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

  function updateProduct (e) {
    e.preventDefault();

  }

  return (
    <section>
   <div>
     <table id="table"className="table table-hover">
        <thead id="th">
          <tr>
            <th></th>
            <th id="prdBtn"><button id="btn"onClick={sortTableByProdID}>Product ID</button></th>

            <th id="prdNm"><button id="btn"onClick={sortTableByName}>Product Name</button></th>
            <th><button id="btn">Description</button></th>
            <th><button id="btn">Size</button></th>
            <th><button id="btn">Quantity</button></th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(result=>(
            console.log(result),
            result.packaging.map(res=>(
              console.log(res),
              <tr key={result._id + res.size}>
                <td>
                <Link className="nav-link" to={{pathname: `/products/${result._id}`}} ><img className="thumbnail-image" alt={result.name} src={result.picLink} /></Link>
                </td>
                <td><p id="tdp"> {result.productID}</p></td>
                <td><p id="tdp"> {result.name}</p></td>
                <td><p id="tp"> {result.description}</p></td>
                <td><p id="pp">  {res.size}</p></td>
                <td><input id="tdIn"defaultValue={res.quantity}  /></td>
                {/* <td>
                  <button onclick="updateProduct">Update</button>
                </td> */}

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