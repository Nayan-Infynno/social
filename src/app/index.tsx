import { COLORS } from "@/src/constants/theme";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import AppHeader from "../components/AppHeader";
import CategoryItem from "../components/CategoryItem";
import {
  useGetCategories,
  useProductsBySubCategory,
  useSubCategories,
} from "../hooks/use-ceramic";

const index = () => {
  const [selectedId, setSelectedId] = useState<number | null>(59);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [finalData, setFinalData] = useState([]);

  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategories({
    CategoryId: 0,
    DeviceManufacturer: "Google",
    DeviceModel: "Android SDK built for x86",
    DeviceToken: " ",
    PageIndex: 2,
  });

  const {
    data: subCategoriesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSubCategories(selectedId);

  const {
    data,
    fetchNextPage: fetchNextPageProducts,
    hasNextPage: hasNextPageProducts,
    isFetchingNextPage: isFetchingNextPageProducts,
    isLoading: isLoadingProducts,
  } = useProductsBySubCategory(Number(subCategoryId));

  const paginatedProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.Result) ?? [];
  }, [data]);

  const subCategories =
    subCategoriesData?.pages.flatMap(
      (page) => page.Result.Category[0].SubCategories
    ) ?? [];

  useEffect(() => {
    if (!subCategoryId) return;
    const response = subCategories.map((item) => {
      if (item?.Id === subCategoryId) {
        return {
          ...item,
          Product: [...(item?.Product || []), ...paginatedProducts],
        };
      } else {
        return item;
      }
    });
    setFinalData(response);
  }, [data]);

  const getCategories = useMemo(() => {
    return (
      categories?.Result?.Category?.flatMap((page: any) => page || []) || []
    );
  }, [categories]);

  const renderProduct = ({ item }: { item: any }) => (
    <View style={{ width: 140, marginRight: 12 }}>
      <Image
        source={{ uri: item.ImageName }}
        style={{ width: 140, height: 140, borderRadius: 8 }}
      />
      <Text numberOfLines={2}>{item.Name}</Text>
      <Text>{item.PriceCode}</Text>
    </View>
  );

  const onProductEndReached = (id: number) => {
    setSubCategoryId(id);

    if (hasNextPageProducts && !isFetchingNextPageProducts) {
      fetchNextPageProducts();
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title=""
        isShowRightMenu
        rightMenuTitle="pencil"
        onPressRightMenu={() => router.navigate("/posts/create-post")}
      />
      <View>
        <FlatList
          horizontal
          bounces={false}
          data={getCategories ?? []}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              selected={item.Id === selectedId}
              onPress={() => setSelectedId(item.Id)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            backgroundColor: COLORS.headerColor,
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={subCategoryId ? finalData : subCategories}
          keyExtractor={(item) => item?.Id?.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                {item?.Name}
              </Text>

              <FlatList
                data={item?.Product}
                keyExtractor={(prod) => prod?.Id?.toString()}
                renderItem={renderProduct}
                horizontal
                showsHorizontalScrollIndicator={false}
                onEndReached={() => onProductEndReached(item?.Id)}
                onEndReachedThreshold={0.5}
              />
            </View>
          )}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
        />
      </View>
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
