import React from "react";
import styled from "styled-components/native";

const Title = styled.Text`
  font-size: 40px;
  margin-bottom: 20px;
`;
const CustomTitle = ({ title }) => <Title>{title}</Title>;

export default CustomTitle;
