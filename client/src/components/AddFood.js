import React, { useState } from 'react';
import styled from 'styled-components';
import Foodinfo from './FoodInfo';
import FoodList from './FoodList';
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  background-color: gray;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
`;
const Input = styled.input`
  margin-right: 5px;
`;
function AddFood() {
  const [find, setFind] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chooseFood, setChooseFood] = useState(false); // false는 테스트용, 데이터 받아오면 빈문자열로 세팅
  const handleReport = (event) => {
    event.preventDefault();
    setFind(true);
    setChooseFood(false)
  };
  const handleChangeInput = (event) => {
    setInputText(event.target.value);
  };
  const handleChooseFood = (food) => {
    setFind(false);
    setChooseFood(true);
  };

  return (
    <ContainerDiv>
      <RowDiv>
        <form onSubmit={handleReport}>
          <Input onChange={handleChangeInput} type="text"></Input>
          <button>검색</button>
        </form>
      </RowDiv>
      <div onClick={handleChooseFood}>
      {find === true ? <FoodList /> : null}
      </div>
      {chooseFood === true ? <Foodinfo /> : null}
      <RowDiv>
        <button>추가하기</button>
      </RowDiv>
    </ContainerDiv>
  );
}
export default AddFood;