import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";

const CategoryItem = ({
  item,
  selected,
  onPress,
}: {
  item: any;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemWrapper}>
      <Text style={[styles.text, selected && styles.selectedText]}>
        {item.Name}
      </Text>

      {selected && <View style={styles.indicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 12,
    backgroundColor: COLORS.headerColor,
  },
  itemWrapper: {
    marginHorizontal: 12,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#6c8aa7",
    fontWeight: "500",
  },
  selectedText: {
    color: "#ffffffff",
    fontWeight: "700",
    fontSize: 20,
  },
  indicator: {
    marginTop: 6,
    height: 3,
    width: 30,
    borderRadius: 2,
    backgroundColor: "#FFF",
  },
});

export default CategoryItem;
