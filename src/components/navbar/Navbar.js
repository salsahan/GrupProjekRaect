import React, { useState } from "react";
import "./navbar.css";
import { useStateContext } from "../../context/StateContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";



const Navbar = () => { 
  const [search, setSearch] = useState("");
  const { setSearchInput, state, setResult, searchInput } =
    useStateContext(search);
  const navigate = useNavigate();
  const handleSearch = () => {
    if(searchInput){
      setResult("")
    }
    setSearchInput(search);
    // setResult("");
  };
  const handleReset = () => {
    setSearch("");
    setSearchInput("");
    navigate("/");
  };
  return (
    <div className="nav">
      <Link className="link-title" to="/" onClick={handleReset}>
        SevenPhones
      </Link>
      <Link to="/favorites" className="favorites">
        Favorites{" "}
        <div className="total-favorites">{state.favorites.favItems.length}</div>
      </Link>
      <div className="wrapp-search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your phone"
        />
        {search ? (
          <p className="handleReset" onClick={handleReset}>
            <GrClose />
          </p>
        ) : (
          ""
        )}
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Navbar;
