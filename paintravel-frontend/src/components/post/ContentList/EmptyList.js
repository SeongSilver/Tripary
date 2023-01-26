import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import '../../../styles/post/contentList/emptyList.scss';

function EmptyList({ selectedCountry, nationCode }) {
  const [penStyle, setPenStyle] = useState({});
  useEffect (() => {
    document.querySelector(".emptyListContainer > a").addEventListener("mouseover", function(){
      setPenStyle({animation:"penShake 1s infinite, penMoving 3s infinite"});
    });
    document.querySelector(".emptyListContainer > a").addEventListener("mouseleave", function(){
      setPenStyle({});
    });
  });
  return (
    <div className="emptyListContainer">
      <figure>
        <img src={require("../../../img/post/diary.png")} alt="다이어리 이미지" />
        <img className="airplane" style={penStyle}
        src={require("../../../img/post/diaryPen.png")} alt="비행기 이미지" />
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