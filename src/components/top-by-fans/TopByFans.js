import React from "react";
import "./topbyfans.css";
import { Link } from "react-router-dom";

const TopByFans = ({ fans }) => {
  return (
    <Link className="link-by-fans" to={`/phone/${fans.slug}`}>
      <tr className="list-by-fans">
        <p>{fans.phone_name}</p>
        <p>{fans.favorites}</p>
      </tr>
    </Link>
  );
};

export default TopByFans;
