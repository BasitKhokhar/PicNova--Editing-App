import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loader from '../Loader/Loader';
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const AIPicsFeatureList = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/aipicsfeatures/ai_pics_Featureslist`);
        const data = await res.json();
        setFeatures(data);
      } catch (error) {
        console.error('Failed to fetch features:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const renderFeature = ({ item }) => (
    <TouchableOpacity
      style={styles.featureContainer}
      onPress={() =>
        navigation.navigate('AIpicsfeaturedetail', {
          feature: item,
        })
      }
    >
      <Image source={{ uri: item.image_url }} style={styles.featureImage} />
      <View style={styles.textContainer}>
        <Text style={styles.featureTitle}>{item.name}</Text>
        <Text style={styles.featureDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
        {/* <ActivityIndicator size="large" color="#8b3dff" /> */}
      </View>
    );
  }

  return (
    <FlatList
      data={features}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderFeature}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  featureContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  featureImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AIPicsFeatureList;
