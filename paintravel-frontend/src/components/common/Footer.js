// eslint-disable-next-line
import React,{useState} from "react";
import "../../styles/common/footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  const [footerToggle, setFooterToggle] = useState(false);
  const footerMenuToggle = () => {
    setFooterToggle(footerToggle => !footerToggle);
  }

  return (
    <footer className={footerToggle ? "footerOpen" : "footerClose"}>
      <h1>하단메뉴</h1>
      <div className="footerButton" onClick={()=>footerMenuToggle()}>
        <span className="footerOpenBtn">
          <img
            src={require("../../img/common/arrow_up.png")}
            alt="하단메뉴 열기 버튼"
          />
        </span>
        <span className="footerCloseBtn">
          <img
            src={require("../../img/common/arrow_down.png")}
            alt="하단메뉴 닫기 버튼"
          />
        </span>
      </div>
      <img
        className="footerLogo"
        src={require("../../img/common/footer_logo.png")}
        alt="logo"
      />
      <div className="footerMenu">
        <ul className="sns">
          <li>
            <img
              src={require("../../img/common/footer_facebook_hover.png")}
              alt="facebook icon"
            />
          </li>
          <li>
            <img
              src={require("../../img/common/footer_youtube_hover.png")}
              alt="youtube icon"
            />
          </li>
          <li>
            <img
              src={require("../../img/common/footer_instagram_hover.png")}
              alt="instagram icon"
            />
          </li>
          <li>
            <img
              src={require("../../img/common/footer_twitter_hover.png")}
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
    </footer>
  );
}

export default Footer;