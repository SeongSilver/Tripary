import React, {useState} from 'react';
import { Link } from "react-router-dom";
import ContentModal from './ContentModal';
import '../../styles/post/contentList.scss';


function ContentList({selectedCountry}) {
  const [contentModal, setContentModal] = useState(false);
  const [cityName, setCityName] = useState("서울인건가");

  const openContentModal = (event) => {
    setContentModal(true);
    //해당 게시물의 디테일 정보를 가져올 get 연동 할 것들
    //axios.get(어쩌고 저쩌고)
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="contentContainer">
      <h1>다이어리 리스트</h1>
      <div className="contentHeader">
        <h2 className="selectedCountry">{selectedCountry}</h2>
        <Link to="/postwrite" className="postButton">
          <span>다이어리 추가</span>+
        </Link>
      </div>
      <ul className="contentBody">
        <li className="contentCard">
            <span className="cardTag">서울에서 얼마나 길어지는지 태에ddd에에그</span>
            <div>
              {/* 수빈 - img 불러올 때 img 태그에 alt="자세히 보기" 적어주세요! */}
              <img className="contentImage" src={require("../../img/login/loginBg.jpg")} alt="자세히 보기"/>
            </div>
            <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
        </li>
        <li className="contentCard">
            <span className="cardTag">서울</span>
            <div>
              <img className="contentImage" src={require("../../img/login/loginBg.jpg")} alt="자세히 보기"/>
            </div>
            <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
        </li>
        <li className="contentCard">
            <span className="cardTag">서울</span>
            <div>
              <img className="contentImage" src={require("../../img/login/loginBg.jpg")} alt="자세히 보기"/>
            </div>
            <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
        </li>
        <li className="contentCard">
            <span className="cardTag">서울</span>
            <div>
              <img className="contentImage" src={require("../../img/login/loginBg.jpg")} alt="자세히 보기"/>
            </div>
            <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
        </li>
        <li className="contentCard">
            <span className="cardTag">서울</span>
            <div>
              <img className="contentImage" src={require("../../img/login/loginBg.jpg")} alt="자세히 보기"/>
            </div>
            <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
        </li>
        <li className="contentCard">
            <span className="cardTag">서울</span>
            <div>
              <img className="contentImage" src={require("../../img/login/loginBg.jpg")} alt="자세히 보기"/>
            </div>
            <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
        </li>
        <li className="contentCard">
            <span className="cardTag">서울</span>
            <div>
              <img className="contentImage" src={require("../../img/login/loginBg.jpg")} alt="자세히 보기"/>
            </div>
            <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
        </li>
      </ul>
      {contentModal && <ContentModal className="contentModal" setContentModal={setContentModal} cityName={cityName}/>}
    </div>
  );
}

export default ContentList;
