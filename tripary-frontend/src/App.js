import { Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";
import MyPagePage from "./pages/MyPagePage";
import PostPage from "./pages/PostPage";
import ShareBoardPage from "./pages/ShareBoardPage";
import None from "./pages/None";
import NotFound from "./NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/none" element={<None />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/mypage" element={<MyPagePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/shareboard" element={<ShareBoardPage />} />
    </Routes>
  );
}

export default App;
