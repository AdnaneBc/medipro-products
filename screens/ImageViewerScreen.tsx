import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import data from "../data/data.json";
import { productImageMap } from "../helpers/productImageMap";

type ImageViewerRouteParams = {
  productId: string;
  categoryId: string;
  productIdFilter: string;
};

const ImageViewerScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();

  const { productId, categoryId, productIdFilter } =
    route.params as ImageViewerRouteParams;

  const [imageUrls, setImageUrls] = useState<
    { url: string; props: { source: any } }[]
  >([]);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    const filteredElements = data.elements.filter(
      (e) => e.group === categoryId && e.productId === productIdFilter
    );

    const images = filteredElements.map((el) => {
      const key = el.fileUrl.replace(".png", "").trim();
      return {
        url: "",
        props: {
          source: productImageMap[key],
        },
      };
    });

    const index = filteredElements.findIndex((el) => el.id === productId);
    setImageUrls(images);
    setInitialIndex(index >= 0 ? index : 0);
  }, [productId, categoryId, productIdFilter]);

  if (imageUrls.length === 0) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <ImageViewer
        imageUrls={imageUrls}
        index={initialIndex}
        backgroundColor="black"
        enableSwipeDown
        onSwipeDown={() => navigation.goBack()}
        loadingRender={() => <ActivityIndicator size="large" color="#fff" />}
        saveToLocalByLongPress={false}
        enablePreload
      />
    </View>
  );
};

export default ImageViewerScreen;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  loading: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontSize: 24,
  },
});
