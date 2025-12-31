import IonIcon from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { IPostCard } from "../types";

const PostCard = ({
  post,
  onPress,
  onPressLike,
  onPressDislike,
}: IPostCard) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <IonIcon
        name={post?.isLiked ? "heart" : "heart-outline"}
        size={24}
        color="red"
        onPress={() =>
          post?.isLiked ? onPressDislike(post.id) : onPressLike(post.id)
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: "#666",
  },
});

export default React.memo(PostCard);
