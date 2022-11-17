import React from "react";
import GlobeMap from "../components/map/GlobeMap";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Main from "../components/main/Main";

function MainPage() {
  return (
    <div>
      <Header />
      <Main />
      <GlobeMap />
      <Footer />
    </div>
  );
}

export default MainPage;
