import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Card from "../components/Card";
import SideBar from "../components/Sidebar";
import data from "../data/data.json";
import { Element } from "../interfaces";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Product: { product: any };
  ImageViewer: {
    productId: string;
    categoryId: string;
    productIdFilter: string;
  };
};
const ProductScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { product } = route.params;

  const allElements: Element[] = data.elements
    .filter((el) => el.productId === product.id)
    .map((el) => ({
      ...el,
      type: el.type as "img" | "pdf",
    }));

  const groupedSupports = getCategoryGroups(data.categories, allElements);
  const [selectedGroup, setSelectedGroup] = useState(groupedSupports[0]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>
            {`${product.name} : ${selectedGroup?.name}` || "Choisir un support"}
          </Text>

          {selectedGroup?.products?.length ? (
            <View style={styles.grid}>
              {selectedGroup.products.map((element, index) => (
                <Card
                  key={index}
                  product={element}
                  onPress={() =>
                    navigation.navigate("ImageViewer", {
                      productId: element.id,
                      categoryId: element.group,
                      productIdFilter: element.productId,
                    })
                  }
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Aucun support à afficher.</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.sidebar}>
        <SideBar items={groupedSupports} onSelectCategory={setSelectedGroup} />
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

/**
 * Groups elements by matching their `group` with the categories list.
 */
function getCategoryGroups(categories: any[], elements: Element[]) {
  return categories.map((category, index) => {
    const categoryItems = elements.filter(
      (el) => el.group?.toLowerCase() === category.name.toLowerCase()
    );

    return {
      id: category.id ?? `cat${index}`,
      name: category.name,
      color: category.color,
      products: categoryItems,
    };
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 4,
    backgroundColor: "#f9f9f9",
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  sidebar: {
    width: 80,
    backgroundColor: "#ffffff",
    borderLeftWidth: 1,
    borderLeftColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});
