import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

const App = () => {
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current && canGoBack) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, [canGoBack]);

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: "https://digicafe.in" }}
          onError={(error) => {
            console.error("WebView error:", error);
            Alert.alert("Error", "Failed to load the page.");
          }}
          style={styles.container}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </View>
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;
