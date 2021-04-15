import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import "./style.css";

function Nav() {
  const [store] = useStoreContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Home
      </a>
    </nav>
  );
}

export default Nav;
