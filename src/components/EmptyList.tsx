import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS, SCREEN_HEIGHT } from "../constants/theme";
import { IEmptyList } from "../types";

const EmptyList = ({ title, isLoadingContent }: IEmptyList) => {
  return (
    <View style={styles.container}>
      {isLoadingContent ? (
        <ActivityIndicator color={COLORS.text} size={"small"} />
      ) : (
        <Text>{title || "No content available"}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_HEIGHT / 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmptyList;
