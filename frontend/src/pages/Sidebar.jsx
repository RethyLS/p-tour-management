import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo/logo.png';
import '../style/Sidebar.css';
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";

const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <aside className="sidebar">
      <div className="d">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav>
        <ul>
          <li className="menu-item">
            <Link to="/" className="no"><AiOutlineHome />Dashboard</Link>
          </li>

          <li className="section-title">Product</li>

          <li className="menu-item">
            <Link to="/products" className="no"><LuShoppingCart />Products</Link>
          </li>
          <li className="menu-item">
            <Link to="/categories" className="no"><MdOutlineCategory />Categories</Link>
          </li>

          <li className="section-title">Other</li>

          <li className="menu-item" onClick={toggleSettings}>
            <IoSettingsOutline />Settings <FaAngleDown />
          </li>

          {isSettingsOpen && (
            <li className="sub-item">
              <Link to="/users" className="no"><FaRegCircleUser />Users</Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
