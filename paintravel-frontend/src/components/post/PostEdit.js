import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";

import "../../styles/post/postEdit.scss";
import "react-datepicker/dist/react-datepicker.css";

import { MdDeleteForever } from "react-icons/md";
import { RiFolderAddFill } from "react-icons/ri";

function PostEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const [editResData, setEditResData] = useState();
  const [editFromDate, setEditFromDate] = useState();
  const [editToDate, setEditToDate] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [myFile, setMyFile] = useState([]);
  const [editFile, setEditFile] = useState([]);
  const [previewImg, setPreviewImg] = useState();
  const [loginedId, setLoginedId] = useState();
  const [editDeleteFile, setEditDeleteFile] = useState([]);
  //유효성 검사를 위한 state
  const [post, setPost] = useState({});

  const editSelectedCountry = location.state.selectedCountry;
  const editNationCode = location.state.nationCode;
  const edit_id = location.state._id;
  const editWriter = location.state.writer;

  //localStorage에 "LOGINED" 가 있는지 여부 확인할 변수
  const existlocalStorage = localStorage.getItem("LOGINEDID");

  useLayoutEffect(() => {
    if (existlocalStorage) {
      setLoginedId(JSON.parse(localStorage.getItem("LOGINEDID")).value);
    }

    const editData = {
      currentId: editWriter,
      post_id: edit_id,
    };
    axios
      .post("/api/post/getPostInfo", editData)
      .then((response) => {
        setEditResData(response.data.postInfo[0]);
        for (let i = 0; i < response.data.postInfo.length; i++) {
          if (editData.post_id === response.data.postInfo[i]._id) {
            setPost({
              title: response.data.postInfo[i].title,
              country: response.data.postInfo[i].country,
              nationCode: response.data.postInfo[i].nationCode,
              location: response.data.postInfo[i].location,
              content: response.data.postInfo[i].content,
              writer: response.data.postInfo[i].writer,
            });
            setEditFromDate(response.data.postInfo[i].fromDate);
            setEditToDate(response.data.postInfo[i].toDate);
            setEditFile([...response.data.postInfo[i].file]);
          }
        }
      })
      .catch((error) => {
        console.log("기존에 등록된 글을 가져오는데 에러 발생" + error);
      });
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
    //기존에 등록했던 사진들 전부, 삭제할 리스트에 추가
    for (let i = 0; i < editFile.length; i++) {
      editDeleteFile.push(editFile[i]);
    }
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
    let imageUrlLists = myFile;
    for (let i = 0; i < files.length; i++) {
      const currentImageUrl = URL.createObjectURL(files[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setPreviewImg(imageUrlLists);
    setEditFile([]);
  };

  const deleteEditImage = (image, id) => {
    editDeleteFile.push(image);
    setEditFile(editFile.filter((data) => data !== image));
  };

  const deleteImage = (id) => {
    setPreviewImg(previewImg.filter((_, index) => index !== id));
    setMyFile(myFile.filter((_, index) => index !== id));
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
    if (!post.content) {
      alert("내용을 입력하세요");
      return;
    }
    if (editFile.length === 0 && myFile.length === 0) {
      alert("사진을 한 장 이상 추가해주세요");
      return;
    }

    //[성은] formData 사용해서 서버로 데이터 보내기
    const formData = new FormData();

    //일반변수를 담기 위한 과정
    formData.append("post_id", edit_id);
    formData.append("currentId", loginedId);
    formData.append("title", post.title);
    formData.append("country", editSelectedCountry);
    formData.append("nationCode", editNationCode);
    formData.append("location", post.location);
    if (dateRange[0] !== null) {
      formData.append("fromDate", startDate);
      formData.append("toDate", endDate);
    } else {
      formData.append("fromDate", editFromDate);
      formData.append("toDate", editToDate);
    }
    formData.append("content", post.content);
    formData.append("writer", post.writer);
    //삭제해야할 이미지 리스트
    if (editDeleteFile.length !== 0) {
      formData.append("editDeleteFile", editDeleteFile);
    }
    //[현아] fromData에 "myFile"라는 이름으로 각각의 사진 파일들을 하나씩 추가해줌.
    //    한번에 fileList로 추가할 경우, 백단에서 파일 업로드를 수행 할 수 없기 때문.
    if (editFile.length !== 0) {
      formData.append("file", editFile);
    }
    if (myFile !== []) {
      for (let i = 0; i < myFile.length; i++) {
        formData.append("myFile", myFile[i]);
      }
    }
    // [야나] 백으로 보낼 데이터 확인하기 위한 부분
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    axios
      .post("/api/post/getPostEdit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("글 수정 성공!");
        window.location.assign("/");
      })
      .catch((err) => {
        console.log("글 수정 실패" + err);
      });
  };

  const goMain = () => {
    navigate("/");
  };

  return (
    <>
      {editResData ? (
        <div className="postEditContainer">
          <div className="postEdit">
            <h1>{editSelectedCountry}'s Dairy</h1>
            <form className="postEditWrap" encType="multipart/form-data">
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
                    name="myFile"
                    multiple={true}
                    id="galleryUpload"
                    onChange={onLoadFile}
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                  />
                </a>
                <div className="galleryContainer">
                  {previewImg !== undefined
                    ? previewImg.map((image, id) => (
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
                      ))
                    : editFile.map((image, id) => (
                        <div className="galleryImageContainer" key={id}>
                          <img
                            src={`/upload/${image}`}
                            alt={`${image} - ${id}`}
                            id={id}
                            onClick={(event) => console.dir(event.target)}
                          />
                          <span onClick={() => deleteEditImage(image, id)}>
                            <MdDeleteForever />
                          </span>
                        </div>
                      ))}
                </div>
              </div>
              <ul>
                <li>
                  <p>제목</p>
                  <input
                    type="text"
                    name="title"
                    onChange={onChangePost}
                    defaultValue={editResData.title}
                    placeholder="30자 내로 작성하세요"
                    maxLength="30"
                  />
                </li>
                <li>
                  <p>위치</p>
                  <input
                    type="text"
                    name="location"
                    onChange={onChangePost}
                    defaultValue={editResData.location}
                  />
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
                    placeholderText={
                      new Date(editFromDate).toLocaleDateString() +
                      "~" +
                      new Date(editToDate).toLocaleDateString()
                    }
                  />
                </li>
                <li>
                  <p>일기</p>
                  <textarea
                    name="content"
                    onChange={onChangePost}
                    defaultValue={editResData.content}></textarea>
                </li>
              </ul>
              <div className="postEditBtn">
                <button onClick={goMain}>메인으로</button>
                <button onClick={onSubmit}>등록</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PostEdit;
