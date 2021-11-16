import React from "react";
import "./favorite.css";
import { useStateContext } from "../../context/StateContextProvider";
import { Link } from "react-router-dom";
import { BsTrash, BsEye } from "react-icons/bs";
import Swal from "sweetalert";
import empty from "../../images/empty.png";
export const Favorite = () => {
  const { state, dispatch,setSearchInput } = useStateContext();

  const handleDeleteItem = (result) => {
    dispatch({ type: "DELETE_ITEM_FAVORITES", payload: result });
    Swal({ title: "Favorite item deleted successfully", icon: "success" });
  };
  const handleDeleteAll = (result) => {
    dispatch({ type: "DELETE_FAVORITES", payload: { ...result } });
    Swal({ title: " Favorites deleted successfully", icon: "success" });
  };
   const handleClickLink = ( ) => {
    setSearchInput('')
  }
  return (
    <>
      <div className="nav">
        <Link to="/" className="link-title" onClick={handleClickLink}>
        SevenPhones
        </Link>
      </div>
      <div className="header-favorites">
        <h2 className="fav"> Your Favorite : </h2>
        {state.favorites.favItems.length > 0 ? (
          <span onClick={() => handleDeleteAll(state?.favorites.favItems)}>
            <BsTrash />
            Delete All
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="wrapp-favorites">
        {state.favorites.favItems.length === 0 ? (
          <>
            <p>your favorite is empty.</p>
            <img width="60%" height="" src={empty} alt="images empty" />
          </>
        ) : (
          state?.favorites.favItems.map((result, index) => (
            <div className="card-favorites" key={index}>
              <img src={result.image} alt="images-favorites" />
              <h3>{result.phone_name}</h3>
              <p>{result.brand}</p>
              <Link to={`/phone/${result.slug}`} className="link-favorites">
                <span>
                  <BsEye /> View product
                </span>
              </Link>
              <span
                className="close"
                onClick={() => handleDeleteItem(result.slug)}
              >
                <BsTrash />
                Delete
              </span>
            </div>
          ))
        )}
      </div>
    </>
  );
};
