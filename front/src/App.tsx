import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './component/navbar/Header'; 
import { MainSection } from './component/main/MainSection';
import MainSection2 from './component/main/MainSection2';
import MainSection3 from './component/main/MainSection3';
import MainSection4 from './component/main/MainSection4';
import { MainSection5 } from './component/main/MainSection5';
import { Footer } from './component/main/Footer';
import { GlobalStyle } from './GlobalStyle';
import Live from './component/live/Live';
import LiveDetail from './component/live/LiveDetail'
import Guide from './component/guide/Guide';
import Notifications from './component/notifications/Notifications';
import Admin from './component/admin/Admin';
import { SoundProvider } from './soundEffects/soundContext';
import SignUp from './component/member/SignUp'
import './App.css';
import { useEffect } from 'react';
import { generateToken } from './component/notifications/firebase';
import Login from './component/member/Login'
import { AxiosError } from "axios";
import NotificationDetail from './component/notifications/NotificationDetail';
import RankingList from './component/ranking/RankingList';

const App = () => {

  useEffect(() => {
    generateToken();
  }, []);

  const handleLoginSuccess = () => {
    console.log("로그인 성공!");
    alert("로그인 성공!");
};

// 로그인 실패 시 실행될 함수
const handleLoginFail = (error: unknown) => {
  if (error instanceof AxiosError) {
      console.error("로그인 실패:", error.message);
      alert("로그인 실패: " + error.message);
  } else {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred");
  }
};

  return (
    <Router>
      <GlobalStyle />
      <SoundProvider>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <MainSection />
            <MainSection2/>
            <MainSection3/>
            <MainSection4/>
            <MainSection5/>
          </> }
        /> 
        <Route path="/live" element={
          <Live />
        }  />
        <Route path="/live/:userId" element={
          <LiveDetail /> // 사용자 상세 페이지 경로
        } /> 
        <Route path="/guide" element={
          <Guide />
        } />
        <Route path="/notifications" element={
          <Notifications />
        } />
        <Route path="/notifications/:noticeId" element={
          <NotificationDetail />
        } />
        <Route path="/admin" element={
          <Admin />
        } />
        <Route path="/ranking" element={
          <RankingList />
        } />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={
                    <Login 
                        // onLoginSuccess={handleLoginSuccess} 
                        // onLoginFail={handleLoginFail} 
                        // onLogin={(username, password) => console.log(username, password)}
                    />
                } />
      </Routes>
      </SoundProvider>
      <Footer />
    </Router>
  );
}

export default App;
