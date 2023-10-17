import { useContext, useState } from "react";
import Hamburger from "hamburger-react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";

import "./Header.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isLogin } = useContext(AuthContext);

  return (
    <header>
      <nav className="container">
        <div className="nav__item">
          <div>
            {isLogin ? (
              <Link className="my__post" to={"/my-posts"}>
                My posts
              </Link>
            ) : (
              <Link to={"/"}>
                <LazyLoadImage
                  effect="blur"
                  src="/images/Logo (1).svg"
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <div className={`nav__item__link ${isOpen && "open"}`}>
            <NavLink onClick={() => setIsOpen(false)} to={"/"}>
              Home
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to={"/all-posts"}>
              Blog
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to={"/about"}>
              About Us
            </NavLink>
            <NavLink onClick={() => setIsOpen(false)} to={"/register"}>
              Register
            </NavLink>
            {isLogin ? (
              <Link
                onClick={() => setIsOpen(false)}
                to={"/account"}
                className="login"
              >
                Account
              </Link>
            ) : (
              <Link
                onClick={() => setIsOpen(false)}
                to={"/login"}
                className="login"
              >
                Login
              </Link>
            )}
          </div>
          <div className="hamburger">
            <Hamburger
              className="hamburger__menu"
              easing="ease-in"
              toggled={isOpen}
              toggle={setIsOpen}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
