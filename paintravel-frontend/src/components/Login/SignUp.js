import React, { useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from 'axios';
import "../../styles/login/signUp.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../_actions/user_actions";

function SignUp({ setOpenSignUpModal }) {
  //[성은] 유효성 검사 완료, 버튼에 is해당항목 중 하나라도 false면 disable되게 함 (22.11.24 14:20)
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [userIdMessage, setUserIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");

  const [isUserId, setIsUserId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);

  //[soobin]
  const closeSignUp = () => {
    setOpenSignUpModal(false);
  };
  //[Yana, 2022.11.22.19:00]
  //비밀번호의 경우 8-20자만 입력 가능하도록 설정
  //닉네임은 최대 8자 입력 가능하도록 설정
  const dispatch = useDispatch();
  const [signUpInfo, setSignUpInfo] = useState({
    userId: "",
    password: "",
    email: "",
    nickName: "",
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
      dispatch(signUpUser(signUpInfo)).then((response) => {
        console.log(response);
        if (response.payload.success) {
          closeSignUp();
          alert("회원가입 성공!\n로그인 후 이용하세요 :)");
        } else {
          alert("회원가입 실패");
        }
      });
  };

  //아이디 유효성 검사
  const onChangeUserId = (e) => {
    const userIdRegex = /^[a-z0-9]{6,12}$/;
    const userIdCurrent = e.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]: userIdCurrent,
    });
    if (!userIdRegex.test(userIdCurrent)) {
      setUserIdMessage("영어 소문자와 숫자 조합으로 입력해주세요(6~12자)");
      return;
    } else {
      setUserIdMessage("올바른 아이디 형식입니다");
      setIsUserId(true);
    }
  };

  //아이디 중복확인 axios
  const checkIdDuplication = () => {
    if(signUpInfo.userId === ""){
      alert("아이디를 입력하세요.");
      return;
    }
    if(signUpInfo.userId.length < 6 || signUpInfo.userId > 12){
      alert("아이디는 6자 이상 12자 이하로 입력해주세요");
      return;
    }
    axios.post("/api/users/checkIdDuplication", signUpInfo.userId)
    .then(res => console.log(res));
  }

  //비밀번호 유효성 검사
  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const passwordCurrent = e.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]: passwordCurrent,
    });
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자,영문자,특수문자 조합으로 8자 이상 20자 미만으로 입력해주세요"
      );
      setIsPassword(false);
      return;
    } else {
      setPasswordMessage("안전한 비밀번호 입니다");
      setIsPassword(true);
    }
  };

  //비밀번호 확인
  const onChangePasswordConfirm = (e) => {
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);
    if (signUpInfo.password !== passwordConfirmCurrent) {
      setPasswordConfirmMessage("비밀번호가 다릅니다. 확인해주세요");
      setIsPasswordConfirm(false);
      return;
    } else {
      setPasswordConfirmMessage("비밀번호가 같습니다");
      setIsPasswordConfirm(true);
    }
  };

  const onChangeEmail = (e) => {
    const emailRegex =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    const emailCurrent = e.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]: emailCurrent,
    });
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 양식을 지켜주세요");
      setIsEmail(false);
      return;
    } else {
      setEmailMessage("사용 가능한 이메일입니다");
      setIsEmail(true);
    }
  };
  const onChangeNickName = (e) => {
    const nickNameCurrent = e.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]: nickNameCurrent,
    });
    if (nickNameCurrent.length < 4 || nickNameCurrent.length > 10) {
      setNicknameMessage("4글자 이상 10글자 미만으로 입력해주세요");
      setIsNickname(false);
      return;
    } else {
      setNicknameMessage("올바른 아이디 형식입니다");
      setIsNickname(true);
    }
  };
  
  return (
    <div className="signUpContainer">
      <div className="signUp">
        <div className="signUpWrap">
          <h1>
            Sign up for <br />
            <span>PAINTRAVEL.</span>
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div>
              <p>아이디/비밀번호</p>
              <div className="formBox">
                <input
                  type="text"
                  placeholder="아이디"
                  maxLength="15"
                  name="userId"
                  onChange={onChangeUserId}
                />
                <input 
                  type="button"
                  value="중복확인"
                  onClick={checkIdDuplication}
                />
                {signUpInfo.userId.length > 0 && (
                  <span className={`message ${isUserId ? "success" : "error"}`}>
                    {userIdMessage}
                  </span>
                )}
              </div>
              <div className="formBox">
                <input
                  type="password"
                  placeholder="비밀번호"
                  name="password"
                  onChange={onChangePassword}
                />
                {signUpInfo.password.length > 0 && (
                  <span
                    className={`message ${isPassword ? "success" : "error"}`}>
                    {passwordMessage}
                  </span>
                )}
              </div>
              <div className="formBox">
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  name="passwordConfrim"
                  onChange={onChangePasswordConfirm}
                />
                {passwordConfirm.length > 0 && (
                  <span
                    className={`message ${
                      isPasswordConfirm ? "success" : "error"
                    }`}>
                    {passwordConfirmMessage}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p>이메일</p>
              <div className="formBox">
                <input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  name="email"
                  onChange={onChangeEmail}
                />
                {signUpInfo.email.length > 0 && (
                  <span className={`message ${isEmail ? "success" : "error"}`}>
                    {emailMessage}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p>닉네임</p>
              <div className="formBox">
                <input
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  maxLength="15"
                  name="nickName"
                  onChange={onChangeNickName}
                />
                {signUpInfo.nickName.length > 0 && (
                  <span
                    className={`message ${isNickname ? "success" : "error"}`}>
                    {nicknameMessage}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              id="signUpButton"
              disabled={!(isUserId && isPassword && isEmail && isNickname)}>
              가입하기
            </button>
          </form>
          <Link className="signUpCloseBtn" onClick={closeSignUp}>
            <span>닫기</span>x
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
