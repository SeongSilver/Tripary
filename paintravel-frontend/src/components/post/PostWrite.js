import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/post/postWrite.scss";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { auth } from "../../_actions/user_actions";

import { MdDeleteForever } from "react-icons/md";
import { RiFolderAddFill } from "react-icons/ri";

function Postwrite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //[성은] 지구본에서 선택된 나라 이름 (22.11.23  20:32)
  const selectedCountry = location.state.selectedCountry;
  const nationCode = location.state.nationCode;

  /*
    [성은 22.12.18, 22:14] 2개의 input date로는 서로 유효성 검사 찾는거보다
    다른 기능이 더 잘나와서 react-datepicker를 사용해서 기간을 지정할 수 있도록
    세팅하기 위한 start, end date설정
    */
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  /*
    [성은] useSelector 말고 useEffect를 쓰는 이유
    useSelector를 사용해서 state를 가져오면 리듀서에서 auth()가 실행되지 않은 상태에서는
    state에 값이 받아지지 않은 상태이고 그 정의가 안된 state의 값을 useState에 저장하려고하니
    undefined된 거시기를 담으려고 하니 에러가 발생하고 동기적으로 다음 코드들은 실행이 안된다

    useEffect로 컴포넌트가 처음 렌더링 될 때  dispatch로 auth()를 실행시켜서 리듀서 안에 있는
    auth에 포함된 미들웨어로 해당 정보에 대한 검증을 하고 response로 정보를 받는데 해당 정보는
    payload에 저장이 된다. useSelector는 가벼운 정보를 가져올 때는 사용해도 좋지만 민감한 정보는
    이렇게 검증이 필요한 미들웨어를 사용한 리듀서의 메서드를 사용해서 가져와서 사용하면 좋다
  */
  const [myfile, setMyFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);

  const [currentId, setCurrentId] = useState("");
  const [post, setPost] = useState({
    title: "",
    country: "",
    nationCode: "",
    location: "",
    content: "",
    writer: "",
  });

  useEffect(() => {
    dispatch(auth()).then((response) => {
      setCurrentId(response.payload._id);
    });
  }, []);

  const onChangePost = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      writer: currentId,
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
      writer: currentId,
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
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post("/api/post/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("글 등록 성공!");
        navigate("/");
      })
      .catch((err) => {
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
              {/* <input
                type="date"
                name="fromDate"
                onChange={onChangePost}></input>
              <span>~</span>
              <input type="date" name="toDate" onChange={onChangePost}></input> */}
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

export default Postwrite;
