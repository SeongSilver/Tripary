import React, {useState, useCallback} from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../../styles/login/signUp.scss";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../_actions/user_actions'

function SignUp({setOpenSignUpModal}){
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');

  const [userIdMessage, setUserIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');

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
    userId:'',
    password:'',
    email:'',
    nickName:'',
  })

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

  //아이디 유효성 검사
  const onChangeUserId = (e) => {
    const userIdCurrent = e.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]:userIdCurrent,
    });
    setUserId(userIdCurrent);
    console.log(signUpInfo.userId);
    if(userIdCurrent < 6 || userIdCurrent >12){
      setUserIdMessage("6글자 이상 12글자 미만으로 입력해주세요");
      setIsUserId(false);
    } else{
      setUserIdMessage("올바른 아이디 형식입니다");
      setIsUserId(true);
    }
  }

  //비밀번호 유효성 검사
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const passwordCurrent = e.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]:passwordCurrent,
    });
    if(!passwordRegex.test(passwordCurrent)){
      setPasswordMessage("숫자 + 영문자 + 특수문자 조합으로 8자 이상 20자 미만으로 입력해주세요!");
      setIsPassword(false);
    } else{
      setPasswordMessage("안전한 비밀번호 입니다");
      setIsPassword(true);
    }
  }
  
  //비밀번호 확인
  const onChangePasswordConfirm = useCallback((e) => {
    const passwordConfirmCurrent = e.target.value;
    if(signUpInfo.password === passwordConfirmCurrent){
      setPasswordConfirmMessage("비밀번호가 같습니다");
      setIsPasswordConfirm(true);
    } else{
      setPasswordConfirmMessage("비밀번호가 다릅니다. 확인해주세요");
      setIsPasswordConfirm(false);
    }
  },[]);

  const onChangeEmail = useCallback((e) => {
    const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    const emailCurrent = e.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]:emailCurrent,
    });
    if(!emailRegex.test(emailCurrent)){
      setEmailMessage("이메일 양식을 지켜주세요!");
      setIsEmail(false);
    } else{
      setEmailMessage("사용 가능한 이메일입니다!");
      setIsEmail(true);
    }
  },[]);

  const onChangeNickName = useCallback((e) => {
    const nickNameCurrent = e.target.value;
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]:nickNameCurrent,
    });
    if(nickNameCurrent< 4 || nickNameCurrent >10 ){
      setNicknameMessage("4글자 이상 10글자 미만으로 입력해주세요");
      setIsNickname(false);
    } else{
      setNicknameMessage("올바른 아이디 형식입니다");
      setIsNickname(true);
    }
  },[]);
  
  
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
              <div className="formBox">
                <input type="text" placeholder="아이디"  maxlength="12" name = 'userId' onChange={onChangeUserId}/>
                <button type="button" className="doubleCheckBtn">중복 확인</button>
                {signUpInfo.userId !== "" && <span className={`message ${isUserId ? 'success' : 'error'}`}>{userIdMessage}</span>}
              </div>
              <div className="formBox">
              <input type="password" placeholder="비밀번호" name = 'password' onChange={onChangePassword}/>
              </div>
              <div className="formBox">
              <input type="password" placeholder="비밀번호 확인" name = 'passwordConfrim' onChange={onChangePasswordConfirm}/>
              </div>
            </div>
            <div>
              <p>이메일</p>
              <input type="email" placeholder="이메일을 입력하세요" name = 'email' onChange={onChangeEmail}/>
              <button type="button" className="doubleCheckBtn">중복 확인</button>
            </div>
            <div>
              <p>닉네임</p>
              <input type="text" placeholder="닉네임을 입력하세요" name = 'nickName' onChange={onChangeNickName}/>
              
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
