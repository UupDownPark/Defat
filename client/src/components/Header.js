import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from './LoginModal';
import axios from 'axios'
function Header({handleLoginSuccess,isLogin,setuserInfo,userInfo,setIsLogin}) {
  const Button = styled.button`
    display: inline-block;
    border-radius: 3px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 5rem;
  `;
  const Img = styled.img`
    width: 16vh;
    height: 4vh;
  `;
  const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;
  const ListDiv = styled.div`
    &:hover {
      background-color: skyblue;
      color: blue;
    }
    background-color: gray;
    flex: auto;
    color: black;
    text-align: center;
    width: 33vw;
    padding: 10px;
  `;
  const LoginCompleteDiv = styled.div`
    
  `
  
  const [isOpen, setIsOpen] = useState(false)
  const clickButton = () => {
    setIsOpen(!isOpen)

  }
  const logoutButton = () =>{
    axios.post('https://localhost:4000/auth/logout')
    setIsLogin(false)
    setIsOpen(false)
  }
  console.log(userInfo)
  return (
    <div>
      <Div>
        <Link to="/">
          <Img src="img/logo2.png" />
        </Link>
        {isLogin ?<div>
          <LoginCompleteDiv>어서오시게 {userInfo.nickname} 님 <button onClick={logoutButton}>로그아웃</button></LoginCompleteDiv>
          
          </div>:<Button onClick={clickButton}>로그인</Button>}
         {isOpen? <LoginModal handleLoginSuccess={handleLoginSuccess} setuserInfo={setuserInfo} setIsOpen={setIsOpen} isOpen={isOpen}/>:null}
      </Div>
      <Div>
        <Link to="/Mealkit">
          <ListDiv>다이어트 도시락</ListDiv>
        </Link>
        <Link to="/TodayMeal">
          <ListDiv>오늘의 메뉴</ListDiv>
        </Link>
        <Link to="/MyPage">
          <ListDiv>마이 페이지</ListDiv>
        </Link>
      </Div>
    </div>
  );
}

export default Header;
