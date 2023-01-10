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
  if (req.body.currentId == undefined) {
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
    res.status(200).json({ countryList: countryList }); //잘 보내줬음....
  }
});


//글 리스트 가져오기
router.post("/getPostList", async (req, res) => {
  if (req.body.currentId == undefined) {
  } else {
    let post = await Post.find({ writer: req.body.currentId }).select(
    );
    let postList = [];
    for (i in post) {
      if (post[i].nationCode) {
        postList.push(post[i].nationCode);
      }
    }
    console.log("현재 아이디가 쓴 글" + postList);
    res.status(200).json({ postList: postList }); //잘 보내줬음....
  }
});
module.exports = router;
