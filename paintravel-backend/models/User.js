const mongoose = require("mongoose"); //mongoose module 가져오기
//암호화를 하기 위해 bcrupt 가져오기
const bcrypt = require("bcrypt");
//salt를 이용해서 비밀번호를 암호화 할 것이기에, salt를 생성할건데 salt가 몇글자인지 정하는 것이 saltRounds
const saltRounds = 10;
//token생성을 위한 jsonwebtoken 라우터 받아오기
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  //mongoose를 이용하여 schema 생성
  userId: {
    type: String,
    maxlength: 50,
    unique: 1,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    trim: true, //빈칸 제거
    unique: 1,
  },
  nickName: {
    type: String,s
  },
  role: {
    type: Number,
    default: 0, //0:일반유저 1:관리자
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//mongoose의 기능중 pre이용 : save하기 전에 function을 실행하라
userSchema.pre("save", function (next) {
  //암호화 시키기 전에 입력된 비밀번호 받아오기
  var user = this; //user : userSchema

  //비밀번호 암호화
  //비밀번호를 변화시키는지 먼저 확인
  if (user.isModified("password")) {
    //1) bcrypt를 통해 salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //salt 생성되지 않았으면 에러 반환
      if (err) return next(err);
      //salt 생성되었으면 생성된 salt를 기반으로 bcrypt를 통해 user.password 재설정
      bcrypt.hash(user.password, salt, function (err, hash) {
        //hash : 암호화된 비밀번호
        //불가능하면 에러 반환
        if (err) return next(err);
        //가능한 경우 user.password 업데이트 후 다음 함수 진행. 여기서 next는 save일것.
        user.password = hash;
        next();
      });
    });
  } else {
    //비밀번호를 바꾸는게 아닌 경우 다음으로 실행할 함수를 바로 실행해
    next();
  }
});

//비밀번호 확인을 위한 method 생성
userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword : qwer1234 암호화 되기 전 비밀번호
  //plainPassword를 암호화해서 비교해야 함(복호화 하지 않음)
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//로그인 token생성을 위한 함수 생성
userSchema.methods.generateToken = function (cb) {
  var user = this;
  //jsonwebtoken을 이용해서 token 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken"); //user._id : mongoDB에 있는 id
  //user._id + 'secretToken' = token
  //->
  //'secretToken' ->user._id
  //user에 저장된 token모델 값 변경해주기
  user.token = token;
  //변경한 값 저장하기
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

//토큰 복호화 한 후 DB에서 찾는 함수
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //토큰을 decode(복호화)
  jwt.verify(token, "secretToken", function (err, decoded) {
    //userid를 이용해서 user을 찾은 다음
    //client에서 가져온 토큰과 db의 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema); //스키마 등록 //model(model이름,schema)

module.exports = { User }; //model 을 다른 파일에서도 쓰기 위해 export하기
