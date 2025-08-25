
// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Constants from 'expo-constants';

// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// const SignupScreen = ({ navigation }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isValidPhone = (phone) => /^\d{11}$/.test(phone);

//   const validateInputs = () => {
//     if (!name || !email || !password || !phone) {
//       Alert.alert("Error", "All fields are required!");
//       return false;
//     }
//     if (!isValidEmail(email)) {
//       Alert.alert("Error", "Invalid email format!");
//       return false;
//     }
//     if (!isValidPhone(phone)) {
//       Alert.alert("Error", "Phone number must be exactly 11 digits!");
//       return false;
//     }
//     if (password.length < 8) {
//       Alert.alert("Error", "Password must be at least 8 characters long!");
//       return false;
//     }
//     return true;
//   };

//   const handleSignup = () => {
//     if (!validateInputs()) return;

//     fetch(`${API_BASE_URL}/auth/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, phone}),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         Alert.alert("Success", "Signup successful! Please log in.");
//         navigation.navigate("Login");
//       })
//       .catch(() => Alert.alert("Error", "Signup failed"));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Sign Up</Text>

//         <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#aaa" />
//         <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" placeholderTextColor="#aaa" />
//         <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry placeholderTextColor="#aaa" />
//         <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" placeholderTextColor="#aaa" />


//         <TouchableOpacity style={styles.button} onPress={handleSignup}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//           <Text style={styles.link}>Already have an account? Login</Text>
//         </TouchableOpacity>
     


//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   formContainer: {
//     backgroundColor: "#fff",
//     padding: 25,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 5,
//     width: "100%",
//     maxWidth: 400,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#8b3dff",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 12,
//     marginVertical: 8,
//     borderRadius: 8,
//     backgroundColor: "#f9f9f9",
//     color: "#000",
//   },
//    buttonsContainer: {
//     width: "100%",
//     display:'flex',
//     flexDirection:'row',
//     gap:20,
//     marginTop: 20,
//   },
  
//   icon: {
//     marginRight: 8,
//   },
//   button: {
//     backgroundColor: "#8b3dff",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   googleButton: {
//     backgroundColor: "#db4437",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   googleButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   link: {
//     color: "#8b3dff",
//     textAlign: "center",
//     marginTop: 20,
//     fontSize: 14,
//   },
// });

// export default SignupScreen;




import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import tinycolor from "tinycolor2";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");


  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{11}$/.test(phone);

  const validateInputs = () => {
    if (!name || !email || !password || !phone || !city || !address) {
      Alert.alert("Error", "All fields are required!");
      return false;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Invalid email format!");
      return false;
    }
    if (!isValidPhone(phone)) {
      Alert.alert("Error", "Phone number must be exactly 11 digits!");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long!");
      return false;
    }
    return true;
  };
  const handleSignup = async () => {
    if (!validateInputs()) return;

    try {
      // Retrieve terms acceptance from AsyncStorage
      const termsAccepted = await AsyncStorage.getItem("termsAccepted");
      const termsStatus = termsAccepted === "true";
      console.log("terms staitus in signup", termsStatus);
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          termsStatus,
          city,
          address  // send the new field here
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Signup successful! Please log in.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Signup failed");
      }
    } catch (error) {
      Alert.alert("Error", "Signup failed: " + error.message);
    }
  };
  // const handleSignup = () => {
  //   if (!validateInputs()) return;

  //   fetch(`${API_BASE_URL}/auth/signup`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name, email, password, phone}),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       Alert.alert("Success", "Signup successful! Please log in.");
  //       navigation.navigate("Login");
  //     })
  //     .catch(() => Alert.alert("Error", "Signup failed"));
  // };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#aaa" />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" placeholderTextColor="#aaa" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry placeholderTextColor="#aaa" />
        <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" placeholderTextColor="#aaa" />
        <TextInput placeholder="Enter City Name" value={city} onChangeText={setCity} style={styles.input} placeholderTextColor="#aaa" />
        <TextInput placeholder="Enter Address" value={address} onChangeText={setAddress} style={styles.input} placeholderTextColor="#aaa" />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>



        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
          <View>
            <Text>Don't have an account?</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.linkcontainer}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity></View>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity> */}



      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: tinycolor('#DC143C').brighten(10).toString(),
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  buttonsContainer: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },

  icon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    backgroundColor: "#db4437",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkcontainer: {
    paddingHorizontal: 10, paddingVertical: 2, borderWidth: 2,
    borderColor: tinycolor('#DC143C').brighten(10).toString(), marginHorizontal: 5, borderRadius: 8
  },
  link: {
    color: tinycolor('#DC143C').brighten(10).toString(),
    textAlign: "center",
    // marginTop: 20,

    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
