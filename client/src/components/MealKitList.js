import React from 'react';
import styled from 'styled-components';
const Img = styled.img`
  align-items: center;
  width: 16vh;
  height: 16vh;
  margin: 20px 0px;
`;

const Ul = styled.ul`
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
`;
const Div = styled.div`
  padding: 0;
  margin-top:15px;
  font-weight: ${(props) => props.bold? 'bold':null};
`
const Li = styled.li`
    position: relative;
    display: inline-block;
    height:100%;
    width: 27vw;
    margin: 0 30px 30px 0;
    list-style: none;
    vertical-align: top;
    border: 2px solid black;
`;

const MealContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width:100%;
  height:100%;
  background-color: aliceblue;
`
const NameandPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0 30px 0;
  width:80%;
  height:50%;
`

function MealKitList({dataList}) {
  return (
    <Ul>
      {dataList.map((list) => {
        return  <Li key={list.id}>
        <MealContainer>
        <Img src={list.image}></Img>
        <Div bold={true}>{list.kit_name}</Div>
        <Div>{list.kcal}kcal</Div>
        <NameandPrice>
          <Div>{list.brand}</Div>
          <Div>{list.price}원</Div>
        </NameandPrice>
        </MealContainer>
      </Li>
      })}
    </Ul>
  );
}

export default MealKitList;
