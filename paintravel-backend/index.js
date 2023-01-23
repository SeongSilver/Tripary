//백엔드서버의 시작점이 되는 파일
const express = require("express"); //express를 받아와서
const app = express(); //함수로 app을 생성
const port = 5000; //포트번호 지정

//user 라우팅
const UserRouter = require('./route/user');
app.use('/api/users',UserRouter);
//post 라우팅
const PostRouter = require('./route/post');
app.use('/api/post',PostRouter);

///static/images라는 가상 경로를 통해, public/images라는 폴더에서 static한 요소들을 탐색하도록 하는 코드
app.use('/static/images', express.static('public/images'));

const config = require("./config/key");

//mongoose를 이용하여 어플리케이션과 mongo db 연결
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    usenewurlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 연결 완료"))
  .catch((err) => console.log(err));
  
app.listen(port, () => console.log(`Paintravel-app 백엔드 서버가 ${port}번 포트에서 실행되는 중입니다.`));
