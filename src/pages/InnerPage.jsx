import React from "react";
import "../styles/InnerPage.css";
import { Link } from "react-router-dom";

const InnerPage = () => {
  return (
    <div className="container">
      <div className="innerPageFlex">
        <Link className="mainLink" to="/legal-entity-agreement">
          Договор для Юридических лиц
        </Link>
        <Link className="mainLink" to="/individual-agreement">
          Договор для Физических лиц
        </Link>
      </div>
    </div>
  );
};

export default InnerPage;
