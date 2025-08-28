// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useTheme } from "../../Context/ThemeContext";
// import ImageSlider from "../../Components/Sliders/Slider";
// // import UserNameDisplay from "./User/UserNameDisplay";

// // import SelectImageGallery from "./Homescreen/SelectImageGallery";
// // import PromptSelectGallery from "./Homescreen/PropmtSelectGallery";

// import EnhancedImageGallery from "./EnhancedImagesGallery";
// import PromptInputComponent from "./PromptinputComponent";
// // import BrandSlider from "./Sliders/BrandSlider";
// // import CustomerSupportoptions from "./User/CustomerSupportoptions";
// // import GalleryScreen from "./Sliders/samplegallery";
// import FeaturedGrid from "./Featuredgrid";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Loader from "../../Components/Loader/Loader";
// import Constants from "expo-constants";

// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// const HomeScreen = ({ navigation }) => {
//   const { theme } = useTheme();
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [homeData, setHomeData] = useState({
//     sliderData: [],
//     EnhancedGalleryData: [],
//   });

//   useEffect(() => {
//     if (navigation) {
//       navigation.setOptions({ headerShown: false });
//     }
//   }, []);

//   const fetchData = async () => {
//     try {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       console.log("User ID from AsyncStorage:", storedUserId);
//       const endpoints = [
//         { key: "sliderData", url: `${API_BASE_URL}/content/sliderimages` },
//         { key: "EnhancedGalleryData", url: `${API_BASE_URL}/replicate/enhanced-images?userId=${storedUserId}` },
//       ];

//       const responses = await Promise.all(
//         endpoints.map((endpoint) =>
//           fetch(endpoint.url)
//             .then((res) => res.json())
//             .then((data) => ({ key: endpoint.key, data }))
//             .catch(() => ({ key: endpoint.key, data: [] }))
//         )
//       );

//       const updated = responses.reduce((acc, { key, data }) => {
//         acc[key] = data;
//         return acc;
//       }, {});

//       setHomeData(updated);
//     } catch (error) {
//       console.error("Home data fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchData();
//     setRefreshing(false);
//   };
//   const handleScroll = (event) => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     if (offsetY <= 0) {
//       handleRefresh();
//     }
//   };
//   // console.log("homedata", homeData)
//   if (loading) {
//     return (
//       <View style={[styles.loaderContainer, { backgroundColor: theme.background }]}>
//         <Loader />
//       </View>
//     );
//   }
//   // console.log("enahanced gallery data in homescreen", homeData.EnhancedGalleryData)
//   const sections = [
//     // { key: "user", render: () => <UserNameDisplay /> },
//     { key: "slider", render: () => <ImageSlider sliderData={homeData.sliderData} /> },
//     { key: "Featuredgrid", render: () => <FeaturedGrid /> },
//     { key: "Featuredgridinput", render: () => <PromptInputComponent defaultModel="prunaai/hidream-l1-fast:91752cc0b07ccd5976f1db2b6b7f10296ac12d6cb2ba87056f79b17ffacca5f5" /> },
//     // { key: "PropmtSelctedusergallery", render: () => <PromptSelectGallery/> },
//     //  { key: "Featuredgridss", render: () => <GalleryScreen /> },
//     { key: "Enhancedusergallery", render: () => <EnhancedImageGallery EnhancedGallerydata={homeData.EnhancedGalleryData} /> },

//   ];

//   return (
//     <FlatList
//       data={sections}
//       keyExtractor={(item) => item.key}
//       renderItem={({ item }) => <View>{item.render()}</View>}
//       contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
//       showsVerticalScrollIndicator={false}
//       initialNumToRender={2}
//       windowSize={5}
//       maxToRenderPerBatch={3}
//       updateCellsBatchingPeriod={100}

//       onScroll={handleScroll}
//       scrollEventThrottle={16}
//       refreshing={refreshing}
//       onRefresh={handleRefresh}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   listContainer: {
//     paddingBottom: 120,
//     backgroundColor: "#F8F9FA",
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default HomeScreen;


import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../Context/ThemeContext";
import ImageSlider from "../../Components/Sliders/Slider";
import EnhancedImageGallery from "./EnhancedImagesGallery";
import PromptInputComponent from "./PromptinputComponent";
import FeaturedGrid from "./Featuredgrid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../Components/Loader/Loader";
import Constants from "expo-constants";
import { apiFetch } from "../../apiFetch";   // ✅ import apiFetch

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
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
        { key: "sliderData", url: `/content/sliderimages` },
        { key: "EnhancedGalleryData", url: `/replicate/enhanced-images?userId=${storedUserId}` },
      ];

      const responses = await Promise.all(
        endpoints.map(async (endpoint) => {
          try {
            const res = await apiFetch(endpoint.url, { method: "GET" }); // ✅ use apiFetch
            const data = await res.json();
            return { key: endpoint.key, data };
          } catch (err) {
            console.error(`Error fetching ${endpoint.key}:`, err);
            return { key: endpoint.key, data: [] };
          }
        })
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
    fetchData().finally(() => setRefreshing(false));
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      handleRefresh();
    }
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: theme.background }]}>
        <Loader />
      </View>
    );
  }

  const sections = [
    { key: "slider", render: () => <ImageSlider sliderData={homeData.sliderData} /> },
    { key: "Featuredgrid", render: () => <FeaturedGrid /> },
    {
      key: "Featuredgridinput",
      render: () => (
        <PromptInputComponent defaultModel="prunaai/hidream-l1-fast:91752cc0b07ccd5976f1db2b6b7f10296ac12d6cb2ba87056f79b17ffacca5f5" />
      ),
    },
    { key: "Enhancedusergallery", render: () => <EnhancedImageGallery EnhancedGallerydata={homeData.EnhancedGalleryData} /> },
  ];

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <View>{item.render()}</View>}
      contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
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
});

export default HomeScreen;
