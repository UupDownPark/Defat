import React, { useState } from "react";
import styled from "styled-components";


const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const Div = styled.div`
  align-self: center;
  margin-bottom: 5px;
  font-weight: ${(props) => props.bold? 'bold':null};
`
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const Img = styled.img`
width: 100%;
height: 50%;
  margin-bottom:5px;
`
const Input =styled.input`
  margin-left: 5px;
  text-align: end;
  width: 40px;
`

function Foodinfo({pickFood, setQuantity}){
  const [thisQuantity, setThisQuantity] = useState(1)
  const handleQuantityChange = (e) => {
    setThisQuantity(e.target.value)
    setQuantity(Number(e.target.value))
  }
  return (
    <ContainerDiv>
      <Img src={pickFood.image}></Img>
      <Div bold={true}>{pickFood.kit_name}</Div>
      <Div>{Number(pickFood.kcal)*thisQuantity} kcal</Div>
      <RowDiv>
      <Div>수량: </Div>
      <Input min={0} defaultValue={1} type='number' onChange={handleQuantityChange}></Input>
      </RowDiv>
    </ContainerDiv>

  )
}

export default Foodinfo