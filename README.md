![Generic badge](https://img.shields.io/badge/npm-v18.9.0-blue.svg)


<div align="center">
<img src="https://user-images.githubusercontent.com/95121282/215732992-b6e04c47-e3db-4c9f-aaa9-54809f51a86f.png" width="300" height="auto">
</div>

# Paintravel
### 세계여행 기록을 나만의 지구본에 색칠해 나가는 앨범 서비스
  



---
  
## :pushpin: 프로젝트 설명
페인트래블은 지구본을 돌려가며 각 나라에 여행을 기록하면서 동시에 색칠도 하는 앨범 서비스이다.  
각 나라에 게시물을 업로드 할 수 있고 업로드 된 게시물의 개수에 따라 색이 점점 밝아진다.(10개부터는 동일)  
마이페이지, 각 국가의 리스트를 통해 게시물 목록을 확인 할 수 있으며  
모달을 통해 슬라이드로 게시물의 내용 및 사진을 확인 할 수 있고 수정, 삭제가 가능하다.  

 
:computer: 개발환경  

<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>


  <img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=MongoDB&logoColor=white"/>  
   
  
:runner: 팀원 


* [고현아(풀스택)](https://github.com/Yana94Ko)  :  am5 chart map 핸들링, node.js를 활용 백엔드 및 서버 담당, mongoDB를 활용 DB 담당, redux를 활용 state 관리, bcrypt 모듈 활용 계정 암호화, 로그인 여부에 따른 제한 접근 라우팅 구현
* [문수빈(퍼블리셔)](https://github.com/NYANGSoobeen)  :  반응형 웹 구현, 전체 페이지 퍼블리싱, 와이어프레임, 기타 디자인, 메인페이지 캔버스 별 함수 작성 
* [유성은(프론트엔드)](https://github.com/SeongSilver) :  am5 chart map 핸들링, React 작업 세팅, 라우팅, state 및 컴포넌트 관리, localStorage,  
 react-dataPicker,  react-slick 핸들링, 로고 디자인

---
  
## :pushpin: 목차  

1. [개발 로그](#:pushpin:-1.-개발-로그)  
2. [프로젝트 사용 방법](#:pushpin:-2.-프로젝트-사용-방법)  
3. [참고 자료](#:pushpin:3.-참고-자료)  

---
  
## :pushpin: 1. 개발 로그
* JSX, SCSS, Javascript를 활용하여 전체 페이지 구성
* SCSS를 활용하여 반응형 웹 지원
* am5 chart Map을 사용한 지구본 구현
* Node.js와 MongoDB를 위한 Mongoose ODM 라이브러리 사용
* 웹 컴파일러 axios를 활용하여 비동기 데이터 전송방식 사용
* react-redux및 useState로 state 관리
* react-dataPicker, react-slick 등 다양한 라이브러리 사용  

## dependencies  
* Frontend
```
"dependencies": {
    "@amcharts/amcharts5": "^5.2.33",
    "@amcharts/amcharts5-geodata": "^5.0.6",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.1.3",
    "d3-array": "^3.2.0",
    "d3-fetch": "^3.0.1",
    "d3-geo-projection": "^4.0.0",
    "d3-scale": "^4.0.2",
    "immer": "^9.0.16",
    "react": "^18.2.0",
    "react-datepicker": "^4.8.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.6.0",
    "react-redux": "^8.0.5",
    "react-router": "^6.4.3",
    "react-router-dom": "^6.4.3",
    "react-scripts": "5.0.1",
    "react-simple-maps": "^3.0.0",
    "react-slick": "^0.29.0",
    "redux": "^4.2.0",
    "redux-devtools-extension": "^2.13.9",
    "redux-promise": "^0.6.0",
    "redux-saga": "^1.2.1",
    "redux-thunk": "^2.4.2",
    "sass": "^1.56.1",
    "slick-carousel": "^1.8.1",
    "styled-component": "^2.8.0",
    "web-vitals": "^2.1.4"
  }
```
* Backend
```
"dependencies": {
    "@react-icons/all-files": "^4.1.0",
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.1",
    "concurrently": "^7.5.0",
    "cookie-parser": "^1.4.6",
    "express": "^4.18.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.7.2",
    "multer": "^1.4.5-lts.1"
  }
```

---

## :pushpin: 2. 프로젝트 사용 방법
### 설치
PAINTRAVEL 폴더, paintravel-frontend 폴더에서 패키지 및 라이브러리 설치
```
npm install
```

PAINTRAVEL 폴더에서 프로젝트 시작
```
npm run dev
```

### 로그인 전
* 메인 화면 지구본에는 색이 아무것도 칠해져 있지 않다
* 국가 클릭 시 리스트 대신 로그인 페이지로 이동하는 버튼이 띄워지도록 구현

![메인-로그인안함](https://user-images.githubusercontent.com/95121282/215316223-599b084c-2c7d-44dd-9a43-caa79be70878.png)  
![로그인 안하고 나라 클릭 시](https://user-images.githubusercontent.com/95121282/215739787-e4f51470-31bd-419f-93ff-9da655923ff7.png)  

### 로그인 & 회원가입
* 계정 정보가 없을 시 로그인 input 하단에 회원가입 버튼을 클릭 후 회원가입

![로그인 화면](https://user-images.githubusercontent.com/95121282/215740049-0eb62e7f-422b-45e4-98ae-9d84540bbaa2.png)
![회원가입 모달](https://user-images.githubusercontent.com/95121282/215740091-941db819-5724-4f8c-abaa-bb000c881446.png)  

### 로그인 후
* 게시물이 있는 국가는 색칠되어 지구본이 메인페이지 렌더링 시 띄워지도록 구현
* 게시물이 없는 국가 클릭 시 게시물 작성 페이지로 이동하는 버튼이 띄워지도록 구현
* 게시물이 있는 국가 클릭 시 해당 국가의 게시물들 리스트가 카드 형식으로 띄워지도록 구현
* 게시물 클릭 시 모달이 렌더링 되고 게시물의 디테일, 사진을 확인 할 수 있으며 하단에 수정페이지로 이동하는 버튼, 삭제버튼 구현

![로그인된 정보가 있는 메인](https://user-images.githubusercontent.com/95121282/215316192-2a3d1349-37e1-4639-98ee-67422a5b5e8a.png)  
![글이 없는 나라](https://user-images.githubusercontent.com/95121282/215739903-f81492f7-14b5-45fd-b1db-fecb6f61ff87.png)
![로그인되고 게시물 있는 나라 클릭시](https://user-images.githubusercontent.com/95121282/215739745-957247a6-351d-4f30-a731-84961e773a3e.png)
![리스트에서 모달](https://user-images.githubusercontent.com/95121282/215744118-f412c0fb-bfee-4a55-9f5a-604467fbae8e.PNG)



### 마이페이지
* 마이페이지에서 게시한 모든 게시물을 업로드일, 여행 시작일 기준으로 정렬된다
* 국가명, 제목을 select box에서 선택 후 검색되도록 구현  
* 검색 또는 한 페이지에 보일 게시물 수를 선택할 수 있고 페이지네이션도 유동적으로 변한다
* 게시물 클릭 시 모달이 렌더링 되고 게시물의 디테일, 사진을 확인 할 수 있으며 하단에 수정페이지로 이동하는 버튼, 삭제버튼 구현

![마이페이지 검색](https://user-images.githubusercontent.com/95121282/215739980-ce881c6d-1778-449e-94f5-b138a4dc8895.PNG)
![마이페이지 모달](https://user-images.githubusercontent.com/95121282/215740154-d6a7362f-9cdd-4d12-929e-2ce797c48aeb.PNG)

#### 게시물 등록 및 수정 페이지
* 게시물 등록, 수정 페이지로 이미지는 총 10장까지 업로드 가능하다
* 각 input box는 모두 각각의 유효성 검사를 구현
* 일정 선택은 기간 선택을 위해 react-datePicker 라이브러리 사용

![글 수정 화면](https://user-images.githubusercontent.com/95121282/215742439-12f9c5b4-1041-412e-8b03-cf994d2bb491.png)


---

## :pushpin: 3. 참고 자료
* am5 chart map  : [https://www.amcharts.com/docs/v5/charts/map-chart/](https://www.amcharts.com/docs/v5/charts/map-chart/)
* react-slick : [https://sirong.tistory.com/38](https://sirong.tistory.com/38)
* react-datePicker : [https://reactdatepicker.com/](https://reactdatepicker.com/)
* bcrypt : [https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-bcrypt-%EB%AA%A8%EB%93%88-%EC%9B%90%EB%A6%AC-%EC%82%AC%EC%9A%A9%EB%B2%95](https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-bcrypt-%EB%AA%A8%EB%93%88-%EC%9B%90%EB%A6%AC-%EC%82%AC%EC%9A%A9%EB%B2%95)
