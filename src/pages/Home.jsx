import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import CustomButton from "./atoms/CustomButton";
import CustomTitle from "./atoms/CustomTitle";

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 16px;
  align-items: center;
`;

const Contents = styled.Text`
  text-align: center;
  font-size: 24px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 85px;
`;

export default function Home() {
  const navigator = useNavigation();

  return (
    <Container>
      <CustomTitle title="Meu Plano" />
      <Contents>
        Escolha entre vários planos próximo a sua casa. Disponibilizamos
        serviços como: TV, Broadband, Landline e Addon.
      </Contents>

      <CustomButton
        onPress={() => navigator.navigate("Address")}
        title="Procurar"
      />
    </Container>
  );
}
