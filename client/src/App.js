import React, { useEffect,useState } from 'react';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import Mealkit from './pages/Mealkit';
import TodayMeal from './pages/TodayMeal';
import MyPage from './pages/MyPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import styled from 'styled-components';
import Signin from './components/Signin';
import axios from 'axios'
//로그인, 회원가입 기능
//2. 로그인 여부에 따라 메세지 띄워주기
// MealKitList 태그 추가 기능
// 키/몸무게로 기초대사량 구하는 알고리즘


const Div= styled.div`
  height : 60vw;
  min-height: 100%;
  
`
const Body =styled.div`
  height : auto;
  min-height: 100%;
  padding-bottom: 6vw;
`
function App() {
  const [isLogin,setIsLogin] = useState(false)
  const [userInfo,setuserInfo] = useState({userId:'',password:'',nickname:''})
  const handleLoginSuccess=()=>{
    setIsLogin(true)
    
    console.log('되네')
  }
  
  return (
    
    <Div>
    <Router>
      <Header handleLoginSuccess={handleLoginSuccess} setuserInfo={setuserInfo} isLogin={isLogin} setIsLogin={setIsLogin} userInfo={userInfo}/>
      <Body>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/Mealkit" element={<Mealkit />} />
        <Route path="/TodayMeal" element={<TodayMeal isLogin={isLogin} />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
      </Body>
      
    </Router>
    <Footer />
    </Div>
    
  );
}

export default App;
