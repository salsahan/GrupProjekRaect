import React, { createContext, useState, useContext, useReducer } from "react";

const StateContext = createContext();

const initialState = {
  favorites: {
    favItems: localStorage.getItem("favItems")
      ? JSON.parse(localStorage.getItem("favItems"))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITES": {
      const newItem = action.payload;
      const existItem = state.favorites.favItems.find(
        (result) => result.slug === newItem.slug
      );

      const favItems = existItem
        ? state.favorites.favItems.map((result) =>
            result.slug === existItem.slug ? newItem : result
          )
        : [...state.favorites.favItems, newItem];
      localStorage.setItem("favItems", JSON.stringify(favItems));
      return { ...state, favorites: { ...state.favorites, favItems } };
    }
    case "DELETE_ITEM_FAVORITES": {
      const favItems = state.favorites.favItems.filter(
        (result) => result.slug !== action.payload
      );
      localStorage.setItem("favItems", JSON.stringify(favItems));
      return { ...state, favorites: { ...state.favorites, favItems } };
    }
    case "DELETE_FAVORITES":
      localStorage.removeItem("favItems");
      return { ...state, favorites: { ...state.favorites, favItems: [] } };
    // return { ...state.favorites, favorites: action.payload };
    default:
      return state;
  }
};

const StateContextProvider = ({ children }) => {
  const [results, setResult] = useState();
  const [searchInput, setSearchInput] = useState();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getBrands = async (query) => {
    try {
      setLoading(true);
      const resultBrands = await fetch(
        "https://api-mobilespecs.azharimm.site/v2/brands"
      );
      const resultJson = await resultBrands.json();
      setLoading(false);

      let slug = null;
      resultJson?.data?.map((brand) => {
        if (brand.brand_name.toLowerCase() === query.toLowerCase()) {
          slug = brand.brand_slug;
        }
      });

      if (slug !== null) {
        setLoading(true);
        const brandSlug = await fetch(
          `https://api-mobilespecs.azharimm.site/v2/brands/${slug}`
        );
        const brandJson = await brandSlug.json();

        setResult(brandJson);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StateContext.Provider
      value={{
        results,
        setResult,
        getBrands,
        searchInput,
        setSearchInput,
        loading,
        state,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;

export const useStateContext = () => useContext(StateContext);
