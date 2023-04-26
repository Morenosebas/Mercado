import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { NavMenu } from "./navMenu";
import { ShopCarView } from "./shopCarView";
import { useState } from "react";
import { useSelector } from "react-redux";
export const NavBar = () => {
  const [show, setShow] = useState(false);
  const { cart } = useSelector((state) => state.session);
  return (
    <div
      className="container-fluid Navcontainer bg-light"
      style={{ zIndex: 1000 }}
    >
      <nav className="navbar ">
        <div className="container-fluid">
          <div className="navbar-brand ">
            <NavMenu />
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-danger" type="submit">
              Search
            </button>
          </form>
          <div className="navigatorContainer">
            <NavLink className="navlinks" to="/">
              Inicio
            </NavLink>
            <div
              className="navlinks"
              onMouseEnter={() => setShow(!show)}
              style={{ border: "0 px solid" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>
          </div>
          {show && <ShopCarView onMouseLeave={() => setShow(!show)} products={cart} />}
        </div>
      </nav>
    </div>
  );
};
