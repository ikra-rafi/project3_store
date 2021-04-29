import { useTodoContext} from "../../utils/store";
import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";

function Header() {

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
 
    <div className="header_topbar">
        {/* Logo */}
        <div className="container"> 
                <div className="header_top_right list-unstyled">
                    <ul>
                        <li><i className="fa fa-tags"></i>Members receive 10% off their purchase!</li>
                        <li><i className="fa fa-heart"></i>Favorites</li>
                    </ul>
                </div>
                <div className="header_top_left">
                    <ul className="header_socil list-inline pull-left">  
                        <li><Link to="/contact" target="_blank"><i className="fa fa-envelope"></i>Contact Us</Link></li>
                        <li>
                            <a href="//facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="//twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="//instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href="//pinterest.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-pinterest"></i></a>
                        </li>
                    </ul>
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
            </div> 
    </div> 
	)
}

export default Header;