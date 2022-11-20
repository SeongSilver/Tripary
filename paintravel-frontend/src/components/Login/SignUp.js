import React, {useState} from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../../styles/scss/signUp.scss";
import { Link } from "react-router-dom";

function SignUp(setOpenSignUpModal) {
    const closeSignUp = () => {
      setOpenSignUpModal(false);
    };
  return (
    <div className="signUpContainer">
      <Header />
      <div className="signUp">
        <div className="signUpWrap">
          <h1>Sign up for <br/><span>PAINTRAVEL.</span></h1>
          <form>
            <div>
              <p>아이디/비밀번호</p>
              <input type="text" placeholder="아이디"/>
              <button class="doubleCheckBtn">중복 확인</button>
              <input type="password" placeholder="비밀번호"/>
              <input type="password" placeholder="비밀번호 확인"/>
              <span>사용할 수 없는 아이디입니다.</span>
            </div>
            <div>
              <p>이메일</p>
              <input type="text" placeholder="이메일을 입력하세요"/>
              <button class="doubleCheckBtn">중복 확인</button>
              <span>이미 사용 중인 이메일 주소입니다.</span>
            </div>
            <div>
              <p>닉네임</p>
              <input type="text" placeholder="닉네임을 입력하세요"/>
              <button class="doubleCheckBtn">중복 확인</button>
              <span>이미 사용 중인 닉네임입니다.</span>
            </div>
            <button type="submit" id="signUpButton">가입하기</button>
          </form>
          <Link className="signUpCloseBtn" onClick={closeSignUp}>x</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
