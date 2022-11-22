import React, {useState, useCallback} from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../../styles/login/signUp.scss";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../_actions/user_actions'

function SignUp({setOpenSignUpModal}){
  console.log(typeof setOpenSignUpModal)
  //[soobin]
  const closeSignUp = () => {
    setOpenSignUpModal(false);
  };
  //[Yana, 2022.11.22.19:00]
  //비밀번호의 경우 8-20자만 입력 가능하도록 설정
  //닉네임은 최대 8자 입력 가능하도록 설정
  const dispatch = useDispatch();
  const [signUpInfo, setSignUpInfo] = useState({
    userId:'',
    password:'',
    passwordConfrim:'',
    email:'',
    nickName:'',
  })

  const onChange = (event) => {
    event.preventDefault();

    setSignUpInfo({
      ...signUpInfo,
      [event.target.name]:event.target.value,
    })
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();

    // if(signUpInfo.password!==signUpInfo.passwordConfrim){
    //   return alert("비밀번호와 비밀번호 확인은 일치해야합니다")
    // }

    console.log(signUpInfo)

    dispatch(signUpUser(signUpInfo))
      .then(response => {
        if(response.payload.success) {
          closeSignUp();
        }else {
          alert('회원가입 실패')
        }
      })
  }


  
  return (
    <div className="signUpContainer">
      <Header />
      <div className="signUp">
        <div className="signUpWrap">
          <h1>
            Sign up for <br />
            <span>PAINTRAVEL.</span>
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div>
              <p>아이디/비밀번호</p>
              <input type="text" placeholder="아이디" name = 'userId' onChange={onChange} required/>
              <button type="button" className="doubleCheckBtn">중복 확인</button>
              <input type="password" placeholder="비밀번호" name = 'password' onChange={onChange}/>
              <input type="password" placeholder="비밀번호 확인" name = 'passwordConfrim' onChange={onChange}/>
            </div>
            <div>
              <p>이메일</p>
              <input type="email" placeholder="이메일을 입력하세요" name = 'email' onChange={onChange}/>
              <button type="button" className="doubleCheckBtn">중복 확인</button>
            </div>
            <div>
              <p>닉네임</p>
              <input type="text" placeholder="닉네임을 입력하세요" name = 'nickName' onChange={onChange}/>
              <button type="button" className="doubleCheckBtn">중복 확인</button>
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
