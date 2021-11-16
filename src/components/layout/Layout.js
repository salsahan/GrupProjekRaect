import React, { useState, useEffect } from "react";
import "./layout.css";
import Phone from "./../phone/Phone";
import TopByInterest from "./../top-by-interest/TopByInterest";
import TopByFans from "./../top-by-fans/TopByFans";
import Brands from "./../brands/Brands";
import xiaomi from "../../images/Xiaomi.jpeg";
import { useStateContext } from "../../context/StateContextProvider";
import { Link, useNavigate } from "react-router-dom";
const Layout = () => {
  const [topByInterest, setTopByInterest] = useState();
  const [topByFans, setTopByFans] = useState();
  const [latestDevice, setLatestDevice] = useState();
  const { searchInput } = useStateContext();
  const navigate = useNavigate();

  // top by interest
  useEffect(() => {
    const getTopByInterest = async () => {
      try {
        const resultInterest = await fetch(
          "https://api-mobilespecs.azharimm.site/v2/top-by-interest"
        );
        const interestJson = await resultInterest.json();
        setTopByInterest(interestJson);
      } catch (err) {
        console.log(err);
      }
    };
    getTopByInterest();
  }, []);

  // top by fans
  useEffect(() => {
    const getTopByFans = async () => {
      try {
        const resultFans = await fetch(
          "https://api-mobilespecs.azharimm.site/v2/top-by-fans"
        );
        const fansJson = await resultFans.json();
        setTopByFans(fansJson);
      } catch (err) {
        console.log(err);
      }
    };
    getTopByFans();
  }, []);

  // latest device
  useEffect(() => {
    const getLatestDevice = async () => {
      try {
        const resultLatest = await fetch(
          "https://api-mobilespecs.azharimm.site/v2/latest"
        );
        const latestJson = await resultLatest.json();
        setLatestDevice(latestJson);
      } catch (err) {
        console.log(err);
      }
    };
    getLatestDevice();
  }, []);
  if (searchInput) {
    return <Brands />;
  } else {
    return (
      <div className="container">
        {/* /sidebar */}
        <div className="left">
          <div className="daily-interest">
            <table>
              <thead className="title">Top By Daily Interest</thead>
              <tbody>
                <tr className="phone">
                  <p>Phone Name</p>
                  <p>Hits</p>
                </tr>
                {topByInterest?.data?.phones?.map((interest) => (
                  <TopByInterest interest={interest} key={interest.slug} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="fans">
            <table>
              <thead className="title">Top By Fans</thead>
              <tbody>
                <tr className="phone">
                  <p>Phone Name</p>
                  <p>Favorites</p>
                </tr>
                {topByFans?.data?.phones?.map((fans, index) => (
                  <TopByFans fans={fans} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* end sidebar */}
        <div className="right">
          <div className="thumbnail">
            <div className="thumbnail-left">
              <Link to="/phone/xiaomi_redmi_note_11_pro-11159">
                <img src={xiaomi} alt="xiaomi" />
                <p>Xiamoi Review</p>
              </Link>
            </div>
            <div className="thumbnail-right">
              <Link to="/phone/apple_iphone_13_pro_max-11089" className="top">
                <img
                  src="https://cdn.pocket-lint.com/r/s/970x/assets/images/158444-phones-review-apple-iphone-13-review-images-image1-clh15n2ocg.jpg"
                  alt="samsung"
                />
                {/* apple_iphone_13_pro_max-11089 */}
                <p>Iphone 12 Review</p>
              </Link>
              <Link to="/phone/oppo_k9s-11151" className="bottom">
                <img
                  src="https://im.indiatimes.in/content/2021/Oct/Article-Body---2021-10-01T131920305_6156bdaed77ca.jpg"
                  class="card-img"
                  alt="images"
                />
                {/* oppo_k9s-11151 */}
                <p>Oppo Review</p>
              </Link>
            </div>
          </div>
          <div className="section-latest">Latest Device</div>
          <div className="phone-component">
            {latestDevice?.data?.phones?.map((device, index) => (
              <Phone device={device} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Layout;
