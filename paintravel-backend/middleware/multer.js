const { Post } = require("../models/Post");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

try {
  fs.readdirSync("upload");
} catch (err) {
  console.error("upload 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("upload");
}
// diskStorage는 disk에 file을 저장하게 함

// destination 함수는 파일이 어디에 저장될 것인지 지정
// destination이 없으면 운영체제의 임시 파일을 저장하는 기본 폴더로 지정이 됨

// filename 함수는 폴더안에 파일 명이 어떻게 저장될 것인지 지정
// filename 함수는 uploadImage_ + 시스템 시간으로 파일명을 저장
// path.extname(file.originalanme)은 파일의 확장자를 가져옴

const Storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./upload"); // 전송된 파일이 저장되는 디렉토리
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    console.log("업로드 할 파일" + file.originalname);
    cb(null, "uploadImage_" + new Date().valueOf() + ext); // 시스템 시간으로 파일이름을 변경해서 저장
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + " is starting ...");
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + " uploaded to  " + file.path);
  },
});

// multer()는 미들웨어를 위한 메소드를 가진 Multer 객체를 반환, 옵션값을 줄 수 있음

const upload = multer({ storage: Storage });
module.exports = { upload };
