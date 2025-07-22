import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from "react-native";
import SideBar from "../components/Sidebar";
import Card from "../components/Card";
import data from "../data/data.json";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Product } from "../interfaces";

export type RootStackParamList = {
  Home: undefined;
  Product: { product: any };
};
const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { gammes, products } = data;

  const categoryItems = gammes.map((gamme) => ({
    id: gamme.id,
    name: gamme.name,
    color: gamme.color,
    products: products.filter((p) => p.gammes.includes(gamme.id)),
  }));

  const handleCardPress = (product: any) => {
    navigation.navigate("Product", { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>
            {selectedCategory?.name || "Merci de choisir une catégorie"}
          </Text>

          {selectedCategory?.products?.length ? (
            <View style={styles.grid}>
              {selectedCategory.products.map(
                (product: Product, index: number) => (
                  <Card
                    key={index}
                    product={product}
                    onPress={handleCardPress}
                  />
                )
              )}
            </View>
          ) : (
            <Text style={styles.emptyText}>Aucun produit à afficher.</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.sidebar}>
        <SideBar items={categoryItems} onSelectCategory={setSelectedCategory} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "90%",
  },
});
