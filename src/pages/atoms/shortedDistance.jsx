import React from "react";
import { View } from "react-native";
import { getDistanceFromCoordinates } from "../../services/distance";

export const shortedDistance = (coordinate, data) => {
  const plans = [];
  const plan1 = [];
  const plan2 = [];
  const plan3 = [];
  const plan4 = [];
  const tvs = [];
  const broadbands = [];
  const landlines = [];
  const addons = [];

  data.map((details, index) => {
    <View key={index}></View>;
    switch (details.type) {
      case "TV":
        const distTV = getDistanceFromCoordinates(
          coordinate.lat,
          coordinate.lon,
          details.coords.lat,
          details.coords.lon
        );
        tvs.length == 0
          ? tvs.push({ ...details, dist: distTV })
          : tvs[0].dist > distTV
          ? tvs?.splice(0, 1, { ...details, dist: distTV })
          : null;

        break;
      case "BROADBAND":
        const distBroad = getDistanceFromCoordinates(
          coordinate.lat,
          coordinate.lon,
          details.coords.lat,
          details.coords.lon
        );
        broadbands.length == 0
          ? broadbands.push({ ...details, dist: distBroad })
          : broadbands[0].dist > distBroad
          ? broadbands?.splice(0, 1, { ...details, dist: distBroad })
          : null;
        break;
      case "LANDLINE":
        const distLand = getDistanceFromCoordinates(
          coordinate.lat,
          coordinate.lon,
          details.coords.lat,
          details.coords.lon
        );
        landlines.length == 0
          ? landlines.push({ ...details, dist: distLand })
          : landlines[0].dist > distLand
          ? landlines?.splice(0, 1, { ...details, dist: distLand })
          : null;
        break;
      case "ADDON":
        const distAdd = getDistanceFromCoordinates(
          coordinate.lat,
          coordinate.lon,
          details.coords.lat,
          details.coords.lon
        );
        addons.length == 0
          ? addons.push({ ...details, dist: distAdd })
          : addons[0].dist > distAdd
          ? addons?.splice(0, 1, { ...details, dist: distAdd })
          : null;
        break;
      default:
        console.log("Nenuma rota encontrada");
    }
  });
  const distancePlan1 =
    tvs[0].dist + landlines[0].dist + broadbands[0].dist + addons[0].dist;

  const distancePlan2 = tvs[0].dist + broadbands[0].dist + addons[0].dist;

  const distancePlan3 = tvs[0].dist + +landlines[0].dist + addons[0].dist;

  const distancePlan4 = tvs[0].dist + broadbands[0].dist;

  const pricePlan1 =
    tvs[0].price +
    broadbands[0].price +
    landlines[0].price +
    addons[0].price +
    distancePlan1;

  const pricePlan2 =
    tvs[0].price + broadbands[0].price + addons[0].price + distancePlan1;

  const pricePlan3 =
    tvs[0].price + landlines[0].price + addons[0].price + distancePlan1;

  const pricePlan4 = tvs[0].price + broadbands[0].price + distancePlan1;

  plan1.push({
    namePlan: "Pacote 1",
    tv: tvs[0],
    broad: broadbands[0],
    land: landlines[0],
    add: addons[0],
    distancePlan: distancePlan1,
    pricePlan: pricePlan1,
  });
  plan2.push({
    namePlan: "Pacote 2",
    tv: tvs[0],
    broad: broadbands[0],
    add: addons[0],
    distancePlan: distancePlan2,
    pricePlan: pricePlan2,
  });
  plan3.push({
    namePlan: "Pacote 3",
    tv: tvs[0],
    land: landlines[0],
    add: addons[0],
    distancePlan: distancePlan3,
    pricePlan: pricePlan3,
  });
  plan4.push({
    namePlan: "Pacote 4",
    tv: tvs[0],
    broad: broadbands[0],
    distancePlan: distancePlan4,
    pricePlan: pricePlan4,
  });
  plans.push(plan1, plan2, plan3, plan4);

  return plans;
};
