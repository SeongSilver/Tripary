import React from 'react'
import { Link } from 'react-router-dom';
import '../../../styles/post/contentList/loginBtn.scss';

const LoginButton = () => {
    return (
        <div className="contentBody">
            <div className="loginBox">
                <figure>
                    <img src={require("../../../img/post/question.png")} alt="물음표 이미지" />
                    <img src={require("../../../img/post/question.png")} alt="물음표 이미지" />
                    <img src={require("../../../img/post/question.png")} alt="물음표 이미지" />
                </figure>
                <p>사용자 정보를 찾을 수 없습니다.<br/>로그인 후 이용 바랍니다.</p>
                <Link to="/Login" className="headLink">
                    log in
                </Link>
            </div>
        </div>
  )
}

export default LoginButton