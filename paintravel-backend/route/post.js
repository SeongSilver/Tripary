const express = require("express");
const router = express.Router();
const multer = require("multer");
const { upload } = require("../middleware/multer");
//Post model 가져오기
const { Post } = require("../models/Post");
const bodyParser = require("body-parser");

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
  let post = await Post.find({
    writer: req.body.currentId,
    nationCode: req.body.selectCountry,
    _id: req.body.post_id,
  }).select();
  res.status(200).json({ postInfo: post });
});
module.exports = router;

//글 수정하기(Front : 글수정 기능을 위함)
router.post("/getPostEdit", upload.array("myfile"), async (req, res) => {
  console.log("글수정하러 옴");
  let postWriterInfo = await Post.find({ _id: req.body.post_id }).select(
    "writer"
  );
  if (postWriterInfo.writer === req.body.currentId) {
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
    return res
      .state(400)
      .json({
        postEditSuccess: false,
        errMessage: "작성자가 일치하지 않습니다",
      });
  }
});
module.exports = router;

//글 삭제하기(Front : 글삭제 기능을 위함)
router.post("/getPostDelete", async (req, res) => {
  console.log("글삭제하러 옴");
  let postWriterInfo = await Post.find({ _id: req.body.post_id }).select(
    "writer"
  );
  if (postWriterInfo.writer === req.body.currentId) {
    let post = await await Post.findByIdAndRemove(req.body.post_id).exec();
    if (!post) return res.state(400).json({ postDeleteSuccess: false });
    return res
      .status(200)
      .json({ postDeleteSuccess: true, errMessage: "DB데이터 수정 실패" });
  } else {
    return res
      .state(400)
      .json({
        postEditSuccess: false,
        errMessage: "작성자가 일치하지 않습니다",
      });
  }
});
module.exports = router;
