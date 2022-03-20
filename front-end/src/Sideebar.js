import React from "react";
import { Link } from "react-router-dom";
import { Side } from "./Side";
function Sideebar() {
  return (
    <ul className="sidebar">
      <div className="sidebarList">
        <div className="row">
          {Side.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.path}>
                  {item.icon}
                  <span id="title">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
    </ul>
  );
}
export default Sideebar;
