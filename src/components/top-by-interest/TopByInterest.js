import React from "react";
import "./topbyinterest.css";
import { Link } from "react-router-dom";

const TopByInterest = ({ interest }) => {
  // console.log(interest);
  return (
    <Link to={`/phone/${interest.slug}`} className="link-interest">
      <tr className="list-interest">
        <td>{interest.phone_name}</td>
        <td>{interest.hits}</td>
      </tr>
    </Link>
  );
};

export default TopByInterest;
