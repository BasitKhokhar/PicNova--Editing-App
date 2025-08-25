import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SplashScreen3 = ({ onNext }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/splashscreens/splash-screen3`)
      .then((response) => response.json())
       .then((data) => setImageUrl(data.image_url))
      .catch((error) => console.error("Error fetching image:", error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.title}>AI-Powered Enhancements at Your Fingertips</Text>
        <Text style={styles.description}>
          Experience ultra-fast AI image improvements. Restore, retouch, and upscale in seconds — all with a single tap.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
  },
  topcontainer: {
    width: "100%",
    height: "20%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: "#8b3dff",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: 'hidden'
  },
  image: {
    marginTop: '30%',
    width: "85%",
    height: "100%",
    resizeMode: "stretch",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
   
  },
  contentcontainer:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    paddingHorizontal:20,
    paddingVertical:20,
    gap:'10'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8b3dff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    textAlign:'justify',
    paddingHorizontal:20
  },
  button: {
    backgroundColor: "#8b3dff",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 80,
    width: "100%"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SplashScreen3;
