import React, { useState, useRef } from "react";
import SignUp from "../Login/SignUp";
import "../../styles/login/login.scss";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_actions'

function Login() {
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
  // 모바일 로그인 submit 후 자판 내린 후 새로고침!
  // (자판 올라온 상태에서 새로고침 시 innterHeight -> 자판 높이 뺀 값으로 변함)
  const pwInput = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    pwInput.current.blur();
    
    let body = inputValue;

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
            location.reload('/');
        }else {
          alert('로그인 실패! 다시 시도하세요');
        }
      })
    
  }
  const openSignUp = () => {
    setOpenSignUpModal(true);
  };
  
  return (
    <div className="loginContainer">
      <div className="login">
        <div className="loginWrap">
          <h1>
            Welcome to <br />
            <span>PAINTRAVEL.</span>
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div>
              <input type="text" placeholder="아이디" name="userId" 
              onChange={handleInput} required/>
              <input type="password" placeholder="비밀번호" name="password" 
              onChange={handleInput} ref={pwInput} required/>
            </div>
            <button type="submit" id="loginButton">
              로그인
            </button>
            <div>
              <span>아직 회원이 아니시라면?</span>
              <a href="#" id="moveToSignUp" onClick={openSignUp}>
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
      {openSignUpModal && <SignUp setOpenSignUpModal={setOpenSignUpModal} />}
    </div>
  );
}

export default Login;
