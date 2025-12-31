import { TextStyle, ViewStyle } from "react-native";

export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPostCard {
  post: IPosts;
  onPress: () => void;
}

export interface IEmptyList {
  title?: string;
  isLoadingContent?: boolean;
}

export interface IAppHeader {
  isShowBack?: boolean;
  onBackPress?: () => void;
  title: string;
  isShowRightMenu?: boolean;
  rightMenuTitle?: string;
  onPressRightMenu?: () => void;
  contentStyles?: ViewStyle;
  textStyle?: TextStyle;
}
