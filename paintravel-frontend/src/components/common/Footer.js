import React, {useState} from 'react';
import "../../styles/common/footer.scss";
import { Link } from "react-router-dom";


function Footer() {

  // // footer 열기
  // const [footerBottom, setFooterBottom] = useState("-28%");
  // const [openDisplay, setOpenDisplay] = useState("flex");
  // const [closeDisplay, setCloseDisplay] = useState("none");
  // const footerOpen = () => 
  //   setFooterBottom('-28%'); 
  //   setOpenDisplay("none");
  //   setCloseDisplay("flex");
  // const footerClose = () => 
  //   setFooterBottom('0');
  //   setOpenDisplay("flex");
  //   setCloseDisplay("none");
  
    return (
    <div className="footer">
    {/* <div className="footer" stlye={footerBottom}> */}
      <h1>하단메뉴</h1>
      <div className="footerButton">
        {/* <span className="footerOpen" style={openDisplay} onClick={() => setFooterBottom('0')}> */}
        <span className="footerOpen">
          <img src={require("../../img/common/arrow_up.png")} alt="하단메뉴 열기 버튼"/>
        </span>
        {/* <span className="footerClose" style={closeDisplay} onClick={() => setFooterBottom('-28% ')}> */}
        <span className="footerClose">
          <img src={require("../../img/common/arrow_down.png")} alt="하단메뉴 닫기 버튼"/>
        </span>
      </div>
      <img className="footerLogo" src={require("../../img/common/footer_logo.png")} alt="logo"/>
      <div className="footerMenu">
        <ul className="sns">
          <li><img src={require("../../img/common/footer_facebook_hover.png")} alt="facebook icon" /></li>
          <li><img src={require("../../img/common/footer_youtube_hover.png")} alt="youtube icon" /></li>
          <li><img src={require("../../img/common/footer_instagram_hover.png")} alt="instagram icon" /></li>
          <li><img src={require("../../img/common/footer_twitter_hover.png")} alt="twitter icon" /></li>
        </ul>
        <ul>
          <li><Link to="/">홈</Link></li>
          <li><Link to="/">이용약관</Link></li>
          <li><Link to="/">개인정보취급방침</Link></li>
        </ul>
        <address>얼굴도 귀엽군 만지면 더귀여우리 (03048)</address>
        <p>Copyright ⓒ PAINTRAVEL. All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
