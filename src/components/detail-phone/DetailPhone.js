import React, { useState, useEffect } from "react";
import "./detailphone.css";
import { useParams, Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContextProvider";

const DetailPhone = () => {
  const { slug } = useParams();
  const [detailPhone, setDetailPhone] = useState();
  const [loading, setLoading] = useState(false);
  const { state } = useStateContext();

  useEffect(() => {
    const getDetailPhone = async () => {
      try {
        setLoading(true);
        const resultDetail = await fetch(
          `https://api-mobilespecs.azharimm.site/v2/${slug}`
        );
        const detail = await resultDetail.json();
        setDetailPhone(detail);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getDetailPhone();
  }, []);

//   console.log(detailPhone);

  return (
    <>
      <div className="nav">
        <Link to="/" className="link-title">
          SevenPhones
        </Link>
        <Link
          to="/favorites"
          className="favorites"
          style={{ marginRight: "14px" }}
        >
          Favorites{" "}
          <div className="total-favorites">
            {state.favorites.favItems.length}
          </div>
        </Link>
      </div>
      <div className="container-detail">
        {loading ? (
          <p>loading...</p>
        ) : (
          <div className="brand">
            <img src={detailPhone?.data?.thumbnail} alt="img" />
            <div className="wrapp-fav">
              <h3>{detailPhone?.data?.brand}</h3>
              <h2>{detailPhone?.data?.phone_name}</h2>
              {/* <div className="fav" onClick={handleFavorite()}>
                Add Favorites
              </div> */}
            </div>
          </div>
        )}
        <div className="spesification">Spesification</div>
        <div className="list" id="cur">
          <table>
            <tbody>
              {loading ? (
                <tr><td>Loading...</td></tr>
              ) : (
                detailPhone?.data?.specifications?.map((title, index) => (
                  <tr key={index}>
                    <td className="title">{title.title}</td>
                    <td className="key">
                      {title.specs.map((key, index) => (
                        <div key={index} className="wrapper-key">
                          <span className="keys">{key.key} </span>
                          <span className="titik"> : </span>
                          <span className="val"> {key.val}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DetailPhone;