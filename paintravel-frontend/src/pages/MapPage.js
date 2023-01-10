import React, {useState, useEffect, useLayoutEffect} from "react";
import GlobeMap from "../components/map/GlobeMap";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

function MapPage() {
  return (
    <div>
      <Header />
      <GlobeMap/>
      <Footer />
    </div>
  );
}

export default MapPage;
