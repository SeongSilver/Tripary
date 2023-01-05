import React from 'react'
import { Link } from 'react-router-dom'

function LoginedList(openContentModal) {
  return (
    <ul className="contentBody">
        <li className="contentCard">
          <span className="cardTag">
            서울에서 얼마나 길어지는지 태에ddd에에그
          </span>
          <div>
            <img
              className="contentImage"
              src={require("../../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">광화문</span>
          <div>
            <img
              className="contentImage"
              src={require("../../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">여수</span>
          <div>
            <img
              className="contentImage"
              src={require("../../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">속초</span>
          <div>
            <img
              className="contentImage"
              src={require("../../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">제주도</span>
          <div>
            <img
              className="contentImage"
              src={require("../../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">부산</span>
          <div>
            <img
              className="contentImage"
              src={require("../../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">서울</span>
          <div>
            <img
              className="contentImage"
              src={require("../../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
      </ul>
  )
}

export default LoginedList