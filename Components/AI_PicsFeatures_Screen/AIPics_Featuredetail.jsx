
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import Loader from '../Loader/Loader';
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import EnhanceImageModal from '../Homescreen/EnhanceModel';

// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// const PicFeatureDetailScreen = ({ route }) => {
//   const { feature } = route.params;
//   const [sampleImages, setSampleImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState({ uri: '', prompt: '' });
//   const [modalVisible, setModalVisible] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSubfeatureImages = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/aipicsfeatures/ai_subfeatures/${feature.id}`);
//         const data = await res.json();
//         setSampleImages(data);
//       } catch (error) {
//         console.error('Failed to fetch subfeatures:', error);
//         Alert.alert('Error', 'Unable to load subfeatures.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubfeatureImages();
//   }, [feature.id]);

//   const handleImagePick = async (prompt) => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage({
//         uri: result.assets[0].uri,
//         prompt: prompt,
//       });
//       setModalVisible(true);
//     }
//   };

//   const renderSampleImage = ({ item }) => (
//     <TouchableOpacity onPress={() => handleImagePick(item.prompt)}>
//       <Image source={{ uri: item.image_url }} style={styles.sampleImage} />
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <Loader />
//         {/* <ActivityIndicator size="large" color="#8b3dff" /> */}
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: feature.image_url }} style={styles.headerImage} />
//       <Text style={styles.title}>{feature.name}</Text>
//       <Text style={styles.description}>{feature.description}</Text>

//       <Text style={styles.subheading}>Tap a style below to edit your image</Text>

//       <FlatList
//         data={sampleImages}
//         renderItem={renderSampleImage}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={3}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.grid}
//       />

//       <EnhanceImageModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         selectedImage={selectedImage}
//         modeldetails={feature.model_name}
//         prompt={selectedImage.prompt}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'contain',
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#333',
//   },
//   description: {
//     fontSize: 15,
//     color: '#555',
//     marginTop: 6,
//   },
//   subheading: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginVertical: 14,
//     color: '#444',
//   },
//   grid: {
//     gap: 6,
//     paddingBottom: 30,
//   },
//   sampleImage: {
//     width: 100,
//     height: 120,
//     margin: 6,
//     borderRadius: 8,
//   },
// });

// export default PicFeatureDetailScreen;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Loader from '../Loader/Loader';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import EnhanceImageModal from '../Homescreen/EnhanceModel';

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const PicFeatureDetailScreen = ({ route }) => {
  const { feature } = route.params;
  const [sampleImages, setSampleImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState({ uri: '', prompt: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubfeatureImages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/aipicsfeatures/ai_subfeatures/${feature.id}`);
        const data = await res.json();
        setSampleImages(data);
      } catch (error) {
        console.error('Failed to fetch subfeatures:', error);
        Alert.alert('Error', 'Unable to load subfeatures.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubfeatureImages();
  }, [feature.id]);

  const handleImagePick = async (prompt) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({
        uri: result.assets[0].uri,
        prompt: prompt,
      });
      setModalVisible(true);
    }
  };

  const renderSampleImage = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePick(item.prompt)}>
      <Image source={{ uri: item.image_url }} style={styles.sampleImage} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleImages}
        renderItem={renderSampleImage}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
        ListHeaderComponent={
          <>
            <Image source={{ uri: feature.image_url }} style={styles.headerImage} />
            <Text style={styles.title}>{feature.name}</Text>
            <Text style={styles.description}>{feature.description}</Text>
            <Text style={styles.subheading}>Tap a style below to edit your image</Text>
          </>
        }
      />

      <EnhanceImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedImage={selectedImage}
        modeldetails={feature.model_name}
        prompt={selectedImage.prompt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: 'auto',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginTop: 6,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 14,
    color: '#444',
  },
  grid: {
    paddingBottom: 30,
  },
  sampleImage: {
    width: 100,
    height: 120,
    margin: 6,
    borderRadius: 8,
  },
});

export default PicFeatureDetailScreen;
