// src/components/SideBar.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Category = {
  id: string;
  name: string;
  color: string;
  products: any[]; // You can replace 'any' with a proper Product[] type if defined
};

interface SideBarProps {
  items: Category[];
  onSelectCategory: (category: Category) => void;
}

const SideBar: React.FC<SideBarProps> = ({ items, onSelectCategory }) => {
  const selectCategoryHandler = (id: string) => {
    const selectedCategory = items.find((category) => category.id === id);
    if (selectedCategory) {
      onSelectCategory(selectedCategory);
    }
  };

  return (
    <View style={styles.sidebar}>
      {items.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.sidebarItem, { backgroundColor: category.color }]}
          onPress={() => selectCategoryHandler(category.id)}
          accessibilityLabel={`Category: ${category.name}`}
        >
          <Text style={styles.verticalText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  sidebar: {
    width: 90,
    flex: 1,
  },
  sidebarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  verticalText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    transform: [{ rotate: "90deg" }],
    textAlign: "center",
    width: 100,
  },
});
