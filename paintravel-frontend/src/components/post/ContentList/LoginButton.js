import React from 'react'
import { Link } from 'react-router-dom';
import '../../../styles/post/contentList/loginBtn.scss';

const LoginButton = () => {
    return (
        <div className="contentBody">
            <div className="loginBox">
                <Link to="/Login" className="headLink">
                        
                    <span>로그인버튼 맘대로 수정하시라</span>
                </Link>
            </div>
      </div>
  )
}

export default LoginButton