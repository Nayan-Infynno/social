import { COLORS } from "@/src/constants/theme";
import { usePostPaginated } from "@/src/hooks/api-hooks/use-post";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/AppHeader";
import EmptyList from "../components/EmptyList";
import FooterList from "../components/FooterList";
import PostCard from "../components/PostCard";
import { removeLikePost, setLikePost } from "../slices/like-post-slice";
import { ILikePostSlice, IPosts } from "../types";

const index = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const { likePost } = useSelector((state: ILikePostSlice) => state.likePost);

  const {
    data: posts,
    isLoading: isPostsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: isFetchingNextPosts,
    isRefetching: isRefreshingPosts,
    refetch,
  } = usePostPaginated();

  const getPost = useMemo(() => {
    return posts?.pages?.flatMap((page: any) => page || []) || [];
  }, [posts]);

  const getFinalPost = useMemo(() => {
    return getPost.map((post: any) => {
      const isLiked = likePost.some((like: any) => like === post.id);
      return { ...post, isLiked };
    });
  }, [posts, likePost]);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return getFinalPost;

    const lowerSearch = search.toLowerCase();

    return getFinalPost.filter((post: IPosts) =>
      post.title.toLowerCase().includes(lowerSearch)
    );
  }, [search, getFinalPost]);

  const onLikeHandler = useCallback((item: IPosts) => {
    dispatch(setLikePost(item.id));
  }, []);

  const onDislikeHandler = useCallback((item: IPosts) => {
    dispatch(removeLikePost(item.id));
  }, []);

  const handlePostPress = useCallback((item: IPosts) => {
    router.navigate({
      pathname: "/posts/create-post",
      params: { postId: item.id.toString(), post: JSON.stringify(item) },
    });
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader
        title="List of Posts"
        isShowRightMenu
        rightMenuTitle="pencil"
        onPressRightMenu={() => router.navigate("/posts/create-post")}
      />
      <TextInput
        mode="outlined"
        label="Search"
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => handlePostPress(item)}
            onPressLike={() => onLikeHandler(item)}
            onPressDislike={() => onDislikeHandler(item)}
          />
        )}
        extraData={likePost}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyList isLoadingContent={isPostsLoading} />}
        ListFooterComponent={isFetchingNextPosts ? <FooterList /> : null}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshingPosts}
            onRefresh={refetch}
            tintColor={COLORS.text}
            colors={[COLORS.text]}
            accessibilityLiveRegion="polite"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  search: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});

export default index;
