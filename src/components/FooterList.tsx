import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "../constants/theme";

const FooterList = () => {
  return (
    <View style={{ padding: 24, alignItems: "center" }}>
      <ActivityIndicator color={COLORS.text} size={"small"} />
    </View>
  );
};

export default FooterList;
