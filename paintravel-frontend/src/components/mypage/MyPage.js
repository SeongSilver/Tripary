import React from "react";
import "../../styles/mypage/mypage.scss";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";

function MyPage() {
  return (
    <div className="mypageContainer">
      <Header />
      <div className="mypage">
        <div className="mypageWrap">
          <h1>My Journeys</h1>
          <div className="mypageSelection">
            <select>
              <option>최신 작성순</option>
              <option>여행 날짜순</option>
            </select>
            <select>
              <option>All Country</option>
              <option>South Korea</option>
              <option>Japan</option>
              <option>Russia</option>
            </select>
            <select>
              <option>All Location</option>
              <option>부산</option>
              <option>제주도</option>
              <option>도쿄</option>
              <option>모스크바</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>갤러리</th>
                <th>국가</th>
                <th>위치</th>
                <th>일정</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* 갤러리 이미지 */}
                <td><img src={require("../../img/common/footer_logo.png")} alt="대표 이미지"/></td>
                {/* 국가 */}
                <td>South Korea</td>
                {/* 위치 */}
                <td>부산</td>
                {/* 일정 */}
                <td><span>2022.11.12</span> ~ <span>2022.11.14</span></td>
                {/* 수정,삭제 버튼 */}
                <td>
                  <button>수정</button>
                  <button>삭제</button>
                </td>
              </tr>
              <tr>
                <td><img src={require("../../img/common/footer_logo.png")} alt="대표 이미지"/></td>
                <td>South Korea</td>
                <td>부산</td>
                <td><span>2022.11.12</span> ~ <span>2022.11.14</span></td>
                <td>
                  <button>수정</button>
                  <button>삭제</button>
                </td>
              </tr>
              <tr>
                <td><img src={require("../../img/common/footer_logo.png")} alt="대표 이미지"/></td>
                <td>South Korea</td>
                <td>부산</td>
                <td><span>2022.11.12</span> ~ <span>2022.11.14</span></td>
                <td>
                  <button>수정</button>
                  <button>삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
          <ul>
            <li><Link to="#">1</Link></li>
            <li><Link to="#">2</Link></li>
            <li><Link to="#">3</Link></li>
          </ul>
          <Link to="#" className="memberWithdrawal">회원탈퇴</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MyPage;
