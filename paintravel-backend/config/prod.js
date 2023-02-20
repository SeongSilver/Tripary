//비밀 정보 관리(배포 환경)
console.log("배포환경")
console.log(process.env.mongo_URI)
console.log(typeof process.env.mongo_URI)
module.exports = {
  //mongo_URI라는 변수로 배포환경에 저장된 변수를 사용해라.
  mongoURI: process.env.REACT_APP_MONGOURI,
};
