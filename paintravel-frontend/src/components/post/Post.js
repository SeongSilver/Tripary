import React , {useState, } from "react";
import "../../styles/post/postWrite.scss";
import {useNavigate} from 'react-router-dom';

function Post() {
  const [post, setPost] = useState({
    location:'',
    fromDate:'',
    toDate:'',
    content:'',
    files:'',
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
    if(files.length>4){
      e.preventDefault();
      alert("이미지 개수는 4개를 넘을 수 없습니다!");
      return;
    }
    let imageUrlLists = [...post.files];

    for (let i = 0; i < files.length; i++) {
      const currentImageUrl = URL.createObjectURL(files[i]);
      imageUrlLists.push(currentImageUrl);
    }

    setPost({
      ...post,
      [post.files]:imageUrlLists
    })
    setUploadImages(imageUrlLists);
  }

  const deleteImage = (id) => {
    setPost({
      ...post,
      [post.files]:post.files.filter((index) => index !== id)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(post);
  }

  const goMain = () => {
    navigate('/');
  }
  return (
  <div className="postWriteContainer">
    <div className="postWrite">
      <h1>Diary</h1>
      <form className="postWriteWrap">
        <div className="gallery">
          <h2>Gallery</h2>
          <label htmlFor="galleryUpload">+</label>
          <input type="file" multiple={true} id="galleryUpload" onChange={onLoadFile} accept="image/jpg,image/png,image/jpeg,image/gif"/>
          <div className="galleryContainer">
            {uploadImages.map((image, id) => (
              <div key={id} style={{width:'100px', height:'75px', display:'block'}}>
                <img src={image} alt={`${image} - ${id}`}/>
                <span onClick={deleteImage} >X</span>
              </div>
            ))}
          </div>
        </div>
        <ul>
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

export default Post;
