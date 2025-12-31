import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";

const Cards = ({ post }: { post: any }) => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text style={styles.title}>{post?.title}</Text>
        <Text style={styles.body}>{post?.body}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 400,
    borderRadius: 10,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    marginTop: 10,
  },
});

export default Cards;
