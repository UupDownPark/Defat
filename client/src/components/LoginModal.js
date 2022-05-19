import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const RowDiv = styled.div`
  margin: 5px;
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: ${(props) => (props.primary ? 'none' : 'space-around')};
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Logoimage = styled.img`
  margin: 10px;
  width: 16vh;
  height: 16vh;
`;
const OauthLogin = styled.div`
  margin: 4px;
  height: 4vh;
  width: 33vw;
  background-color: ${(props) =>
    props.primary === '1'
      ? 'yellow'
      : props.primary === '2'
      ? 'green'
      : props.primary === '0'
      ? 'black'
      : 'tomato'};
  color: ${(props) =>
    props.primary === '1'
      ? 'black'
      : props.primary === '2'
      ? 'black'
      : props.primary === '0'
      ? 'white'
      : 'black'};
  text-align: center;
  flex: auto;
  padding-top: 20px;
  border-radius: 10px;
`;
const Signupbutton = styled.button`
  height: 2vw;
  width: 8vw;
  text-align: center;
  padding: 10px;
  align-items: center;
`;

const Xbutton = styled.button`
  height: 1vw;
  width: 1vw;
  float: right;
  text-align: right;
  align-items: center;
  padding: 3px;
`;
const Input = styled.input`
  height: 1vw;
  width: 12vw;
`;

const A = styled.a`
  text-align: center;
  align-items: center;
  padding: 5px;
  width: 60%;
`;

function LoginModal({ handleLoginSuccess, setuserInfo, controlClose }) {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });
  const [errMessage, setErrMessage] = useState('');
  const handleLoginInfo = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = (e) => {
    if (!loginInfo.userId || !loginInfo.password) {
      setErrMessage('잘못된 정보입니다');
    } else {
      axios
        .post('https://localhost:4000/auth/login', loginInfo)
        .then(() => handleLoginSuccess())
        .then(() => {
          return axios.get(
            `https://localhost:4000/user/mypage/${loginInfo.userId}`
          );
        })
        .then((res) => setuserInfo(res.data.data.userInfo))
      controlClose(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => controlClose(false)}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '29%',
          right: '32%',
          bottom: '30%',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        },
      }}
    >
      <Xbutton onClick={() => controlClose(false)}>X</Xbutton>
      <ColumnDiv>
        <Logoimage src="img/logo.png"></Logoimage>

        <RowDiv>
          <ColumnDiv>
            <div>아이디</div>
            <div>비밀번호</div>
          </ColumnDiv>

          <ColumnDiv>
            <Input
              type="text"
              placeholder="아이디를 입력하세요"
              onChange={handleLoginInfo('userId')}
            ></Input>
            <Input
              type="password"
              onChange={handleLoginInfo('password')}
            ></Input>
          </ColumnDiv>
        </RowDiv>

        <RowDiv>
          <RowDiv primary>
            <input type="checkbox"></input>
            <div>로그인 유지하기</div>
          </RowDiv>
          <A>아이디/비밀번호 찾기</A>
        </RowDiv>
        <OauthLogin primary="0" onClick={handleLogin}>
          로그인
        </OauthLogin>
        <OauthLogin primary="1">카카오톡 로그인</OauthLogin>
        <OauthLogin primary="2">네이버 로그인</OauthLogin>
        <OauthLogin>구글 로그인</OauthLogin>
        <Link to="/signin">
          {<Signupbutton onClick={() => controlClose(false)}>회원가입</Signupbutton>}
        </Link>
      </ColumnDiv>
    </Modal>
  );
}

export default LoginModal;
