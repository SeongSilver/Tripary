import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/post/postWrite.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDeleteForever } from "react-icons/md";
import { RiFolderAddFill } from "react-icons/ri";
import axios from "axios";

function PostWrite() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dateRange, setDateRange] = useState([null, null]);
  const [myfile, setMyFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [loginedId, setLoginedId] = useState();

  //Date 구조분해할당
  const [startDate, endDate] = dateRange;

  //[성은] 지구본에서 선택된 나라 이름 (22.11.23  20:32)
  const selectedCountry = location.state.selectedCountry;
  const nationCode = location.state.nationCode;

  //sessionStorage에 "LOGINED" 가 있는지 여부 확인할 변수
  const existsessionStorage = sessionStorage.getItem("LOGINEDID");

  const [post, setPost] = useState({
    title: "",
    country: "",
    nationCode: "",
    location: "",
    content: "",
    writer: "",
  });

  useLayoutEffect(() => {
    if (existsessionStorage) {
      setLoginedId(JSON.parse(sessionStorage.getItem("LOGINEDID")).value);
    }
  }, []);

  const onChangePost = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      writer: loginedId,
    });
  };

  //[야나] datePicker안에 키보드입력 방지
  const OnChangeRawHandler = (e) => {
    e.isImmediatePropagationEnabled = false;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  };

  const onLoadFile = (e) => {
    const files = e.target.files;
    //업로드한 파일을 미리보기로 보여주기 위한 과정
    if (files.length > 10) {
      e.preventDefault();
      alert("이미지 개수는 10개를 넘을 수 없습니다!");
      return;
    }
    //1. post 객체에 files 정보 담아주기
    setPost({
      ...post,
      writer: loginedId,
    });
    setMyFile([...files]);
    //2. 썸네일 생성을 위한 과정
    let imageUrlLists = [];
    for (let i = 0; i < files.length; i++) {
      const currentImageUrl = URL.createObjectURL(files[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setPreviewImg(imageUrlLists);
  };

  const deleteImage = (id) => {
    setPreviewImg(previewImg.filter((_, index) => index !== id));
    setMyFile(myfile.filter((_, index) => index !== id));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!post.title) {
      alert("제목을 입력하세요");
      return;
    }
    if (!post.location) {
      alert("위치를 입력하세요");
      return;
    }
    if (!startDate) {
      alert("일정이 시작하는 날짜를 입력하세요");
      return;
    }
    if (!endDate) {
      alert("일정이 끝나는 날짜를 입력하세요");
      return;
    }
    if (!post.content) {
      alert("내용을 입력하세요");
      return;
    }
    if (myfile.length === 0) {
      alert("사진을 한 장 이상 추가해주세요");
      return;
    }

    //[성은] formData 사용해서 서버로 데이터 보내기
    const formData = new FormData();

    //일반변수를 담기 위한 과정
    formData.append("title", post.title);
    formData.append("country", selectedCountry);
    formData.append("nationCode", nationCode);
    formData.append("location", post.location);
    formData.append("fromDate", startDate);
    formData.append("toDate", endDate);
    formData.append("content", post.content);
    formData.append("writer", post.writer);

    //[현아] fromData에 "myfile"라는 이름으로 각각의 사진 파일들을 하나씩 추가해줌.
    //    한번에 fileList로 추가할 경우, 백단에서 파일 업로드를 수행 할 수 없기 때문.
    for (let i = 0; i < myfile.length; i++) {
      formData.append("myfile", myfile[i]);
    }
    // [야나] 백단으로 보낼 데이터를 확인하기 위한 부분
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + typeof pair[1]);
    // }

    axios
      .post("/api/post/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("글 등록 성공!");
        window.location.assign("/");
      })
      .catch((err) => {
        alert("글 등록 실패!");
        console.log(err);
      });
  };

  const goMain = () => {
    navigate("/");
  };

  return (
    <div className="postWriteContainer">
      <div className="postWrite">
        <h1>{selectedCountry}'s Dairy</h1>
        <form className="postWriteWrap" encType="multipart/form-data">
          <div className="gallery">
            <h2>Gallery</h2>
            <div className="inputFileBtn">
              <label htmlFor="galleryUpload">
                <RiFolderAddFill aria-label="사진 추가하기" />
              </label>
              <input
                type="file"
                name="myfile"
                multiple={true}
                id="galleryUpload"
                onChange={onLoadFile}
                accept="image/jpg,image/png,image/jpeg,image/gif"
              />
            </div>
            <div className="galleryContainer">
              {previewImg.map((image, id) => (
                <div className="galleryImageContainer" key={id}>
                  <figure>
                    <img
                      src={image}
                      alt="업로드 이미지"
                      id={id}
                      onClick={(event) => console.dir(event.target)}
                    />
                  </figure>
                  <span onClick={() => deleteImage(id)} tabIndex="0">
                    <MdDeleteForever />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ul>
            <li>
              <label htmlFor="title">제목</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={onChangePost}
                placeholder="30자 내로 작성하세요"
                aria-label="30자 내로 작성하세요"
                maxLength="30"
              />
            </li>
            <li>
              <label htmlFor="location">위치</label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="예 ) 용산구 or 남산타워"
                onChange={onChangePost}></input>
            </li>
            <li>
              <label htmlFor="date">일정</label>
              <div>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  onChangeRaw={OnChangeRawHandler}
                  isClearable={true}
                  dateFormat="yyyy.MM.dd"
                  className="datePicker"
                  placeholderText="여행 기간 선택"
                  aria-label="여행 기간 선택"
                  id="date"
                />
              </div>
            </li>
            <li>
              <label htmlFor="content">일기</label>
              <textarea
                name="content"
                id="content"
                onChange={onChangePost}></textarea>
            </li>
          </ul>
          <div className="postWriteBtn">
            <button type="button" onClick={goMain}>
              메인으로
            </button>
            <button type="button" onClick={onSubmit}>
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostWrite;
