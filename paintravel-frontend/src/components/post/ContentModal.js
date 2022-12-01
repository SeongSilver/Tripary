import React, {useState, useEffect} from 'react';
import '../../styles/post/contentModal.scss';
import { Link } from "react-router-dom";

function ContentModal({contentModalStatus, setContentModalStatus, setContentModal, cityName }) {
  
  const [modalOpenAnimation, setModalOpenAnimation] = useState("50vh");
  const [modalOpenOpacity, setModalOpenOpacity] = useState("0");
  const [modalBg, setModalBg] = useState("rgba(0, 0, 0, 0.7)");
  useEffect(()=> {
    if(contentModalStatus) {
          setModalOpenAnimation("7.5vh");
          setModalOpenOpacity("1");
        }
	});
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const closeModal = () => {
    setModalOpenAnimation("50vh");
    setModalOpenOpacity("0");
    setContentModalStatus(false);
    setModalBg("transparent");
    setTimeout(() => {
      setContentModal(false);
      setModalBg("rgba(0, 0, 0, 0.7)");
    },200);
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="modalContainer" style={{background: `${modalBg}`}}>
      <div className="modalDiv" style={{top: `${modalOpenAnimation}`, opacity:`${modalOpenOpacity}`}}>
        <div className="modalHeader">
          <h1>{cityName}</h1>
          <h2>제목!!!! oo이랑 같이 다녀온 부산 여행~</h2>
          <Link to="#" onClick={closeModal}><span>닫기</span>x</Link>
        </div>
        <ul className="modalBody">
          <li><img src={require("../../img/login/loginBg.jpg")}/></li>
        </ul>
        <ol className="modalPagination">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </div>
    </div>
  );
}

export default ContentModal;
