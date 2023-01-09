import React, {useState, useEffect, useLayoutEffect} from "react";
import GlobeMap from "../components/map/GlobeMap";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

function MapPage() {
  const dispatch = useDispatch();

   //로그인된 아이디 받아오는 state
   const [currentId, setCurrentId] = useState("");
   const [isLogined, setIsLogined] = useState();
 
   //로그인된 아이디 받아오는 useEffect
   useLayoutEffect(() => {
     dispatch(auth()).then((response) => {
       if (!response.payload.isAuth) {
         //로그인 안된 경우
         setIsLogined(false);
       } else {
         //로그인 된 경우
         setIsLogined(true);
       }
       setCurrentId(response.payload._id);

       //[현아, 성은] 기방문 국가 탐색을 위한 부분
      let visitedCountry = [];
      // const setVisitedCountry = (countryList) => {
      //   visitedCountry = countryList;
      //   console.log("fffffff"+visitedCountry);
      // } 
      if (isLogined) {
        console.log("로그인된 아이디", response.payload._id);
        axios
          .post("/api/post/getVisitedList", postData)
          .then(function(res) {
            visitedCountry = res.data.countryList;
            console.log("국가 탐색 성공"+visitedCountry);
        })
          .catch((err) => console.log("에러발생이어라" + err));
      }
     });
   }, []);
   //[ 성은 23.01.04 ] axios로 백엔드에 로그인된 아이디, 국가 코드 보내기
  const postData = {
    currentId: currentId,
  }; 
  
  return (
    <div>
      <Header />
      <GlobeMap visitedCountry={visitedCountry}/>
      <Footer />
    </div>
  );
}

export default MapPage;
