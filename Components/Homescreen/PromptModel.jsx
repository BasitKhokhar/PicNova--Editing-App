import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagesComparisonSlider from '../Sliders/ImagesComparisonslider';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const PromptEnhanceModal = ({ visible, onClose, selectedImage, modeldetails }) => {
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const enhanceImageWithPrompt = async () => {
    if (!prompt.trim()) {
      Alert.alert("Error", "Please enter a prompt.");
      return;
    }

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'No user ID found. Please log in.');
        return;
      }

      const response = await fetch(selectedImage.uri);
      const blob = await response.blob();
      const filename = `original_${Date.now()}.jpg`;
      const storageRef = ref(getStorage(app), `PicNovaPromptOriginal/${filename}`);
      const uploadTask = await uploadBytesResumable(storageRef, blob);
      const originalUrl = await getDownloadURL(uploadTask.ref);
      console.log("data passing from Propmt model to bakcend ");
      const replicateRes = await fetch(`${API_BASE_URL}/replicate/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: originalUrl,
          userId,
          modelUsed: modeldetails,
          prompt,
        }),
      });

      const { enhancedImageUrl } = await replicateRes.json();
      const enhancedResponse = await fetch(enhancedImageUrl);
      const enhancedBlob = await enhancedResponse.blob();
      const enhancedName = `enhanced_${Date.now()}.jpg`;
      const enhancedRef = ref(getStorage(app), `PicNovaPromptEnhanced/${enhancedName}`);
      const enhancedUpload = await uploadBytesResumable(enhancedRef, enhancedBlob);
      const enhancedFirebaseUrl = await getDownloadURL(enhancedUpload.ref);

      setEnhancedImage(enhancedFirebaseUrl);

      await fetch(`${API_BASE_URL}/store-enhanced`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: enhancedFirebaseUrl }),
      });
    } catch (error) {
      console.error('Prompt-based enhance failed:', error);
      Alert.alert("Error", "Something went wrong while enhancing.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!enhancedImage) return;
    const fileUri = FileSystem.documentDirectory + 'enhanced.jpg';
    await FileSystem.downloadAsync(enhancedImage, fileUri);
    await MediaLibrary.saveToLibraryAsync(fileUri);
    alert('Image downloaded to gallery');
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>

          {/* {selectedImage && (
            <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          )} */}
          {!enhancedImage && selectedImage?.uri && (
            <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          )}

          <TextInput
            style={styles.input}
            placeholder="Enter your custom prompt"
            placeholderTextColor="#aaa"
            value={prompt}
            onChangeText={setPrompt}
          />

          {loading && <ActivityIndicator size="large" color="#1DB954" />}

          {!loading && !enhancedImage && (
            <TouchableOpacity style={styles.enhanceButton} onPress={enhanceImageWithPrompt}>
              <Text style={styles.enhanceText}>Enhance with Prompt</Text>
            </TouchableOpacity>
          )}

          {enhancedImage && selectedImage?.uri && (
            <>
              <View style={styles.sliderWrapper}>
                <ImagesComparisonSlider
                  originalImageUri={selectedImage.uri}
                  enhancedImageUri={enhancedImage}
                />
              </View>
              <TouchableOpacity style={styles.downloadButton} onPress={downloadImage}>
                <Text style={styles.downloadbtnText}>Download</Text>
              </TouchableOpacity>
            </>
          )}
          {/* {enhancedImage && (
            <>
              <Image source={{ uri: enhancedImage }} style={styles.image} />
              <TouchableOpacity style={styles.downloadButton} onPress={downloadImage}>
                <Text style={styles.enhanceText}>Download</Text>
              </TouchableOpacity>
            </>
          )} */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '60%',
    backgroundColor: '#8b3dff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5,
    backgroundColor: 'black',
    borderRadius: 50
  },
  image: {
    marginTop:30,
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
    marginVertical: 10,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 12,
    // marginBottom: 14,
  },
  enhanceButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 25,
    marginTop: 10,
    width: '70%',
    alignItems: 'center',
  },
  enhanceText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: '#FFFFFF',
    color: 'black',
    borderColor: 'black',
    padding: 12,
    borderRadius: 25,
    marginTop: 10,
    width: '70%',
    alignItems: 'center',
  },
  downloadbtnText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  sliderWrapper: {
    width: '100%',
    height: 300,
    marginBottom: 15,
  },
  slider: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default PromptEnhanceModal;
