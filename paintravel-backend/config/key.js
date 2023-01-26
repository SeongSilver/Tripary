//비밀 설정 정보 관리.
//횐경변수 process.env.NODE_ENV가 production 이면 배포되었음으로 prod.js에서 키 받아오기
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
