const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
//3) User model 가져오기
const { User } = require("../models/User");

//5) 클라이언트로부터 정보를 받아오기 위해 body-parser을 가져옴
const bodyParser = require("body-parser");
//6) body-parser에 옵션 부여
//6-1) application/x-www-from-urlencoded로 된 데이터를 분석해서 가져오게,
router.use(bodyParser.urlencoded({ extended: true }));
//6-3) application/json로 된 데이터를 분석해서 가져오게,
router.use(bodyParser.json());

//로그인시 받아온token 정보를 쿠키에 저장하기 위한cookie-parser 라이브러리
const cookieParser = require("cookie-parser");

//cookie-parser 라이브러리 사용하기 위한 환경세팅
router.use(cookieParser());

//회원가입 라우터
router.post("/signUp", (req, res) => {
    //1) 회원가입시 필요한 정보들을 클라이언트에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    //2) 그러기 위해서는 Usermodel을 가져와야 함.
  
    //4) body-parser를 통해 클라이언트에서 받은 정보를 이용해User 생성
    const user = new User(req.body);
    //5) mongoDB의 save 메서드를 이용해 user 모델에 저장후 콜백함수 실행
    user.save((err, userInfo) => {
      //만약 에러가 발생했다면 json형태로 에러메시지를 전달.
      if (err) return res.json({ success: false, err });
      //만약 성공했다면 성공했다고 200상태를 전달하고 아래 정보를 json형태로 전달해.
      return res.status(200).json({
        success: true,
      });
    });
  });
  
  //로그인 라우터
  router.post("/login", (req, res) => {
    //1) 요청된 이메일을 데이터 베이스 안에서 탐색
    User.findOne({ userId: req.body.userId }, (err, user) => {
      //유저 정보가 없다면 아래 반환
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다",
        });
      }
      //2) 요청한 이메일이 DB에 있다면 password도 일치하는지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다",
          });
        }
        
        //3) password까지 맞다면 token을 생성하기
        user.generateToken((err, user) => {
          //에러가 발생했다면 에러상태로 바꾸고 err 문구 전달
          if (err) return res.status(400).send(err);
          //받아온 token을 쿠키, 로컬스토리지, 등에 저장하는데 이번엔 쿠키에 저장
          res
            .cookie("x_auth", user.token) //쿠키에 "x_auth"라는 명으로 user.token 정보를 저장하고
            .status(200) //정상 상태 반환하고
            .json({ loginSuccess: true, userId: user.userId });
        });
      });
    });
  });
  
  //auth 라우터
  router.get("/auth", auth, (req, res) => {
    //auth : 미드웨어(request를 받은 뒤 callbackfunction 하기 전에 중간에서 작업해주는 것)
    //여기까지 미드웨어를 통과해 왔다는 이야기는 authentication이 true라는 것.
    res.status(200).json({
      _id: req.user._id,
      userId: req.user.userId,
      isAdmin: req.user.role === 0 ? false : true, //0:일반 1:관리자,
      isAuth: true,
      email: req.user.email,
      nickName: req.user.nickName,
      role: req.user.role,
      image: req.user.image,
    });
  });
  
  router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
      if (err) return res.json({ sucess: false, err });
      console.log("유저 ID" + req.user._id + "로그아웃 완료");
      return res.status(200).send({
        sucess: true,
      });
    });
  });
  

module.exports = router;