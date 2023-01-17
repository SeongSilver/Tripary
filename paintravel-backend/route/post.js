const express = require("express");
const router = express.Router();
const multer = require("multer");
const { upload } = require("../middleware/multer");
//Post model 가져오기
const { Post } = require("../models/Post");
const bodyParser = require("body-parser");
const fs = require("fs");

function deletePhoto(file_name) {
  console.log("파일 삭제하러 옴");
  if (fs.existsSync("paintravel-frontend/public/upload/" + file_name)) {
    // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
    try {
      fs.unlinkSync("paintravel-frontend/public/upload/" + file_name);
      console.log("image delete 성공!");
    } catch (error) {
      console.log(error);
    }
  }
}

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/upload", upload.array("myfile"), (req, res) => {
  //받아온 값들을 post모델에 저장
  const post = new Post(req.body);
  //파일의 경우, 파일명(filename)을 저장하는것으로 설정. path를 저장하고 싶은 경우, req.files.path사용하는것으로 변경 가능
  for (i = 0; i < req.files.length; i++) {
    post.file[i] = req.files[i].filename;
  }

  post.save((err, postInfo) => {
    if (err) return res.state(400).json({ postWriteSuccess: false, err });
    return res.status(200).json({
      postWriteSuccess: true,
      postInfo: postInfo,
    });
  });
});

//방문 국가 가져오기
router.post("/getVisitedList", async (req, res) => {
  if (req.body.currentId === undefined) {
  } else {
    let postList = await Post.find({ writer: req.body.currentId }).select(
      "nationCode"
    );
    let countryList = [];
    for (i in postList) {
      if (postList[i].nationCode) {
        countryList.push(postList[i].nationCode);
      }
    }
    console.log("현재 아이디가 글 쓴 국가" + countryList);
    res.status(200).json({ countryList: countryList });
  }
});

//글 리스트 가져오기
router.post("/getPostList", async (req, res) => {
  let post = await Post.find({
    writer: req.body.currentId,
    nationCode: req.body.selectCountry,
  }).select();
  let postList = [];
  for (i in post) {
    if (post[i].nationCode) {
      postList.push(post[i]);
    }
  }
  res.status(200).json({ postList: postList });
});
module.exports = router;

//글 가져오기(Front : 모달창, 글수정페이지 정보 전달 위함. 따라서 리스트에서 특정 게시글을 클릭하거나, 글수정 창을 띄울 시에 _id라고 프론트에 기존에 전달된 값을 'post_id'라는 값에 담아서 넘겨줘야 함)
router.post("/getPostInfo", async (req, res) => {
  console.log("게시글 정보 찾으러 옴");
  let postList = [];
  console.log(req.body.currentId);
  console.log(req.body._id);
  let post = await Post.find({
    writer: req.body.currentId,
    _id: req.body.post_id,
  }).select();
  for (i in post) {
    postList.push(post[i]);
  }
  res.status(200).json({ postInfo: postList });
});
module.exports = router;

//글 수정하기(Front : 글수정 기능을 위함)
router.post("/getPostEdit", upload.array("myfile"), async (req, res) => {
  console.log("글수정하러 옴");
  let postWritedInfo = await Post.find({ _id: req.body.post_id }).select(
    "writer file"
  );
  if (postWritedInfo.writer === req.body.currentId) {
    for (i = 0; i < postWriterInfo.file.length; i++) {
      console.log("삭제할 파일 리스트 [" + postWriterInfo.file + "]");
      if (postWriterInfo.file[i]) {
        console.log("현재 삭제할 파일 : " + postWritedInfo.file[i]);
        deletePhoto(postWritedInfo.file[i]);
      }
    }
    const editedPost = new Post(req.body);
    //파일의 경우, 파일명(filename)을 저장하는것으로 설정. path를 저장하고 싶은 경우, req.files.path사용하는것으로 변경 가능
    for (i = 0; i < req.files.length; i++) {
      editedPost.file[i] = req.files[i].filename;
    }
    let post = await Post.findByIdAndUpdate(req.body.post_id, editedPost, {
      new: true,
    }).exec();
    if (!post)
      return res
        .state(400)
        .json({ postEditSuccess: false, errMessage: "DB데이터 수정 실패" });
    return res.status(200).json({
      postEditSuccess: true,
      editedPostInfo: post,
    });
  } else {
    return res.state(400).json({
      postEditSuccess: false,
      errMessage: "작성자가 일치하지 않습니다",
    });
  }
});
module.exports = router;

//글 삭제하기(Front : 글삭제 기능을 위함)
router.post("/getPostDelete", async (req, res) => {
  console.log("글삭제하러 옴");
  let postWritedInfo = await Post.find({ _id: req.body.post_id }).select(
    "writer file"
  );
  if (postWriterInfo.writer === req.body.currentId) {
    for (i = 0; i < postWriterInfo.file.length; i++) {
      console.log("삭제할 파일 리스트 [" + postWriterInfo.file + "]");
      if (postWriterInfo.file[i]) {
        console.log("현재 삭제할 파일 : " + postWritedInfo.file[i]);
        deletePhoto(postWritedInfo.file[i]);
      }
    }
    let post = await await Post.findByIdAndRemove(req.body.post_id).exec();
    if (!post) return res.state(400).json({ postDeleteSuccess: false });
    return res
      .status(200)
      .json({ postDeleteSuccess: true, errMessage: "DB데이터 수정 실패" });
  } else {
    return res.state(400).json({
      postEditSuccess: false,
      errMessage: "작성자가 일치하지 않습니다",
    });
  }
});
module.exports = router;

//Mypage
router.post("/getMypage", async (req, res) => {
  let postList = await Post.find({ writer: req.body.currentId }).select();
  res.status(200).json({ postList: postList });
});
module.exports = router;
