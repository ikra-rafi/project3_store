import React from "react";
import ContactUsForm from "../components/ContactUsForm.js";
import Container from "../components/Container";
import ProductsTable from "../components/ProductsTable";


function Admin() {
  return (
    <div>
      <Container>
        <ProductsTable />
        <ContactUsForm />
   
      </Container>
</div>
  );

}

export default Admin;