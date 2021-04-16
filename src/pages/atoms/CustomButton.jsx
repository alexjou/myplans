import React from "react";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  width: 60%;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  margin: 5px;
  background-color: #3d8eb9;
  justify-content: center;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #fff;
`;
const CustomButton = ({ onPress, title }) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
export default CustomButton;
