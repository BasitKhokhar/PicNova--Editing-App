import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import SocialIconsRow from "./SocialIconsRow";
import Loader from "../Loader/Loader";
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log("User ID in UserScreen is:", storedUserId);
      if (storedUserId) {

        const response = await fetch(`${API_BASE_URL}/users/${storedUserId}`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        setUserData(data);

        const imageResponse = await fetch(`${API_BASE_URL}/users/user_images/${storedUserId}`);
        console.log("Image Response Status:", imageResponse);
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          console.log("Fetched user image:", imageData.userImage);
          setUserImage(imageData.userImage);
        } else {
          console.log("User image fetch failed.");
        }
      }
    } catch (error) {
      console.error("Error fetching user data or image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserData();
    setRefreshing(false);
  };

  console.log("userImage in UserScreen:", userImage);

  return (
    <View style={styles.maincontainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : userData ? (
          <View style={styles.profileContainer}>
            {/* Profile Header */}
            <View style={styles.header}>
              <View style={styles.imageContainer}>
                {userImage && typeof userImage === 'string' && userImage.startsWith('http') ? (
                  <Image
                    source={{ uri: userImage }}
                    style={styles.profileImage}
                    onError={() => {
                      console.log("Image load failed, setting fallback.");
                      setUserImage(null);
                    }}
                  />
                ) : (
                  <View style={styles.defaultProfileCircle} />
                )}
              </View>
              <View style={styles.headingscontianer}>
                <Text style={styles.title}>{userData.name}</Text>
                <Text style={styles.email}>{userData.email}</Text>
              </View>


            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.heading}>General</Text>
              <View style={styles.line} />
            </View>
            
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AccountDetail', { userData })}>
              <View style={styles.leftContent}>
                <Icon name="person" size={24} color="#555" style={styles.icon} />
                <Text style={styles.sectionText}>Account Detail</Text>
              </View>
              <View><Icon name="chevron-right" size={24} color="#888" /></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AccountDetail', { userData })}>
              <View style={styles.leftContent}>
                <Icon name="person" size={24} color="#555" style={styles.icon} />
                <Text style={styles.sectionText}>Account Detail</Text>
              </View>
              <View><Icon name="chevron-right" size={24} color="#888" /></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AccountDetail', { userData })}>
              <View style={styles.leftContent}>
                <Icon name="person" size={24} color="#555" style={styles.icon} />
                <Text style={styles.sectionText}>Account Detail</Text>
              </View>
              <View><Icon name="chevron-right" size={24} color="#888" /></View>
            </TouchableOpacity>
            <View style={styles.sectionHeader}>
              <Text style={styles.heading}>About</Text>
              <View style={styles.line} />
            </View>
           <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('about', { userData })}>
              <View style={styles.leftContent}>
                <Icon name="info" size={24} color="#555" style={styles.icon} />
                <Text style={styles.sectionText}>About</Text>
              </View>
              <View><Icon name="chevron-right" size={24} color="#888" /></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('CustomerSupport', { userData })}>
              <View style={styles.leftContent}>
                <Icon name="support-agent" size={24} color="#555" style={styles.icon} />
                <Text style={styles.sectionText}>Customer Support</Text>
              </View>
              <View><Icon name="chevron-right" size={24} color="#888" /></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('faq', { userData })}>
              <View style={styles.leftContent}>
                <Icon name="question-answer" size={24} color="#555" style={styles.icon} />
                <Text style={styles.sectionText}>FAQs</Text>
              </View>
              <View><Icon name="chevron-right" size={24} color="#888" /></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Logout', { userData })}>
              <View style={styles.leftContent}>
                <Icon name="logout" size={24} color="#555" style={styles.icon} />
                <Text style={styles.sectionText}>Logout </Text>
              </View>
              <View><Icon name="chevron-right" size={24} color="#888" /></View>
            </TouchableOpacity>





            {/* <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("PaymentScreen", { userData })}>
              <Text style={styles.sectionText}>Account Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("AccountDetail", { userData })}>
              <Text style={styles.sectionText}>Account Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("CustomerSupport")}>
              <Text style={styles.sectionText}>Customer Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("faq")}>
              <Text style={styles.sectionText}>FAQs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("about")}>
              <Text style={styles.sectionText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.section, styles.logout]} onPress={() => navigation.navigate("Logout")}>
              <Text style={styles.sectionText}>Logout</Text>
            </TouchableOpacity> */}

            {/* <View style={styles.iconscontainer}>
            <SocialIconsRow />
          </View> */}
          </View>
        ) : (
          <Text style={styles.text}>No user data found.</Text>
        )}
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#8b3dff',
    paddingTop: 30,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  profileContainer: {
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
    marginBottom: 50,
    // justifyContent: "space-between",
    width: "100%",
    borderRadius: 10,
  },
  headingscontianer: {
    display: 'flex',
    flexDirection: 'column',

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8b3dff"
  },
  email: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333"
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b3dff',
    marginRight: 8,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#8b3dff',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  leftContent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  sectionText: {
    fontSize: 20,
    color: '#333',
  },
  // section: {
  //   width: "100%",
  //   paddingVertical: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ddd",
  //   alignItems: "flex-start"
  // },
  // sectionText: {
  //   fontSize: 18,
  //   color: "#333"
  // },
  logout: {
    borderBottomWidth: 0
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: "#555"
  },
  iconscontainer: {
    display: 'flex',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden"
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50
  },
  defaultProfileCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff"
  }
});

export default UserScreen;
