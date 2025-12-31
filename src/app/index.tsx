import { COLORS } from "@/src/constants/theme";
import { usePostPaginated } from "@/src/hooks/api-hooks/use-post";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import AppHeader from "../components/AppHeader";
import EmptyList from "../components/EmptyList";
import PostCard from "../components/PostCard";

const index = () => {
  const {
    data: posts,
    isLoading: isPostsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: isFetchingNextPosts,
    isRefetching: isRefreshingPosts,
    refetch,
  } = usePostPaginated();

  const getPost = useMemo(
    () => posts?.pages?.flatMap((page: any) => page || []) || [],
    [posts]
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title="List of Posts"
        isShowRightMenu
        rightMenuTitle="pencil"
        onPressRightMenu={() => router.navigate("/posts/create-post")}
      />
      <FlatList
        data={getPost}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() =>
              router.navigate({
                pathname: `/posts/create-post`,
                params: {
                  postId: item.id.toString(),
                  post: JSON.stringify(item),
                },
              })
            }
          />
        )}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyList isLoadingContent={isPostsLoading} />}
        ListFooterComponent={() => {
          if (isFetchingNextPosts) {
            return (
              <View style={{ padding: 24, alignItems: "center" }}>
                <ActivityIndicator color={COLORS.text} size={"small"} />
              </View>
            );
          }
          return null;
        }}
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
});

export default index;
