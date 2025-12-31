import { router } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";
import { COLORS } from "../constants/theme";
import { IAppHeader } from "../types";

const AppHeader = ({
  isShowBack,
  onBackPress,
  title,
  isShowRightMenu,
  rightMenuTitle = "dots-vertical",
  onPressRightMenu,
  contentStyles,
  textStyle,
}: IAppHeader) => {
  const onBackPressAction = onBackPress
    ? onBackPress
    : () => {
        router.back();
      };
  return (
    <Appbar.Header
      style={{ backgroundColor: COLORS.headerColor, ...contentStyles }}
    >
      {isShowBack && <Appbar.BackAction onPress={onBackPressAction} />}
      <Appbar.Content title={title} titleStyle={{ ...textStyle }} />
      {isShowRightMenu && (
        <Appbar.Action icon={rightMenuTitle} onPress={onPressRightMenu} />
      )}
    </Appbar.Header>
  );
};

export default AppHeader;
