
import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const EnhancedImageGallery = ({ EnhancedGallerydata }) => {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const handleImagePress = (id) => {
    setSelectedImageId(id === selectedImageId ? null : id);
  };

  const handleDownload = async (url) => {
    try {
      setDownloading(true);
      const fileUri = FileSystem.documentDirectory + `enhanced_${Date.now()}.jpg`;
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Downloaded', 'Image saved to gallery');
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Could not download the image.');
    } finally {
      setDownloading(false);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedImageId === item.id;

    return (
      <TouchableOpacity onPress={() => handleImagePress(item.id)} style={styles.imageWrapper}>
        <Image source={{ uri: item.url }} style={styles.image} />
        {isSelected && (
          <TouchableOpacity
            style={styles.downloadIcon}
            onPress={() => handleDownload(item.url)}
          >
            <Ionicons name="arrow-down-circle" size={32} color="white" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Gallery</Text>
      {downloading && <ActivityIndicator size="large" color="#8b3dff" />}
      <FlatList
        data={EnhancedGallerydata}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No enhanced images yet.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    flex: 1,
    padding: 10,
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 15,
    marginLeft:15
  },
  row: {
    justifyContent: 'space-between',
  },
  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  downloadIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 2,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
});

export default EnhancedImageGallery;
