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
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World 새복많!!!!!꾫꾫"));

//프론트 연결
app.get("/api/hello", (req, res) => {
  res.send("안녕하세요@@@");
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
