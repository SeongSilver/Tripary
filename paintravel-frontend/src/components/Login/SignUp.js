import React, {useState, useCallback} from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../../styles/login/signUp.scss";
import { Link } from "react-router-dom";
import axios from 'axios';

function SignUp(setOpenSignUpModal) {
  //아이디, 비밀번호, 이메일, 닉네임
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');

  //오류메세지 
  const [userIdMessage, setUserIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [nickNameMessage, setNickNameMessage] = useState('');

  //유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isNickName, setIsNickName] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    try{
      axios.post('액션이름', {
        userid : userId,
        password: password,
        email: email,
        nickName: nickName,
      })
    }catch(e){
      console.log(e)
    }
  } 

  const closeSignUp = () => {
    setOpenSignUpModal(false);
  };
  return (
    <div className="signUpContainer">
      <Header />
      <div className="signUp">
        <div className="signUpWrap">
          <h1>
            Sign up for <br />
            <span>PAINTRAVEL.</span>
          </h1>
          <form>
            <div>
              <p>아이디/비밀번호</p>
              <input type="text" placeholder="아이디" value={userId}/>
              <button className="doubleCheckBtn">중복 확인</button>
              <input type="password" placeholder="비밀번호" value={password}/>
              <input type="password" placeholder="비밀번호 확인" value={ConfirmPassword}/>
            </div>
            <div>
              <p>이메일</p>
              <input type="text" placeholder="이메일을 입력하세요" value={email}/>
              <button className="doubleCheckBtn">중복 확인</button>
            </div>
            <div>
              <p>닉네임</p>
              <input type="text" placeholder="닉네임을 입력하세요" value={nickName}/>
              <button className="doubleCheckBtn">중복 확인</button>
            </div>
            <button type="submit" id="signUpButton">
              가입하기
            </button>
          </form>
          <Link className="signUpCloseBtn" onClick={closeSignUp}>
            x
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
