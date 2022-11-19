import '../../styles/post/contentList.scss';

function ContentList({ test, setModalOpen, setTest }) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const closeModal = () => {
    setModalOpen(false);
    console.log('여기는되는거니?');
    setTest(!test);
    console.log(test);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="modalContainer">
      <div className="modalDiv">
        <div className="modalHeader">한국</div>
        <div className="modalContent">
          <div className="modalCard">
            <div className="modalImage">이미지</div>
            <div className="cardcontent1">서울</div>
            <hr />
            <div className="cardcontent2">글 1</div>
          </div>
          <div className="modalCard">
            <div className="modalImage">이미지</div>
            <hr />
            <div className="cardcontent1">강화</div>
            <div className="cardcontent2">글 1</div>
          </div>
          <div className="modalCard">
            <div className="modalImage">이미지</div>
            <hr />
            <div className="cardcontent1">속초</div>
            <div className="cardcontent2">글 1</div>
          </div>
          <div className="modalCard">
            <div className="modalImage">이미지</div>
            <hr />
            <div className="cardcontent1">글 1</div>
            <div className="cardcontent2">글 1</div>
          </div>
          <div className="modalCard">
            <div className="modalImage">이미지</div>
            <hr />
            <div className="cardcontent1">글 1</div>
            <div className="cardcontent2">글 1</div>
          </div>
          <div className="modalCard">
            <div className="modalImage">이미지</div>
            <hr />
            <div className="cardcontent1">글 1</div>
            <div className="cardcontent2">글 1</div>
          </div>
        </div>
        <div className="modalFooter">
          <button onClick={closeModal}>x</button>
        </div>
      </div>
    </div>
  );
}

export default ContentList;
