import React from "react";
import { Link } from "react-router-dom";

const DashHeader = () => {
  const content = (
    <header className="DashHeader">
      <div className="DashHeader_container">
        <Link to={"/dash"} style={{ textDecoration: "none" }}>
          <h2>NoteHub</h2>
        </Link>
        <nav className="dash-header__nav">{/* add nav buttons later */}</nav>
      </div>
    </header>
  );

  return content;
};

export default DashHeader;
