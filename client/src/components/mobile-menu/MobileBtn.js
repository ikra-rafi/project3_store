import React from "react"; 

const HeaderBtn = () => {

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div className="header-btn-wrapper">
 
      <div className="mobile-button-wrapper d-block d-lg-none text-right">
        <button className="mobile-aside-button" onClick={() => triggerMobileMenu()} >
            <i className="icon-glyph-233"></i>
        </button>
      </div>
      
    </div>
  );
};

export default HeaderBtn;
