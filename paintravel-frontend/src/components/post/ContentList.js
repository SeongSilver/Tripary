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
      <div className="contentHeader">
        <div className="selectedCountry">{selectedCountry}</div>
        <div className="postButton"><Link to="/postwrite"><span>+</span></Link></div>
      </div>
      <div className="contentBody">
        <div className="contentCard">
          <div className="contentImage" onClick={openContentModal}><div className="cardTag">{cityName}</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage" onClick={openContentModal}><div className="cardTag">{cityName}</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage" onClick={openContentModal}><div className="cardTag">{cityName}</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage" onClick={openContentModal}><div className="cardTag">{cityName}</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage" onClick={openContentModal}><div className="cardTag">{cityName}</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage" onClick={openContentModal}><div className="cardTag">{cityName}</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage" onClick={openContentModal}><div className="cardTag">{cityName}</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
      </div>
      {contentModal && <ContentModal className="contentModal" setContentModal={setContentModal} cityName={cityName}/>}
    </div>
  );
}

export default ContentList;
