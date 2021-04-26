import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  useEffect(() => {
    const offCanvasNav = document.querySelector("#offcanvas-navigation");
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(`.subMenu`);
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        `<span class="menuExpand"><i></i></span>`
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menuExpand");
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", e => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        closeMobileMenu();
      });
    }
  });

  const sideMenuExpand = e => {
    e.currentTarget.parentElement.classList.toggle("active");
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
    <div className="offcanvasMobileMenu" id="offcanvas-mobile-menu">
      <button
        className="offcanvasMenuClose"
        id="mobile-menu-close-trigger"
        onClick={() => closeMobileMenu()}
      >
      <i className="bi bi-search"></i>
      </button>

      <div className="offcanvasWrapper">
        <div className="offcanvasInnerContent">

          <nav className="offcanvasNavigation" id="offcanvas-navigation">
            <ul>
              <li>
                <Link to="/"><img src="/assets/logo/spice-a-holic_logo-mark.png" alt="spiceaholic" width="225"/></Link>
              </li>

              <li className="menuItemHasChildren">
                <Link to={process.env.PUBLIC_URL + "#/"}>Products</Link>
                <ul className="subMenu">
                  <li> <Link to={process.env.PUBLIC_URL + "/baking"}>Baking</Link> </li>
                  <li> <Link to={process.env.PUBLIC_URL + "/grilling"}>Grilling</Link></li>
                  <li><Link to={process.env.PUBLIC_URL + "/seasonings"}>Seasoning</Link></li>
                  <li><Link to={process.env.PUBLIC_URL + "/extracts"}>Extracts</Link></li>
                  <li><Link to={process.env.PUBLIC_URL + "/teas"}>Teas</Link></li>
                </ul>
              </li>

                      <li className="menuItemHasChildren">
                <Link to={process.env.PUBLIC_URL + "/blog"}>Blog</Link>
                <ul className="subMenu">
                <li><a href="https://www.marksdailyapple.com/health-benefits-turmeric/">Turmeric</a>
                                        </li>
                                        <li><a href="https://www.marksdailyapple.com/cumin/">Cumin</a>
                                        </li> 
                                        <li><a href="https://www.marksdailyapple.com/salt-what-is-it-good-for/">Salt</a>
                                        </li>  
                </ul>
              </li>

              <li>
                <Link to="/recipes">Recipes</Link>
              </li>

            </ul>
          </nav>

          {/* Search Form */}
          <div className="offcanvasMobileSearchArea">
            <form action="#">
              <input type="search" placeholder="Search ..." />
              <button type="submit"> 
              </button>
            </form>
          </div>

          {/* Contact Info  */} 

          <div className="header_top_right list-unstyled">
            <ul>
              <li>
              <i className="fa fa-phone"></i> +234 567 234 875
              </li>
              <li>
              <i className="fa fa-envelope"></i> info@yourdomain.com
              </li>
              <li>
              <i className="fa fa-globe"></i> 1st Avenue, Boston
              </li>
            </ul>
          </div>

          {/* Social Icon*/}
          <div className="header_top_left">
            <ul className="header_socil list-inline">   
                <li>
                    <Link to="#/" className="fa fa-facebook"></Link>
                </li>
                <li>
                    <Link to="#/" className="fa fa-twitter"></Link>
                </li>
                <li>
                    <Link to="#/" className="fa fa-linkedin"></Link>
                </li>
                <li>
                    <Link to="#/" className="fa fa-google-plus"></Link>
                </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
