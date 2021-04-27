import React from "react";

function SpiceTable (props) {

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });

    return (
        <div>
          <td className="align-middle text-center"><p>{props.name}</p></td>
          <td>    </td>
          <td className="align-middle text-center"><p>{props.size}</p></td>
          <td>    </td>
          <td className="align-middle text-center"><p>{props.quantity}</p></td>
        </div>
   );
}

export default SpiceTable;