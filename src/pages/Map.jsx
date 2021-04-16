import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import CustomTitle from "./atoms/CustomTitle";
import CustomButton from "./atoms/CustomButton";

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 16px;
  margin-top: 15px;
  align-items: center;
`;

export default function Home({ route }) {
  const navigator = useNavigation();

  //Get all places
  const places = [
    { place: route?.params?.Tv },
    { place: route?.params?.Broad },
    { place: route?.params?.Land },
    { place: route?.params?.Add },
    { place: route?.params?.Mylocation },
  ];

  //Get MyLocation
  const myLocation = { place: route?.params?.Mylocation };

  //Get MyLocation with Delta
  const [origin, setOrigin] = useState(null);

  const mapEl = useRef(null);

  useEffect(() => {
    setOrigin({
      latitude: myLocation.place.place.coords.lat,
      longitude: myLocation.place.place.coords.lon,
      latitudeDelta: 0.200922,
      longitudeDelta: 0.200421,
    });
  }, []);

  return (
    <Container>
      <CustomTitle title="Map" />

      <MapView
        style={{
          width: Dimensions.get("window").width * 0.85,
          height: Dimensions.get("window").height * 0.5,
          margin: 10,
        }}
        initialRegion={origin}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        ref={mapEl}
      >
        {places.map((doc, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: doc?.place?.place?.coords
                ? doc?.place?.place?.coords?.lat
                : myLocation?.place.place.coords.lat,
              longitude: doc?.place?.place?.coords
                ? doc?.place?.place?.coords?.lon
                : myLocation?.place.place.coords.lon,
            }}
            title={doc?.place?.place?.name}
            pinColor={doc?.place?.pin}
            //   image={require("../../../../assets/images/office1.png")}
          />
        ))}
      </MapView>

      <CustomButton title="Voltar" onPress={() => navigator.goBack()} />
    </Container>
  );
}
