import React from "react";
import Container from "../components/Container";
import AccountInfo from "../components/AccountInfo";
import OrdersTable from "../components/OrdersTable";

function Account() {
  return (
    <div>
      <Container>
        <AccountInfo />
        <OrdersTable />
      </Container>
</div>
  );
}

export default Account;