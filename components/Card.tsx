import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { productImageMap, pdfMap } from "../helpers/productImageMap";
import { copyAndShareLocalAsset } from "../helpers/copyAndShareLocalAsset";

// Replace this with your own local icon for PDFs
const defaultPdfIcon = require("../assets/pdf_icon.png");

type Product = {
  id: string;
  name: string;
  productImg?: string;
  category?: string;
  fileUrl?: string;
};

interface CardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

const Card: React.FC<CardProps> = ({ product, onPress }) => {
  const isPdf = product.fileUrl?.endsWith(".pdf");
  const imageKey =
    (product.productImg?.split(".")[0] || product.fileUrl?.split(".")[0]) ??
    "default";
  const imageSource = isPdf
    ? defaultPdfIcon
    : productImageMap[imageKey] || productImageMap["default"];
  const handlePress = async () => {
    if (isPdf && product.fileUrl) {
      const key = product.fileUrl
        .replace("assets/files/", "")
        .replace(".pdf", "")
        .trim();
      const assetModule = pdfMap[key];
      console.log(assetModule);

      if (!assetModule) {
        Alert.alert("Erreur", `Fichier introuvable pour: ${key}`);
        return;
      }

      const result = await copyAndShareLocalAsset(assetModule, `${key}.pdf`);
      if (result) {
        return;
      }
    } else {
      onPress?.(product);
    }
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.label}>{product.name}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    resizeMode: "contain",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
  },
});
