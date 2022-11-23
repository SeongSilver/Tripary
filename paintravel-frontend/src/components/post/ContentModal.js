import '../../styles/post/contentModal.scss';

function ContentModal({ setContentModal, cityName }) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const closeModal = () => {
    setContentModal(false);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="modalContainer">
      <div className="modalDiv">
        <div className="modalHeader">{cityName}<span onClick={closeModal}>x</span></div>
        <div className="modalBody"></div>
        <div className="modalFooter">
          
        </div>
      </div>
    </div>
  );
}

export default ContentModal;
