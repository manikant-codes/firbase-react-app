import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand as={Link} href="https://flowbite-react.com">
          <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link to="/">Home</Link>
          <Link to="/login">Login/Register</Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
