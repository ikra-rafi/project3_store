import React from "react"; 

const HeaderBtn = () => {

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div className="header-btn-wrapper">
 
      <div className="mobile-button-wrapper d-block d-lg-none text-right">
        {/* <svg className="mobile-aside-button" onClick={() => triggerMobileMenu()} ></svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => triggerMobileMenu()} width="20" height="20" fill="currentColor" className="mobile-aside-button" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>     
      </div>
      
    </div>
  );
};

export default HeaderBtn;
