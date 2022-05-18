import React, { useState } from 'react';
import axios from 'axios';
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

function AddFood({ addFoods }) {
  const [find, setFind] = useState(false);
  const [inputText, setInputText] = useState('');
  const [chooseFood, setChooseFood] = useState(false);
  const [pickFood, setPickFood] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchList, setSearchList] = useState([]);
  const handleReport = (event) => {
    event.preventDefault();
    if (inputText === null || inputText === '') {
      axios.get('https://localhost:4000/mealkit').then((resp) => {
        setSearchList(resp.data.data);
      });
    } else {
      axios
        .get(`https://localhost:4000/mealkit/find/${inputText}`)
        .then((resp) => {
          console.log(resp.data.data);
          resp.data.data.length === 0
            ? alert('검색결과가 없습니다')
            : setSearchList(resp.data.data)
        }
        );
    }
    setFind(true);
    setChooseFood(false);
  };
  console.log(inputText);
  const handleChangeInput = (event) => {
    setInputText(event.target.value);
  };
  const handleChooseFood = (food) => {
    setFind(false);
    setChooseFood(true);
  };
  const clickAdd = () => {
    addFoods({ kit_id:pickFood.id, name: pickFood.kit_name, quantity: quantity, kcal: pickFood.kcal });
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
        {find === true ? (
          <FoodList setPickFood={setPickFood} searchList={searchList} />
        ) : null}
      </div>
      {chooseFood === true ? (
        <Foodinfo pickFood={pickFood} setQuantity={setQuantity} />
      ) : null}
      <RowDiv>
        <button
          onClick={() => {
            clickAdd(pickFood);
          }}
        >
          추가하기
        </button>
      </RowDiv>
    </ContainerDiv>
  );
}
export default AddFood;
