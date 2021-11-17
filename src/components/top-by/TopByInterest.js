import React from "react";
import "./topby.css";
import { Link } from "react-router-dom";

const TopByInterest = ({ interest }) => {
  // console.log(interest);
  return (
    <Link to={`/phone/${interest.slug}`} className="link-top">
      <tr className="list">
        <td>{interest.phone_name}</td>
        <td>{interest.hits}</td>
      </tr>
    </Link>
  );
};

export default TopByInterest;
