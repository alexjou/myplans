import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import LocationImg from "../../assets/images/location.png";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import CustomTitle from "./atoms/CustomTitle";
import CustomButton from "./atoms/CustomButton";

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 16px;
  margin-top: 15px;
  align-items: center;
`;

const ButtonLocation = styled.TouchableOpacity`
  margin-top: 20px;
  width: 150px;
  height: 40px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const navigator = useNavigation();

  //Get MyLocation
  const myLocation = () =>
    (async function () {
      const { status, permissions } = await Permissions.askAsync(
        Permissions.LOCATION
      );
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        navigator.navigate("Plans", {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });
      } else {
        throw new Error("Location permission not granted");
      }
    })();

  return (
    <Container>
      <CustomTitle title="Escolha o local" />
      <ButtonLocation onPress={() => myLocation()}>
        <Image source={LocationImg} />
        <Text>Localização Atual</Text>
      </ButtonLocation>
      <View style={{ minWidth: "100%", minHeight: "43%", marginTop: "5%" }}>
        <GooglePlacesAutocomplete
          placeholder="Para onde vamos?"
          onPress={(data, details = null) => {
            navigator.navigate("Plans", {
              lat: details.geometry.location.lat,
              lon: details.geometry.location.lng,
            });
          }}
          query={{
            key: "AIzaSyCdVpLGWsO8ElUDwjjKRJtsqs01QynqPXs",
            language: "pt-br",
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={{ listView: { height: 1000 } }}
        />
      </View>
      <CustomButton onPress={() => navigator.goBack()} title="Voltar" />
    </Container>
  );
}
