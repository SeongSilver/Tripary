import React, { useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SignUp from "../Login/SignUp";
import "../../styles/login/login.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_actions'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({userId:'', password:'',});
  const [openSignUpModal, setOpenSignUpModal] = useState(false);

  const handleInput = event => {
    const {name, value} = event.target;
    setInputValue({
      ...inputValue,
      [name]:value,
    })
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = inputValue;

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          location.reload('/')
        }else {
          alert('로그인 실패! 다시 시도하세요')
        }
      })
    
  }
  // if(userId === null || userId ===""){
  //   alert('아이디를 잘못 입력하였습니다.');
  //   return;
  // }
  // if(password === null || password ===""){
  //   alert('비밀번호를 잘못 입력하였습니다.');
  //   return;
  // }
  const openSignUp = () => {
    setOpenSignUpModal(true);
  };
  
  return (
    <div className="loginContainer">
      <Header />
      <div className="login">
        <div className="loginWrap">
          <h1>
            Welcome to <br />
            <span>PAINTRAVEL.</span>
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div>
              <input type="text" placeholder="아이디" name="userId" onChange={handleInput} required/>
              <input type="password" placeholder="비밀번호" name="password" onChange={handleInput} required/>
            </div>
            <button type="submit" id="loginButton">
              로그인
            </button>
            <div>
              <span>아직 회원이 아니시라면?</span>
              <Link to="#" id="moveToSignUp" onClick={openSignUp}>
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      {openSignUpModal && <SignUp setOpenSignUpModal={setOpenSignUpModal} />}
    </div>
  );
}

export default Login;
