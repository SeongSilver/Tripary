// eslint-disable-next-line
import React from "react";
import "../../styles/common/footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  // let footer = document.querySelector('.footer');
  // let footerButton = document.querySelector('.footerButton');
  // footerButton.lastChild.style.display = 'none';
  // // footer 열기
  // footerButton.firstChild.addEventListener('click', function (event) {
  //   footer.style.bottom = '0';
  //   event.target.style.display = 'none';
  //   footerButton.lastChild.style.display = 'flex';
  // });
  // // footer 닫기
  // footerButton.lastChild.addEventListener('click', function (event) {
  //   footer.style.bottom = '-28%';
  //   event.target.style.display = 'none';
  //   footerButton.firstChild.style.display = 'flex';
  // });
  return (
    <div className="footer">
      <h1>하단메뉴</h1>
      <div className="footerButton">
        <span>
          <img
            src={require("../../img/arrow_up.png")}
            alt="하단메뉴 열기 버튼"
          />
        </span>
        <span>
          <img
            src={require("../../img/arrow_down.png")}
            alt="하단메뉴 닫기 버튼"
          />
        </span>
      </div>
      <img
        className="footerLogo"
        src={require("../../img/footer_logo.png")}
        alt="logo"
      />
      <div className="footerMenu">
        <ul className="sns">
          <li>
            <img
              src={require("../../img/footer_facebook_hover.png")}
              alt="facebook icon"
            />
          </li>
          <li>
            <img
              src={require("../../img/footer_youtube_hover.png")}
              alt="youtube icon"
            />
          </li>
          <li>
            <img
              src={require("../../img/footer_instagram_hover.png")}
              alt="instagram icon"
            />
          </li>
          <li>
            <img
              src={require("../../img/footer_twitter_hover.png")}
              alt="twitter icon"
            />
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/">이용약관</Link>
          </li>
          <li>
            <Link to="/">개인정보취급방침</Link>
          </li>
        </ul>
        <address>얼굴도 귀엽군 만지면 더귀여우리 (03048)</address>
        <p>Copyright ⓒ PAINTRAVEL. All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
