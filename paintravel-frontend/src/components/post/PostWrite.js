import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/post/postWrite.scss";
import { auth } from "../../_actions/user_actions";
import { postWrite } from "../../_actions/post_actions";
import axios from "axios";

function Postwrite() {
  const dispatch = useDispatch();
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
  const [currentId, setCurrentId] = useState("");
  const [post, setPost] = useState({
    title: "",
    country: "",
    nationCode: "",
    location: "",
    fromDate: "",
    toDate: "",
    content: "",
    myfile: "",
    writer: "",
  });
  useEffect(() => {
    dispatch(auth()).then((response) => {
      setCurrentId(response.payload._id);
    });
  }, []);
  const location = useLocation();
  //[성은] 지구본에서 선택된 나라 이름 (22.11.23  20:32)
  const selectedCountry = location.state.selectedCountry;
  const nationCode = location.state.nationCode;

  const [uploadImages, setUploadImages] = useState([]);
  const navigate = useNavigate();

  const onChangePost = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      writer: currentId,
    });
  };
  const onLoadFile = (e) => {
    const files = e.target.files;
    //업로드한 파일을 미리보기로 보여주기 위한 과정
    if (files.length > 4) {
      e.preventDefault();
      alert("이미지 개수는 4개를 넘을 수 없습니다!");
      return;
    }
    //1. post 객체에 files 정보 담아주기
    setPost({
      ...post,
      [e.target.name]: files,
      writer: currentId,
    });
    //2. 썸네일 생성을 위한 과정
    let imageUrlLists = [];
    for (let i = 0; i < files.length; i++) {
      const currentImageUrl = URL.createObjectURL(files[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setUploadImages(imageUrlLists);
  };

  const deleteImage = (id) => {
    setPost({
      ...post,
      [post.filesthumnails]: post.thumnails.filter((index) => index !== id),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(post.myfile[1])
    //[성은] formData 사용해서 서버로 데이터 보내기
    const formData = new FormData();
    //일반변수를 담기 위한 과정
    formData.append("title", post.title);
    formData.append("country", selectedCountry);
    formData.append("nationCode", nationCode);
    formData.append("location", post.location);
    formData.append("fromDate", post.fromDate);
    formData.append("toDate", post.toDate);
    formData.append("content", post.content);
    formData.append("writer", post.writer);
    //[현아] fromData에 "myfile"라는 이름으로 각각의 사진 파일들을 하나씩 추가해줌.
    //    한번에 fileList로 추가할 경우, 백단에서 파일 업로드를 수행 할 수 없기 때문.
    for (let i = 0; i < post.myfile.length; i++) {
      formData.append("myfile", post.myfile[i]);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }

    axios
      .post("/api/post/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res)
        alert("글 등록 성공!");
        //navigate("/")
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
            <a href="#galleryUpload">
              <span>사진 첨부 버튼</span>
              <label htmlFor="galleryUpload">+</label>
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
              {uploadImages.map((image, id) => (
                <div
                  className=""
                  key={id}
                  style={{ width: "100px", height: "75px", display: "block" }}>
                  <img src={image} alt={`${image} - ${id}`} />
                  <span onClick={deleteImage}>X</span>
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
              <input
                type="date"
                name="fromDate"
                onChange={onChangePost}></input>
              <span>~</span>
              <input type="date" name="toDate" onChange={onChangePost}></input>
            </li>
            <li>
              <p>일기</p>
              <textarea name="content" onChange={onChangePost}></textarea>
            </li>
          </ul>
          <div className="postWriteBtn">
            <button onClick={onSubmit}>등록</button>
            <button onClick={goMain}>메인으로</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Postwrite;