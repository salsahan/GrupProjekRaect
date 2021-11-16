import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Layout from "./components/layout/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import DetailPhone from "./components/detail-phone/DetailPhone";
import { Favorite } from "./components/favorites/Favorite";
import Brands from "./components/brands/Brands";
import { useStateContext } from "./context/StateContextProvider";

const Routing = () => {
  const { searchInput } = useStateContext();
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Layout />
          </>
        }
      />
      <Route
        path="/phone/:slug"
        element={
          <>
            <DetailPhone />
          </>
        }
      />
      {/* <Route
        path="/search"
        element={
          <>
            <Navbar />
            {searchInput ? <Brands /> : ""}
          </>
        }
      /> */}

      <Route path="/favorites" element={<Favorite />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
