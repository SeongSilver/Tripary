import React from "react";
import GlobeMap from "../components/map/GlobeMap";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function MapPage() {
  return (
    <div>
      <Header />
      <GlobeMap />
      <Footer />
    </div>
  );
}

export default MapPage;
