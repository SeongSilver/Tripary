/* eslint-disable */
import { Routes, Route } from 'react-router';
import MyPagePage from './pages/MyPagePage';
import Login from './components/Login/Login';
import NotFound from './NotFound';
import MapPage from './pages/MapPage';
import PostWritePage from './pages/PostWritePage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPagePage />} />
      <Route path="/postwrite" element={<PostWritePage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
