import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, Dimensions } from "react-native";
import { getPlans } from "../services/axios";
import { shortedDistance } from "./atoms/shortedDistance";
import { shortedPrice } from "./atoms/shortedPrice";
import CustomTitle from "./atoms/CustomTitle";
import CustomButton from "./atoms/CustomButton";

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 16px;
  align-items: center;
`;
const Cards = styled.View`
  width: ${Dimensions.get("window").width * 0.8}px;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px;
  justify-content: center;
`;

export default function Home({ route }) {
  const navigator = useNavigation();

  //Get MyLocation
  const myCoordinate = {
    lat: route?.params?.lat,
    lon: route?.params?.lon,
  };

  const [card, setCard] = useState([]);

  //Get places shorted distance with a location
  function getDataDistance() {
    getPlans(myCoordinate).then((doc) => {
      setCard(shortedDistance(myCoordinate, doc.data.list));
    });
  }

  //Get places shorted price with a location
  function getDataPrice() {
    getPlans(myCoordinate).then((doc) => {
      setCard(shortedPrice(myCoordinate, doc.data.list));
    });
  }

  useEffect(() => {
    getDataDistance();
  }, []);

  return (
    <Container>
      <CustomTitle font="15" title="Planos Encontrados" />
      <View
        style={{
          flexDirection: "row",
          marginTop: -30,
          margin: 10,
          padding: 20,
        }}
      >
        <CustomButton
          title="Menor Distância"
          onPress={() => getDataDistance()}
        />
        <CustomButton title="Menor Preço" onPress={() => getDataPrice()} />
      </View>

      {card.map((doc, index) => (
        <FlatList
          data={doc}
          key={index}
          scrollEnabled={false}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigator.navigate("Map", {
                    Tv: { place: item?.tv, pin: "#00ff0d" },
                    Broad: { place: item?.broad, pin: "#FF0000" },
                    Land: { place: item?.land, pin: "#2600ff" },
                    Add: { place: item?.add, pin: "tan" },
                    Mylocation: {
                      place: { coords: myCoordinate },
                      pin: "violet",
                    },
                  })
                }
              >
                <Cards>
                  <Text style={{ marginBottom: 10 }}>{item.namePlan}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: 10,
                    }}
                  >
                    <Text>{item?.tv?.name ? item?.tv?.name + ", " : null}</Text>
                    <Text>
                      {item?.broad?.name ? item?.broad?.name + ", " : null}
                    </Text>
                    <Text>
                      {item?.land?.name ? item?.land?.name + ", " : null}
                    </Text>
                    <Text>{item?.add?.name ? item?.add?.name : null}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>R$ {item?.pricePlan.toFixed(2)}</Text>
                    <Text>{item?.distancePlan.toFixed(0)}km</Text>
                  </View>
                </Cards>
              </TouchableOpacity>
            );
          }}
        />
      ))}
      <CustomButton onPress={() => navigator.goBack()} title="Voltar" />
    </Container>
  );
}
