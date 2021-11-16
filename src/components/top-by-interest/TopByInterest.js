import React from "react";
import "./topbyinterest.css";
import { Link } from "react-router-dom";

const TopByInterest = ({ interest }) => {
  console.log(interest);
  return (
    <tr className="list-interest">
      <Link to={`/phone/${interest.slug}`} className="link-interest">
        <p>{interest.phone_name}</p>
        <p>{interest.hits}</p>
      </Link>
    </tr>
  );
};

export default TopByInterest;
