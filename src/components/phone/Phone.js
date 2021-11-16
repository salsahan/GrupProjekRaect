import React from "react";
import { Link } from "react-router-dom";
import "./phone.css";
import { useStateContext } from "../../context/StateContextProvider";
import Swal from "sweetalert";

const Phone = ({ device }) => {
  const { dispatch } = useStateContext();
  const handleFav = (device) => {
    dispatch({ type: "ADD_FAVORITES", payload: { ...device } });
    Swal({ title: "success added to favorites", icon: "success" });
  };
  return (
    <div className="wrapp-phone">
      <Link className="link" to={`/phone/${device.slug}`}>
        <img src={device.image} alt="phone" />
        <p>{device.phone_name}</p>
      </Link>
      <div className="fav-phone-latest" onClick={() => handleFav(device)}>
        Add To Favorites
      </div>
    </div>
  );
};

export default Phone;
