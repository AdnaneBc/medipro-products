import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function PDFViewer() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/fiches-pharma.firebasestorage.app/o/formations%2FArgumentaire_kalmatonine.pdf?alt=media&token=40ba767e-0fb8-4ff1-84f7-2ebe39af6c25",
        }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        useWebKit
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
