import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Product</Link>
          </li>
        </ul>
      </nav>

      <div style={{ padding: "50px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
