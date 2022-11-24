const { Post } = require("../models/Post");
const multer = require("multer");

// diskStorage는 disk에 file을 저장하게 함

// destination 함수는 파일이 어디에 저장될 것인지 지정
// filename 함수는 폴더안에 파일 명이 어떻게 저장될 것인지 지정

// destination이 없으면 운영체제의 임시 파일을 저장하는 기본 폴더로 지정이 됨
// filename 함수는 시스템 시간으로 파일명을 저장
// path.extname(file.originalanme)은 파일의 확장자를 가져옴

const Storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images'); // 전송된 파일이 저장되는 디렉토리
  },
  filename(req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname)); // 시스템 시간으로 파일이름을 변경해서 저장
  },
});

// multer()는 미들웨어를 위한 메소드를 가진 Multer 객체를 반환, 옵션값을 줄 수 있음

const upload = multer({ storage: Storage });

module.exports = { upload };