import React, { useState, useEffect } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

import SplashScreen from "./Components/SplashScreens/SplashScreen";
import SplashScreen1 from "./Components/SplashScreens/SplashScreen1";
import SplashScreen2 from "./Components/SplashScreens/SplashScreen2";
import SplashScreen3 from "./Components/SplashScreens/SplashScreen3";
import SplashScreen4 from "./Components/SplashScreens/SplashScreen4";

import SignupScreen from "./Components/Authentication/Signup";
import LoginScreen from "./Components/Authentication/Login";

import HomeScreen from "./Components/Home";

import AIPicsFeatureList from "./Components/AI_PicsFeatures_Screen/AIPics_Features";
import PicFeatureDetailScreen from "./Components/AI_PicsFeatures_Screen/AIPics_Featuredetail";

import Videoscreen from "./Components/VideosScreen/Videoscreen";

// import UserDetailsScreen from "./Components/Cart/UserDetailsScreen";
import UserScreen from "./Components/User/UserScreen";
import AccountDetailScreen from "./Components/User/AccountDetailScreen";
import CustomerSupportScreen from "./Components/User/CustomerSupportScreen";
import FAQ from "./Components/User/FAQ";
// import StripePayment from "./Components/Cart/StripePayment";
import LogoutScreen from "./Components/User/LogoutScreen";
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const stripeKey = Constants.expoConfig.extra.stripePublishableKey;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainLayout = ({ navigation, children, currentScreen }) => {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/content/logo_image`);
        const data = await response.json();
        if (data.length > 0) {
          setLogo(data[0].image_url);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          {logo && <Image source={{ uri: logo }} style={styles.logo} />}
        </View>

        <View style={styles.headerItem}>
          <Text style={styles.appTitle}>PicNova-AI</Text>
        </View>

        <View style={styles.headerItem}>
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={styles.belliconmaincontainer}>
            <View style={styles.belliconContainer}>
              <Icon name="notifications" size={20} color="white" />
            </View>

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>{children}</View>
      <View style={styles.footer}>
        {[
          { name: "Home", icon: "home" },
          { name: "AI Photo", icon: "photo-camera" },
          { name: "AI Video", icon: "video-library" },
          { name: "Profile", icon: "person" },
        ].map(({ name, icon }) => (
          <TouchableOpacity
            key={name}
            style={styles.footerButton}
            onPress={() => navigation.navigate(name)}
          >
            <Icon
              name={icon}
              size={24}
              color={currentScreen === name ? "#8b3dff" : "gray"}
            />
            {name === "Cart" > 0 && (
              <View style={styles.cartBadge}>
                {/* <Text style={styles.cartCount}></Text> */}
              </View>
            )}
            <Text
              style={[
                styles.footerText,
                { color: currentScreen === name ? "#8b3dff" : "gray" },
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Home">
            <HomeScreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="AI Photo">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="AI Photo">
            <AIPicsFeatureList />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="AI Video">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="AI Video">
            <Videoscreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Profile">
            <UserScreen />
          </MainLayout>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
const App = () => {
  const [userId, setUserId] = useState(null);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [isSplash1Visible, setIsSplash1Visible] = useState(true);
  const [isSplash2Visible, setIsSplash2Visible] = useState(null);
  const [isSplash3Visible, setIsSplash3Visible] = useState(null);
  const [isSplash4Visible, setIsSplash4Visible] = useState(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("jwt_token");
        const storedUserId = await AsyncStorage.getItem("userId");
        console.log("userid in app.js is", storedUserId)
        if (token && storedUserId) {
          setUserId(storedUserId);
          setIsSplash2Visible(false);
          setIsSplash3Visible(false);
          setIsSplash4Visible(false);
        } else {
          setIsSplash2Visible(true);
          setIsSplash3Visible(false);
          setIsSplash4Visible(false);
        }
      } catch (error) {
        console.error("Error checking login:", error);
      } finally {
        setCheckingLogin(false);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const splashFlow = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsSplash1Visible(false);
    };

    splashFlow();
  }, []);

  if (isSplash1Visible) {
    return <SplashScreen1 />;
  }

  if (isSplash2Visible) {
    return <SplashScreen2 onNext={() => {
      setIsSplash2Visible(false);
      setIsSplash3Visible(true);
    }} />;
  }
  if (isSplash3Visible) {
    return <SplashScreen3 onNext={() => {
      setIsSplash3Visible(false);
      setIsSplash4Visible(true);
    }} />;
  }
  if (isSplash4Visible) {
    return <SplashScreen4 onNext={() => setIsSplash4Visible(false)} />;
  }


  if (checkingLogin) {
    return <SplashScreen />;
  }

  return (
    <StripeProvider
      publishableKey={stripeKey}
      merchantDisplayName="Basit Sanitary App"
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={userId ? "Main" : "Login"}>
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} setUserId={setUserId} />}
          </Stack.Screen>
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {(props) => <BottomTabs {...props} />}
          </Stack.Screen>
          <Stack.Screen name="AIpicsfeatures" component={AIPicsFeatureList} options={{ title: "AI Pics Features" }} />
          <Stack.Screen name="AIpicsfeaturedetail" component={PicFeatureDetailScreen} options={{ title: "AI Pics Features Detail" }} />

          <Stack.Screen name="videosfeatures" component={Videoscreen} options={{ title: "Videos Features" }} />

          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={UserScreen} options={{ title: "Profile" }} />
          {/* <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} /> */}
          <Stack.Screen name="User" component={UserScreen} />
          <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
          <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
          <Stack.Screen name="faq" component={FAQ} />
          {/* <Stack.Screen name="StripePayment" component={StripePayment} /> */}
          <Stack.Screen name="Logout" component={LogoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom:10,
    paddingHorizontal: 10,
    borderColor: 'black',
    // paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerItem: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },

  logo: {
    width: 70,
    height: 70,
    // resizeMode: "contain",
  },

  appTitle: {
    fontSize: 24,
    // fontFamily:'sans-sarif condensed',
    letterSpacing: .5,
    fontWeight: 'bold',
    color: '#8b3dff',
    letterSpacing: 1,
    textAlign: 'center',
  },
  belliconmaincontainer:{paddingRight:15},
  belliconContainer:{padding:7,backgroundColor:'#8b3dff',borderRadius:50,},
  searchText: { flex: 1, color: "#555" },
  searchIcon: { marginLeft: 5 },
  body: { flex: 1, padding: 0 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
  footerButton: { alignItems: "center" },
  footerText: { fontSize: 12, fontWeight: "bold", marginTop: 5 },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});

