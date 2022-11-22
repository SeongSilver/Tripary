import '../../styles/post/contentList.scss';
import { Link } from "react-router-dom";


function ContentList({selectedCountry}) {
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
          <div className="contentImage"><div className="cardTag">서울</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage"><div className="cardTag">서울</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage"><div className="cardTag">서울</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage"><div className="cardTag">서울</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage"><div className="cardTag">서울</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage"><div className="cardTag">서울</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
        <div className="contentCard">
          <div className="contentImage"><div className="cardTag">서울</div><div>이미지</div></div>
          <div className="cardDate">2022-01-01 ~ 2022-12-31</div>
        </div>
      </div>
    </div>
  );
}

export default ContentList;
