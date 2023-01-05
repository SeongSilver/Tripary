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

//글 리스트 가져오기
router.get("/getPostList", async (req, res) => {
    // console.log("현재 아이디" +req.currentId)
    let postList = await Post.find().where('name').equals(req.currentId);
    res.render("/", { postList });
})
module.exports = router;
