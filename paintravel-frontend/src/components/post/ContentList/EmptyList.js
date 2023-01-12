import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import '../../../styles/post/contentList/emptyList.scss';

function EmptyList({ selectedCountry, nationCode }) {
  console.log(nationCode)
  const [airplaneStyle, setAirplaneStyle] = useState({});
  useEffect (() => {
    document.querySelector(".emptyListContainer > a").addEventListener("mouseover", function(){
      setAirplaneStyle({transform:"scale(2) translate(50%, -40%)"});
    });
    document.querySelector(".emptyListContainer > a").addEventListener("mouseleave", function(){
      setAirplaneStyle({});
    });
  })
  return (
    <div className="emptyListContainer">
      <figure>
        <img src={require("../../../img/post/diary.png")} alt="다이어리 이미지" />
        <img className="airplane" style={airplaneStyle}
        src={require("../../../img/post/airplane.png")} alt="비행기 이미지" />
      </figure>
      <p>아직 여행 일지가 없어요 !</p>
      <Link
        to="/postwrite"
        state={{
          selectedCountry: selectedCountry,
          nationCode: nationCode,
        }}
      >
        다이어리 작성하기
      </Link>
    </div>
  )
}

export default EmptyList