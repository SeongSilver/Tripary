import "../../styles/common/modal.scss";

const Modal = ({ test, setModalOpen, setTest }) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const closeModal = () => {
    setModalOpen(false);
    console.log("여기는되는거니?");
    setTest(!test);
    console.log(test);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className="modalContainer">
      <div className="modalDiv">
        <button onClick={closeModal}>x</button>모달 내용
      </div>
    </div>
  );
};

export default Modal;
