import React, { useState, useEffect } from "react";
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

  //localStorage에 "LOGINED" 가 있는지 여부 확인할 변수
  const existlocalStorage = localStorage.getItem("LOGINEDID");

  const [post, setPost] = useState({
    title: "",
    country: "",
    nationCode: "",
    location: "",
    content: "",
    writer: "",
  });

  useEffect(() => {
    if (existlocalStorage) {
      setLoginedId(JSON.parse(localStorage.getItem("LOGINEDID")).value);
    }
  }, []);

  const onChangePost = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      writer: loginedId,
    });
  };

  const onLoadFile = (e) => {
    const files = e.target.files;
    console.log(files);
    //업로드한 파일을 미리보기로 보여주기 위한 과정
    if (files.length > 4) {
      e.preventDefault();
      alert("이미지 개수는 4개를 넘을 수 없습니다!");
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
    if (!myfile) {
      alert("사진을 업로드하세요");
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

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + typeof pair[1]);
    }

    console.log(myfile);
    axios
      .post("/api/post/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("글 등록 성공!");
      })
      .then(navigate("/"))
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
            {/* <p>4 *3 이미지를 첨부해주세요</p> */}
            <a href="#galleryUpload">
              <span>사진 첨부 버튼</span>
              <label htmlFor="galleryUpload">
                <RiFolderAddFill />
              </label>
              <input
                type="file"
                name="myfile"
                multiple={true}
                id="galleryUpload"
                onChange={onLoadFile}
                accept="image/jpg,image/png,image/jpeg,image/gif"
              />
            </a>
            <div className="galleryContainer">
              {previewImg.map((image, id) => (
                <div className="galleryImageContainer" key={id}>
                  <img
                    src={image}
                    alt={`${image} - ${id}`}
                    id={id}
                    onClick={(event) => console.dir(event.target)}
                  />
                  <span onClick={() => deleteImage(id)}>
                    <MdDeleteForever />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ul>
            <li>
              <p>제목</p>
              <input type="text" name="title" onChange={onChangePost}></input>
            </li>
            <li>
              <p>위치</p>
              <input
                type="text"
                name="location"
                onChange={onChangePost}></input>
            </li>
            <li>
              <p>일정</p>
              {/**성은 22.12.18 23:22 : react-datePicker의 Date Range using input with clear button 사용*/}
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                dateFormat="yyyy-MM-dd"
                placeholderText="여행 기간 선택"
              />
            </li>
            <li>
              <p>일기</p>
              <textarea name="content" onChange={onChangePost}></textarea>
            </li>
          </ul>
          <div className="postWriteBtn">
            <button onClick={goMain}>메인으로</button>
            <button onClick={onSubmit}>등록</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostWrite;
