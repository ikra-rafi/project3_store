import React, { useEffect, useState } from "react";
import { useTodoContext} from "../../utils/store";
import "./style.css";

function AdminTable() {

  const [state, dispatch] = useTodoContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [nameSort, setNameSort] = useState("ascending");

//   console.log(state);
//   console.log(nameSort);

//   useEffect(() => {
//     setFilteredProducts(state.products);
//     console.log(filteredProducts);
//   }, []);


//   function sortTableByName() {
//     // let filteredResults = [state.products];

//     setFilteredProducts(state.products);

//     console.log(filteredProducts);

//     // if ( nameSort === "ascending"){
//     //     filteredResults.sort((a, b) => {
//     //         if (a.name < b.name) {
//     //             return -1;
//     //         }
//     //         if (a.name > b.name) {
//     //             return 1;
//     //         }

//     //         return 0;
//     //     });
//     //     setFilteredProducts(filteredResults);
//     //     setNameSort("descending");
//     // }

//     // if ( nameSort === "descending"){
//     //     filteredResults.sort((a, b) => {
//     //         if (a.name < b.name) {
//     //             return 1;
//     //         }
//     //         if (a.name > b.name) {
//     //             return -1;
//     //         }
//     //         return 0;
//     //     });

//     //     setFilteredProducts(filteredResults);
//     //     setNameSort("ascending")
//     // }
// }

  return (
   <div>
     <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th><button>Product ID</button></th>
            <th><button>Product Name</button></th>
            <th>Description</th>
            <th>Size</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map(result=>(
            console.log(result),
            result.packaging.map(res=>(
              console.log(res),
              <tr key={result._id + res.size}>
                <td></td>
                <td><p> {result.productID}</p></td>
                <td><p> {result.name}</p></td>
                <td><p> {result.description}</p></td>
                <td><p> {res.size}</p></td>
                <td><input defaultValue={res.quantity}  /></td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
   </div>
  );
}

export default AdminTable;