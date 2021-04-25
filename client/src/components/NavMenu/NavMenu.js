import React from "react";
//import { useStoreContext } from "../../utils/GlobalState";
import MobileMenu from "../mobile-menu/MobileMenu";
import MobileBtn from "../mobile-menu/MobileBtn";
import "./style.css";

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
   
    // <>
    // <div className="container">
   
    // <nav className="navbar navbar-expand-lg navbar-light">
    // <div className="container-fluid">
    //     <a className="navbar-brand" href="/"><img src="/assets/logo/spice-a-holic_logo-horizontal.png" alt="" width="250" /></a>
	  //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav">
		//     <span className="navbar-toggler-icon"></span>
	  //     </button>
    //     <div className="collapse navbar-collapse" id="main_nav">
    //       <ul className="navbar-nav">
    //         {/* <li className="nav-item active"> <a className="nav-link" herf="#">Spice-A-Holic</a> </li> */}
    //         {/* <li class="nav-item"><a class="nav-link" href="/"> Contact Us </a></li>
		// 	      <li class="nav-item"><a class="nav-link" href="/"> Services </a></li> */}
    //         <li class="nav-item dropdown has-megamenu">
		// 	        	<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"> Mega menu  </a>
		// 	        	<div class="dropdown-menu megamenu" role="menu">
		// 		      	This is content of megamenu. 
		// 		        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		// 			      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		// 		      	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		// 		      	consequat.
		// 	        	</div>
    //         </li>
    //       </ul>
    //       <div>
    //       <ul class="navbar-nav ms-auto">
		//       	<li class="nav-item"><a class="nav-link" href="#"> Menu item </a></li>
		//       	<li class="nav-item dropdown">
		// 	    	<a class="nav-link  dropdown-toggle" href="#" data-bs-toggle="dropdown"> Dropdown right </a>
		// 	    <ul class="dropdown-menu dropdown-menu-end">
		// 		     <li><a class="dropdown-item" href="#"> Submenu item 1</a></li>
		// 		      <li><a class="dropdown-item" href="#"> Submenu item 2 </a></li>
		// 	    </ul>
		// 	    </li>
	  //     	</ul>


    //       <div className="border-top pt-4 mb-5"><a class="btn btn-outline-primary w-100 mb-2" href="#">Log in</a><a className="btn btn-primary w-100" href="#">Sign up</a></div></div>
    //   </div>
    //  </div>
    // </nav>

    // </div>
    // </>
 
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
                                <a href="/">Home </a></li>
                                <li className="has-sub"><a href="#/">Products</a>
                                    <ul>
                                        <li><a href="gallery">Baking</a>
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
                                
                                <li><a to="contact">Contact</a>
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
                            <a href="#" onClick={() => triggerSearch()} className="cart-toggler search_icon">
                                <i className="icon-glyph-16"></i></a>
 
                            <div className="search_icon_inr">
                                <form action="#" method="POST">
                                    <div>
                                        <input placeholder="Search" type="text" />
                                        <button className="btn-search" type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </div> 
                        </li>
                        <li className="header_cart_icon">
                            <a href="cart"><i className="fa fa-shopping-cart"></i><span className="number_cart">0</span></a>
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
