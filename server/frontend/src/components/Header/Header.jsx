import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, { method: "GET" });
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      alert("Logging out " + username + "...");
      window.location.href = window.location.origin;
    } else {
      alert("The user could not be logged out.");
    }
  };

  let curr_user = sessionStorage.getItem('username');

  let home_page_items = (
    <div className="input_panel">
      <a className="nav_item" href="/login" style={{color:"white", marginRight:"10px"}}>Login</a>
      <a className="nav_item" href="/register" style={{color:"white"}}>Register</a>
    </div>
  );

  if (curr_user !== null && curr_user !== "") {
    home_page_items = (
      <div className="input_panel">
        <span style={{color:"white", marginRight:"10px"}}>{curr_user}</span>
        <a className="nav_item" href="/" onClick={logout} style={{color:"white"}}>Logout</a>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"darkturquoise", height:"1in"}}>
        <div className="container-fluid">
          <h2 style={{paddingRight:"5%", color:"white"}}>Dealerships</h2>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" style={{fontSize:"larger", color:"white"}} href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{fontSize:"larger", color:"white"}} href="/about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{fontSize:"larger", color:"white"}} href="/contact">Contact Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{fontSize:"larger", color:"white"}} href="/dealers">Dealers</a>
              </li>
            </ul>
            <span className="navbar-text">
              <div className="loginlink" id="loginlogout">
                {home_page_items}
              </div>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
