import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useTodoContext} from "../../utils/store";

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
  const [state, dispatch] = useTodoContext();
  // function to log out a user
  function handleLogout() {
      // api call to logout
      API.Logout('/logout')
        .then(response => {
          console.log('Get user response: ')
          console.log(response.data)
          // check if there is a user saved
          if (response.data.user) {
            console.log('Get User: There is a user saved in the server session: ')
            // save the log in status and email to the store
            dispatch({
              type: "loggedIn",
              loggedIn: true,
              email: response.data.user.email
          })
          //user not logged in
        } else {
          console.log('Get user: no user');
          // update the store to reflect no logged in user and no email
          dispatch({
            type: "loggedIn",
            loggedIn: false,
            email: null
          })

        }
      })
    }

  return (
    <div className="offcanvasMobileMenu" id="offcanvas-mobile-menu">
      <button
        className="offcanvasMenuClose"
        id="mobile-menu-close-trigger"
        onClick={() => closeMobileMenu()}
      >X<i className="bi bi-x"></i>
      </button>

      <div className="offcanvasWrapper">
        <div className="offcanvasInnerContent">

          <nav className="offcanvasNavigation" id="offcanvas-navigation">
            <ul>
              {/* <li>
                <Link to="/"><img src="/assets/logo/spice-a-holic_logo-mark.png" alt="spiceaholic" width="225"/></Link>
              </li> */}

              <li className="menuItemHasChildren">
                <Link to={process.env.PUBLIC_URL + "#/"}>Products</Link>
                <ul className="subMenu">
                  <li> <Link to="/filtered/products/baking">Baking</Link> </li>
                  <li> <Link to="/filtered/products/grilling">Grilling</Link></li>
                  <li><Link to="/filtered/products/seasonings">Seasoning</Link></li>
                  <li><Link to="/filtered/products/extracts">Extracts</Link></li>
                  <li><Link to="/filtered/products/teas">Teas</Link></li>
                </ul>
              </li>

                      <li className="menuItemHasChildren">
                <Link to="/blog">Blog</Link>
                <ul className="subMenu">
                <li><a href="https://www.marksdailyapple.com/health-benefits-turmeric/">Turmeric</a>
                                        </li>
                                        <li><a href="https://www.marksdailyapple.com/cumin/">Cumin</a>
                                        </li>
                                        <li><a href="https://www.marksdailyapple.com/salt-what-is-it-good-for/">Salt</a>
                                        </li>
                </ul>
              </li>

                                  <li className="menuItemHasChildren">
                                    <Link to="/regions">Regions</Link>

                                  <ul className="subMenu">
                                        <li><a href="india">India</a>
                                        </li>
                                        <li><a href="asia">Asia</a>
                                        </li>
                                        <li><a href="caribbean">Caribbean</a>
                                        </li>
                                        <li><a href="middleast">Middle East</a>
                                        </li>
                                        <li><a href="african">African</a>
                                        </li>
                                        <li><a href="europe">Europe</a>
                                        </li>
                                    </ul>
                                    </li >
            </ul>
          </nav>

          {/* Search Form */}
          <div className="offcanvasMobileSearchArea">
            <Link to="/products">
              <input className="fa fa-search" type="search" placeholder="Search ..." />
              <button id="mobilesearch" type="submit"><i className="fa fa-search"></i>
              </button>
            </Link>
          </div>
          {state.loggedIn ? (
                    <div>
                        <Link className="more-link" to="/" onClick={handleLogout}>
                            Logout
                        </Link>
                        <Link className="more-link" to="/orderHistory" >
                            Order History
                        </Link>
                    </div>
                ) : (
                    <Link className="more-link" to="/login" >
                    Login
                </Link>
                )}
          {/* Contact Info  */}

          <div className="header_top_right list-unstyled">
            <ul>
              <li>
              <i className="fa fa-phone"></i> 555 555 5555
              </li>
              <li>
              <i className="fa fa-envelope"></i> spiceaholic@email.com
              </li>
              <li>
              <i className="fa fa-globe"></i> 1234 Northern Ave.
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
