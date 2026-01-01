import AppHeader from "@/src/components/AppHeader";
import { COLORS } from "@/src/constants/theme";
import { useCreatePost, useUpdatePost } from "@/src/hooks/use-post";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";

const CreatePost = (props: any) => {
  const insets = useSafeAreaInsets();
  const { post } = useLocalSearchParams<{ postId: string; post: string }>();
  const { mutate: createPost, isPending } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  const postDataFromJson = post && JSON.parse(post);
  const [postData, setPostData] = useState({
    title: postDataFromJson?.title || "",
    body: postDataFromJson?.body || "",
    userId: postDataFromJson?.userId.toString() || "",
  });

  const onCreatePost = () => {
    createPost(postData, {
      onSuccess: (response) => {
        response?.status === 201 && toast.success("Post created successfully!");
        setPostData({ title: "", body: "", userId: "" });
        router.back();
      },
      onError: (error) => {
        console.error("Error creating post:", error);
        toast.error("Failed to create post");
      },
    });
  };

  const onUpdatePost = () => {
    if (!postDataFromJson?.id) return;

    updatePost(
      {
        ...postData,
        id: postDataFromJson?.id,
      },
      {
        onSuccess: (response) => {
          response?.status === 200 &&
            toast.success("Post updated successfully!");
          router.back();
        },
        onError: (error) => {
          console.error("Error updating post:", error);
          toast.error("Failed to update post");
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Create Post" isShowBack />

      <View style={styles.inputContainer}>
        <TextInput
          label="Enter post title"
          value={postData.title}
          onChangeText={(text) =>
            setPostData({
              ...postData,
              title: text,
            })
          }
          style={styles.input}
        />
        <TextInput
          label="Enter post body"
          value={postData.body}
          onChangeText={(text) =>
            setPostData({
              ...postData,
              body: text,
            })
          }
          multiline
          numberOfLines={3}
          style={styles.input}
        />
        <TextInput
          label="Enter user-id"
          value={postData.userId}
          onChangeText={(text) =>
            setPostData({
              ...postData,
              userId: text,
            })
          }
          style={styles.input}
        />
      </View>

      <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
        <Button
          mode="contained"
          onPress={postDataFromJson?.id ? onUpdatePost : onCreatePost}
          disabled={
            !postData.title.trim() ||
            !postData.body.trim() ||
            !postData.userId.trim()
          }
          loading={isPending || isUpdating}
          style={styles.buttonStyle}
        >
          {postDataFromJson?.id ? `Update Post` : `Create Post`}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inputContainer: {
    padding: 16,
    gap: 16,
  },
  input: {
    backgroundColor: "#faf5f5",
  },
  buttonContainer: {
    marginHorizontal: 16,
    position: "absolute",
    alignSelf: "center",
    width: "60%",
  },
  buttonStyle: {},
});

export default CreatePost;
