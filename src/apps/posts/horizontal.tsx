import AppHeader from "@/src/components/AppHeader";
import Cards from "@/src/components/Cards";
import EmptyList from "@/src/components/EmptyList";
import FooterList from "@/src/components/FooterList";
import PostCard from "@/src/components/PostCard";
import { COLORS } from "@/src/constants/theme";
import { usePostPaginated } from "@/src/hooks/use-post";
import { removeLikePost, setLikePost } from "@/src/slices/like-post-slice";
import { IPosts } from "@/src/types";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

const horizontal = () => {
  const dispatch = useDispatch();
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

  const renderHeader = () => {
    return (
      <FlatList
        horizontal
        data={getPost}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <Cards post={item} />}
        contentContainerStyle={styles.contentContainer}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPosts ? <FooterList /> : null}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="List" />
      <View>
        <Text>Horizontal List</Text>
      </View>
      {/* {renderHeader()} */}

      <FlatList
        data={getPost}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => handlePostPress(item)}
            onPressLike={() => onLikeHandler(item)}
            onPressDislike={() => onDislikeHandler(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
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
  contentContainer: {
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default horizontal;
