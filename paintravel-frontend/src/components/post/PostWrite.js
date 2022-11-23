import React , {useState, } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import "../../styles/post/postWrite.scss";

function Postwrite() {
  const location = useLocation();
  //[성은] 지구본에서 선택된 나라 이름 (22.11.23  20:32)
  const selectedCountry = location.state.selectedCountry;
  const [post, setPost] = useState({
    title:'',
    country:'',
    location:'',
    fromDate:'',
    toDate:'',
    content:'',
    files:'',
    writer:'',
  });
  const [uploadImages, setUploadImages] = useState([]);
  const navigate = useNavigate();

  const onChangePost = (e) => {
    setPost({
      ...post,
      [e.target.name]:e.target.value,
    })
  }
  const onLoadFile = (e) => {
    const files = e.target.files;
    //업로드한 파일을 미리보기로 보여주기 위한 과정
    if(files.length>4){
      e.preventDefault();
      alert("이미지 개수는 4개를 넘을 수 없습니다!");
      return;
    }
    //1. post 객체에 files 정보 담아주기
    setPost({
      ...post,
      [e.target.name]:files
    })
    //2. 썸네일 생성을 위한 과정
    let imageUrlLists = [];
    for (let i = 0; i < files.length; i++) {
      const currentImageUrl = URL.createObjectURL(files[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setUploadImages(imageUrlLists);
  }

  const deleteImage = (id) => {
    setPost({
      ...post,
      [post.filesthumnails]:post.thumnails.filter((index) => index !== id)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("서브밋이여")
  }

  const goMain = () => {
    navigate('/');
  }
  return (
  <div className="postWriteContainer">
    <div className="postWrite">
      <h1>Diary [{selectedCountry}]</h1>
      <form className="postWriteWrap">
        <div className="gallery">
          <h2>Gallery</h2>
          <label htmlFor="galleryUpload">+</label>
          <input type="file" name="file" multiple={true} id="galleryUpload" onChange={onLoadFile} accept="image/jpg,image/png,image/jpeg,image/gif"/>
          <div className="galleryContainer">
            {uploadImages.map((image, id) => (
              <div className="" key={id} style={{width:'100px', height:'75px', display:'block'}}>
                <img src={image} alt={`${image} - ${id}`}/>
                <span onClick={deleteImage} >X</span>
              </div>
            ))}
          </div>
        </div>
        <ul>
          <li>
            <p>제목</p>
            <input type="text" name='title' onChange={onChangePost}></input>
          </li>
          <li>
            <p>위치</p>
            <input type="text" name='location' onChange={onChangePost}></input>
          </li>
          <li>
            <p>일정</p>
            <input type="date" name='fromDate' onChange={onChangePost}></input>
            <span>~</span>
            <input type="date" name='toDate' onChange={onChangePost}></input>
          </li>
          <li>
            <p>일기</p>
            <textarea name='content' onChange={onChangePost}></textarea>
          </li>
        </ul>
        <div className="postWriteBtn">
          <span onClick={onSubmit}>등록</span>
          <span onClick={goMain}>메인으로</span>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Postwrite;