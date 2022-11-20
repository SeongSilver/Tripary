import React, {useState} from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SignUp from "../Login/SignUp";
import "../../styles/scss/login.scss";
import { Link } from "react-router-dom";

function Login() {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const openSignUp = () => { setOpenSignUpModal(true); } 
  return (
    <div className="loginContainer">
      <Header />
      <div className="login">
        <div className="loginWrap">
          <h1>Welcome to <br/><span>PAINTRAVEL.</span></h1>
          <form>
            <div>
              <input type="text" placeholder="아이디"/>
              <input type="password" placeholder="비밀번호"/>
            </div>
            <p>아이디 또는 비밀번호를 다시 확인하세요.</p>
            <button type="submit" id="loginButton">로그인</button>
            <div>
              <span>아직 회원이 아니시라면?</span>
              <Link id="moveToSignUp" onClick={openSignUp}>회원가입</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      {openSignUpModal && (
        <SignUp setOpenSignUpModal={setOpenSignUpModal} />
      )}
    </div>
  );
}

export default Login;
