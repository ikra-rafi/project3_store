import React from "react";

function Project (props) {
    // set context for book search results

    return (
        <div>
        <table className="table table-curved table-responsive">
        <thead>
          <tr>
            <th className="alignCenter">Product</th>
            <th className="alignCenter">Package Size</th>
            <th className="alignCenter">Quantity</th>
            <th className="alignCenter">Price</th>
            <th className="alignCenter">SubTotal</th>
          </tr>
        </thead>
        <tbody >
            <tr>
              <td className="align-middle text-center"><p>{props.name}</p></td>
              <td className="align-middle text-center"><p>{props.prodInfo.size}</p></td>
              <td className="align-middle text-center"><p>{props.prodInfo.quantity}</p></td>
              <td className="align-middle text-center"><p>{props.prodInfo.price}</p></td>
              <td className="align-middle text-center"><p>${props.prodInfo.price * props.prodInfo.quantity}</p></td>
            </tr>
            </tbody>
        </table>
    </div>
    );
}

export default Project;