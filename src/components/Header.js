import React from "react";
import { FiType } from "react-icons/fi";

const Header = ({ timer }) => {
  return (
    <div className="header">
      <div className="header-right">
        <p className="logo">
          <FiType size="24" />
        </p>
        <div className="heading-text">
          <p>monkey see</p>
          <h1>monkeyclone</h1>
        </div>
      </div>
      <div className="header-left">
        <p>
          <span className="active">time</span>
          <span>firstmistake</span>
        </p>
        <p>
          <span>30s</span>
          <span>60s</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
