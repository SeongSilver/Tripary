const express = require('express');
const router = express.Router();
const { upload } = require("../middleware/multer")
//Post model 가져오기
const { Post } = require("../models/Post");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/write", (req,res, next) => {
    const post = new Post(req.body);
    
})
module.exports = router;