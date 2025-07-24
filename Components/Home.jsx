import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ImageSlider from "./Sliders/Slider";
import UserNameDisplay from "./User/UserNameDisplay";
// import UserGallery from "./Homescreen/SelectUsergallery";
import SelectImageGallery from "./Homescreen/SelectImageGallery";
import PromptSelectGallery from "./Homescreen/PropmtSelectGallery";
import EnhancedImageGallery from "./Homescreen/EnhancedImagesGallery";
import PromptInputComponent from "./Homescreen/PromptinputComponent";
import BrandSlider from "./Sliders/BrandSlider";
import CustomerSupportoptions from "./User/CustomerSupportoptions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./Loader/Loader";
import Constants from "expo-constants";
import FeaturedGrid from "./Homescreen/Featuredgrid";
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [homeData, setHomeData] = useState({
    sliderData: [],
    EnhancedGalleryData: [],
  });

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, []);

  const fetchData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log("User ID from AsyncStorage:", storedUserId);
      const endpoints = [
        { key: "sliderData", url: `${API_BASE_URL}/content/sliderimages` },
        { key: "EnhancedGalleryData", url: `${API_BASE_URL}/replicate/enhanced-images?userId=${storedUserId}` },
      ];

      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(endpoint.url)
            .then((res) => res.json())
            .then((data) => ({ key: endpoint.key, data }))
            .catch(() => ({ key: endpoint.key, data: [] }))
        )
      );

      const updated = responses.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
      }, {});

      setHomeData(updated);
    } catch (error) {
      console.error("Home data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      handleRefresh();
    }
  };
  console.log("homedata", homeData)
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }
  console.log("enahanced gallery data in homescreen", homeData.EnhancedGalleryData)
  const sections = [
    // { key: "user", render: () => <UserNameDisplay /> },
    { key: "slider", render: () => <ImageSlider sliderData={homeData.sliderData} /> },
    { key: "Featuredgrid", render: () => <FeaturedGrid /> },
    { key: "Featuredgridinput", render: () => <PromptInputComponent defaultModel="prunaai/hidream-l1-fast:91752cc0b07ccd5976f1db2b6b7f10296ac12d6cb2ba87056f79b17ffacca5f5" /> },
    // { key: "PropmtSelctedusergallery", render: () => <PromptSelectGallery/> },
    { key: "Enhancedusergallery", render: () => <EnhancedImageGallery EnhancedGallerydata={homeData.EnhancedGalleryData} /> },

  ];

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <View>{item.render()}</View>}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      initialNumToRender={2}
      windowSize={5}
      maxToRenderPerBatch={3}
      updateCellsBatchingPeriod={100}

      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 120,
    backgroundColor: "#F8F9FA",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
