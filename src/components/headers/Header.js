import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { StateHandler } from "../../StateHandler";
import axios from "axios";

const Header = () => {
  const state = useContext(StateHandler);
  console.log(state);
  const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
  const [cart] = state.userApi.cart;

  const logoutUser = async () => {
    await axios.get("https://big-mern.herokuapp.com/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };

  const adminRoute = () => {
    return (
      <Fragment>
        <li>
          <Link to="https://big-mern.herokuapp.com/create_product" className="nav-item nav-link">
            Create Product
          </Link>
        </li>
        <li>
          <Link to="/category" className="nav-item nav-link">
            Categories
          </Link>
        </li>
      </Fragment>
    );
  };

  const loggedRoute = () => {
    return (
      <Fragment>
        <li>
          <Link to="/" className="nav-item nav-link" onClick={logoutUser}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </li>
      </Fragment>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div>
        <Link className="navbar-brand" to="/">
          {isAdmin ? "Hello Admin" : " E-Commerce Store"}
        </Link>
      </div>
      <div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav float-left">
            <Link className="nav-item nav-link active" to="/">
              {isAdmin ? "Products" : "Shop"}
              <span className="sr-only">(current)</span>
            </Link>
            {isAdmin && adminRoute()}
            {isLogged ? (
              loggedRoute()
            ) : (
              <div>
                <Link className="nav-item nav-link" to="/login">
                  <i className="fas fa-user"></i> Login or Register
                </Link>
              </div>
            )}

            {isAdmin || !isLogged ? (
              ""
            ) : (
              <Link className="nav-item nav-link" to="/cart">
                <span className="text-danger">{cart.length}</span>
                <i className="fas fa-shopping-cart"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
