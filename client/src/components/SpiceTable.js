import React from "react";

function SpiceTable (props) {

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,      
      maximumFractionDigits: 2,
    });

    return (
        <table className="table table-curved table-responsive">
        <tbody >

            <tr>
              <td className="align-middle text-center"><p>{props.name}</p></td>
              <td className="align-middle text-center"><p>{props.size}</p></td>
              <td className="align-middle text-center"><p>{props.quantity}</p></td>
            </tr>

            </tbody>
        </table>
    );
}

export default SpiceTable;