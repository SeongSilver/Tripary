//비밀 정보 관리(배포 환경)
module.exports = {
  //mongo_URI라는 변수로 배포환경에 저장된 변수를 사용해라.
  mongoURI: process.env.mongo_URI,
};
