import '../../styles/post/contentList.scss';
import {Link} from 'react-router-dom';

function ContentList() {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="contentContainer">
      <div className="contentHeader">
        <div>한국</div>
        <div><Link to="/postwrite">Post</Link></div>
      </div>
      <div className="contentBody">
        <div className="contentCard">
          <div className="contentImage">이미지</div>
          <div className="cardcontent1">서울</div>
          <hr />
          <div className="cardcontent2">글 1</div>
        </div>
        <div className="contentCard">
          <div className="contentImage">이미지</div>
          <hr />
          <div className="cardcontent1">강화</div>
          <div className="cardcontent2">글 1</div>
        </div>
        <div className="contentCard">
          <div className="contentImage">이미지</div>
          <hr />
          <div className="cardcontent1">속초</div>
          <div className="cardcontent2">글 1</div>
        </div>
        <div className="contentCard">
          <div className="contentImage">이미지</div>
          <hr />
          <div className="cardcontent1">글 1</div>
          <div className="cardcontent2">글 1</div>
        </div>
        <div className="contentCard">
          <div className="contentImage">이미지</div>
          <hr />
          <div className="cardcontent1">글 1</div>
          <div className="cardcontent2">글 1</div>
        </div>
        <div className="contentCard">
          <div className="contentImage">이미지</div>
          <hr />
          <div className="cardcontent1">글 1</div>
          <div className="cardcontent2">글 1</div>
        </div>
      </div>
    </div>
  );
}

export default ContentList;
