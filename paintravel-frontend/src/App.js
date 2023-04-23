import React, {useEffect} from "react";
import { Routes, Route } from "react-router";
import MyPagePage from "./pages/MyPagePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./NotFound";
import MapPage from "./pages/MapPage";
import PostWritePage from "./pages/PostWritePage";
import PostEditPage from "./pages/PostEditPage";
import "./App.css";
import Auth from "./hoc/auth";

function App() {
  //option : null-아무나, true-로그인한 유저만, false-로그인 안한 유저만
  //adminRoute : true일 경우 - 관리자만 접근 가능한 경우
  const AuthMapPage = Auth(MapPage, null);
  const AuthLogin = Auth(LoginPage, false);
  const AuthMyPagePage = Auth(MyPagePage, true);
  const AuthPostWritePage = Auth(PostWritePage, true);
  const AuthPostEditPage = Auth(PostEditPage, true);

  return (
    <Routes>
      <Route path="/" element={<AuthMapPage />} />
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/mypage" element={<AuthMyPagePage />} />
      <Route path="/postwrite" element={<AuthPostWritePage />} />
      <Route path="/postEdit" element={<AuthPostEditPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
