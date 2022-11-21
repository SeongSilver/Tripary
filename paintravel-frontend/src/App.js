/* eslint-disable */
import { Routes, Route } from 'react-router';
import MyPagePage from './pages/MyPagePage';
import PostPage from './pages/PostPage';
import Login from './components/Login/Login';
import None from './pages/None';
import NotFound from './NotFound';
import MapPage from './pages/MapPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPagePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/none" element={<None />} />
    </Routes>
  );
}

export default App;
