import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
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
import ImageCompareSlider from '../Sliders/ImagesComparisonslider';
import Loader from '../Loader/Loader';

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const EnhanceImageModal = ({ visible, onClose, selectedImage, modeldetails, prompt }) => {
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const enhanceImage = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.warn('No userId found');
        return;
      }

      const response = await fetch(selectedImage.uri);
      const blob = await response.blob();
      const filename = `original_${Date.now()}.jpg`;
      const storageRef = ref(getStorage(app), `PicNovaOriginalimages/${filename}`);
      const uploadTask = await uploadBytesResumable(storageRef, blob);
      const originalUrl = await getDownloadURL(uploadTask.ref);

      const replicateRes = await fetch(`${API_BASE_URL}/replicate/enhance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: originalUrl, userId, modelUsed: modeldetails, prompt }),
      });

      const { enhancedImageUrl } = await replicateRes.json();
      console.log("Enhanced image URL:", enhancedImageUrl);
      setEnhancedImage(enhancedImageUrl);
    } catch (error) {
      console.error('Enhance failed', error);
    } finally {
      setLoading(false);
    }
  };
console.log("enhancedImage after complete function",enhancedImage)
  const downloadEnhancedImage = async () => {
    if (!enhancedImage) return;
    const fileUri = FileSystem.documentDirectory + 'enhanced.jpg';
    await FileSystem.downloadAsync(enhancedImage, fileUri);
    await MediaLibrary.saveToLibraryAsync(fileUri);
    alert('Image downloaded to gallery');
  };
  
 if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>

          {/* {loading && <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 20 }} />} */}

         {!loading && selectedImage?.uri && enhancedImage ? (
  <View style={styles.sliderWrapper}>
    <ImageCompareSlider
      originalImageUri={selectedImage.uri}
      enhancedImageUri={enhancedImage}
    />
  </View>
) : !loading && selectedImage?.uri && !enhancedImage ? (
  
  <Image source={{ uri: selectedImage.uri }} style={styles.modalImage} />
) : loading ? (
  <Loader />
  // <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 20 }} />
) : null}



          {!loading && !enhancedImage && (
            <TouchableOpacity style={styles.enhanceButton} onPress={enhanceImage}>
              <Text style={styles.enhanceText}>Enhance Image</Text>
            </TouchableOpacity>
          )}

          {enhancedImage && (
            <TouchableOpacity style={styles.downloadButton} onPress={downloadEnhancedImage}>
              <Text style={styles.enhanceText}>Download</Text>
            </TouchableOpacity>
          )}
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
    backgroundColor:'black',
    borderRadius: 50,
  },
  modalImage: {
    marginTop:30,
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
    // borderRadius: 12,
    // borderColor: 'black',
    // borderWidth: 2,
    marginBottom: 15,
  },
  enhanceButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 25,
    marginTop: 10,
    width: '70%',
    alignItems: 'center',
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
  enhanceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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

export default EnhanceImageModal;



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { app } from '../firebase';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Constants from 'expo-constants';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// const EnhanceImageModal = ({ visible, onClose, selectedImage,modeldetails,prompt }) => {
//   console.log("data coming in model",selectedImage,modeldetails,prompt)
//   const [enhancedImage, setEnhancedImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const enhanceImage = async () => {
//     setLoading(true);
//     try {
//       const userId = await AsyncStorage.getItem('userId');
//       console.log("userid in enhancedimage model",userId)
//       if (!userId) {
//         console.warn('No userId found in AsyncStorage');
//         return;
//       }
//       const response = await fetch(selectedImage.uri);
//       const blob = await response.blob();
//       const filename = `original_${Date.now()}.jpg`;
//       const storageRef = ref(getStorage(app), `PicNovaOriginalimages/${filename}`);
//       const uploadTask = await uploadBytesResumable(storageRef, blob);
//       const originalUrl = await getDownloadURL(uploadTask.ref);
      
//       const replicateRes = await fetch(`${API_BASE_URL}/replicate/enhance`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ imageUrl: originalUrl, userId:userId, modelUsed: modeldetails,prompt }),
//       });
//       const { enhancedImageUrl } = await replicateRes.json();

//       const enhancedResponse = await fetch(enhancedImageUrl);
//       const enhancedBlob = await enhancedResponse.blob();
//       const enhancedName = `enhanced_${Date.now()}.jpg`;
//       const enhancedRef = ref(getStorage(app), `PicNovaEnhancedimages/${enhancedName}`);
//       const enhancedUpload = await uploadBytesResumable(enhancedRef, enhancedBlob);
//       const enhancedFirebaseUrl = await getDownloadURL(enhancedUpload.ref);

//       await fetch(`${API_BASE_URL}/store-enhanced`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ imageUrl: enhancedFirebaseUrl }),
//       });

//       setEnhancedImage(enhancedFirebaseUrl);
//     } catch (error) {
//       console.error('Enhance failed', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadEnhancedImage = async () => {
//     if (!enhancedImage) return;
//     const fileUri = FileSystem.documentDirectory + 'enhanced.jpg';
//     await FileSystem.downloadAsync(enhancedImage, fileUri);
//     await MediaLibrary.saveToLibraryAsync(fileUri);
//     alert('Image downloaded to gallery');
//   };

//   return (
//     <Modal visible={visible} animationType="fade" transparent>
//       <View style={styles.overlay}>
//         <View style={styles.modalContainer}>
//           <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
//             <Icon name="close" size={24} color="#fff" />
//           </TouchableOpacity>

//           {selectedImage && !enhancedImage && (
//             <Image source={{ uri: selectedImage.uri }} style={styles.modalImage} />
//           )}

//           {loading && <ActivityIndicator size="large" color="#1DB954" />}

//           {enhancedImage && (
//             <Image source={{ uri: enhancedImage }} style={styles.modalImage} />
//           )}

//           {!loading && !enhancedImage && (
//             <TouchableOpacity style={styles.enhanceButton} onPress={enhanceImage}>
//               <Text style={styles.enhanceText}>Enhance Image</Text>
//             </TouchableOpacity>
//           )}

//           {enhancedImage && (
//             <TouchableOpacity style={styles.downloadButton} onPress={downloadEnhancedImage}>
//               <Text style={styles.enhanceText}>Download</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)', 
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '90%',
//     height: '70%',
//     backgroundColor: '#8b3dff',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   closeIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 10,
//     padding: 5,
//   },
//   modalImage: {
//     width: '100%',
//     height: '70%',
//     resizeMode: 'contain',
//     borderRadius: 12,
//     borderColor:'black',
//     borderWidth: 2,
//     marginBottom: 15,
//   },
//   enhanceButton: {
//     backgroundColor: 'black',
//     padding: 12,
//     borderRadius: 25,
//     marginBottom: 10,
//     width: '70%',
//     alignItems: 'center',
//   },
//   downloadButton: {
//     backgroundColor: '#FF5E5E',
//     padding: 12,
//     borderRadius: 25,
//     marginBottom: 10,
//     width: '70%',
//     alignItems: 'center',
//   },
//   enhanceText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default EnhanceImageModal;
