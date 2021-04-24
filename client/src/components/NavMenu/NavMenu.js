import React from "react";
//import { useStoreContext } from "../../utils/GlobalState";
// import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import "./style.css";

function NavMenu() {
//  const [store] = useStoreContext();

  return (
   
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
       spice-a-holic
     </a>
    </nav>
    </>
  //   <>
  //   <Navbar bg="dark" variant="dark">
  //   <Navbar.Brand href="#home">Spice-A-Holic</Navbar.Brand>
  //   <Nav className="mr-auto">
  //     <Nav.Link href="/">spice-a-holic</Nav.Link>
  //     <Nav.Link href="#features">Features</Nav.Link>
  //     <Nav.Link href="#pricing">Pricing</Nav.Link>
  //   </Nav>
  //   <Form inline>
  //     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
  //     <Button variant="outline-info">Search</Button>
  //   </Form>
  // </Navbar>
  // </>


  );
}

export default NavMenu;
