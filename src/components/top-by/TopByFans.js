import React from "react";
import "./topby.css";
import { Link } from "react-router-dom";

const TopByFans = ({ fans }) => {
  return (
    <Link className="link-top" to={`/phone/${fans.slug}`}>
      <tr className="list">
        <td>{fans.phone_name}</td>
        <td>{fans.favorites}</td>
      </tr>
    </Link>
  );
};

export default TopByFans;
