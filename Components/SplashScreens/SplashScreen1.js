
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SplashScreen1 = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchSplashImage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/splashscreens/splash-image`);
        const data = await response.json();

        if (data && data.image_url) {
          setImageUrl(data.image_url);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching splash image:", error);
      }
    };

    fetchSplashImage();
  }, []);

  return (
    <View style={styles.container}>
      {imageUrl && (
        <Animatable.Image
          animation="zoomIn"
          duration={1500}
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      )}

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Made With <FontAwesome name="heart" size={20} color="red" /></Text>
        <Text style={styles.bottomText}>By Basit khokhar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8b3dff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 400,
    borderRadius: 15,
    resizeMode: "contain",
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: 80,
  },
  bottomText: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: "center",
  },
});

export default SplashScreen1;
