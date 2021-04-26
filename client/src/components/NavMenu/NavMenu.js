import React from "react";
//import { useStoreContext } from "../../utils/GlobalState";
import MobileMenu from "../mobile-menu/MobileMenu";
import MobileBtn from "../mobile-menu/MobileBtn";
import { Link } from 'react-router-dom';

function NavMenu() {
//  const [store] = useStoreContext();
document.addEventListener("DOMContentLoaded", function(){
  /////// Prevent closing from click inside dropdown
  document.querySelectorAll('.dropdown-menu').forEach(function(element){
    element.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  })
}); 


  const triggerSearch = () => {
    const offcanvasMobileMenu = document.querySelector(".search_icon_inr");
    offcanvasMobileMenu.classList.toggle("active");
  };


  return (
 
<div className="menu_area">	
    {/* Start: header navigation */}
    <div className="navigation">
        <div className="container"> 
                <div className="logo">
                    <a href= "/"> 
                    	<img src="/assets/logo/spice-a-holic_logo-horizontal.png" alt="spiceaholic" width="225"/>
                    </a>
                </div>

                <div className="meun_wrp">
                    <nav expand="lg" sticky="top" id="navigation">  
                        <nav className="mr-auto">
                            <ul>
                                <li className="active">
                                {/* <Link to="/">Home </Link> */}
                                </li>
                                <li className="has-sub"><a href="#/">Products</a>
                                    <ul>
                                        <li><a href="baking">Baking</a>
                                        </li>
                                        <li><a href="grilling">Grilling</a>
                                        </li>
                                        <li><a href="seasoning">Seasoning</a>
                                        </li>
                                        <li><a href="extract">Extract</a>
                                        </li>
                                        <li><a href="teas">Teas</a>
                                        </li>

                                    </ul>
                                </li>
                                <li className="has-sub"><a href="blog">Blog</a>
                                    <ul>
                                        <li><a href="https://www.marksdailyapple.com/health-benefits-turmeric/">Turmeric</a>
                                        </li>
                                        <li><a href="https://www.marksdailyapple.com/cumin/">Cumin</a>
                                        </li> 
                                        <li><a href="https://www.marksdailyapple.com/salt-what-is-it-good-for/">Salt</a>
                                        </li>
                                    </ul>
                                </li>
                                
                                <li><Link to="/recipes">Recipes</Link>
                                </li>
                            </ul>
                        </nav> 
                    </nav>
                </div>
                

                {/* Mobile Menu */}

                <MobileBtn /> 

                <MobileMenu />

                {/* End:  Mobile Menu */}


                {/* Start: Cart  */}
                <div className="header_cart">
                    <ul>
                        <li className="header_search">
                            {/* <a href="#" onClick={() => triggerSearch()} className="cart-toggler search_icon">
                                <i className="bi bi-search"></i></a> */}
                                {/* <figure> */}
                            <a href="#">
                              <img src="./assets/icons/search.png" 
                                 className="cart-toggler search_icon" 
                                 type="button" width="12px"
                                 onClick={() => triggerSearch()}
                              /></a>
          
                            <div className="search_icon_inr">
                                <form action="#" method="POST">
                                    <div className="form-group">
                                        <input placeholder="Search" type="text" /> 
                                        <button className="btn-search" type="submit">
                                        <img src="assets/icons/search" className="bi bi-search" />
                                        </button>
                                    </div>
                                </form>
                            </div> 
                          </li>
                        <li className="header_cart_icon">
                            <Link to="/cart"><i className="fa fa-shopping-cart"></i><span className="number_cart">0</span></Link>
                        </li>
                    </ul>
                </div>
                 {/* End: Cart  */}
 
        </div>
        {/* container */} 
    </div>
    {/* End: header navigation */}

 
</div>
 


  );
}

export default NavMenu;
