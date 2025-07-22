import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

/**
 * Copies a local asset (like a PDF or image from the assets folder) to device storage and opens the share dialog.
 *
 * @param assetModule - Use `require('path/to/asset')`
 * @param targetFileName - Desired filename (e.g. 'document.pdf')
 * @returns The saved file URI or null
 */
export async function copyAndShareLocalAsset(
  assetModule: number,
  targetFileName: string
): Promise<string | null> {
  try {
    const asset = Asset.fromModule(assetModule);
    await asset.downloadAsync();

    if (!asset.localUri) {
      Alert.alert("Erreur", "Fichier local introuvable.");
      return null;
    }

    const targetUri = FileSystem.documentDirectory + targetFileName;

    await FileSystem.copyAsync({
      from: asset.localUri,
      to: targetUri,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(targetUri);
    } else {
      Alert.alert(
        "Info",
        "Fichier enregistré mais le partage n'est pas disponible."
      );
    }

    return targetUri;
  } catch (error) {
    console.error("copyAndShareLocalAsset error:", error);
    Alert.alert("Erreur", "Impossible de copier ou partager le fichier.");
    return null;
  }
}
