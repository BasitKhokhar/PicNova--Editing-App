
// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as SecureStore from "expo-secure-store";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Constants from "expo-constants";

// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const validateInputs = () => {
//     setEmailError(!isValidEmail(email));
//     setPasswordError(password.length < 8);
//     return isValidEmail(email) && password.length >= 8;
//   };

//   const handleLogin = async () => {
//     if (!validateInputs()) return;

//     fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((res) => res.json())
//       .then(async (data) => {
//         if (data.userId && data.email && data.token) {
//           await SecureStore.setItemAsync("jwt_token", data.token);
//           await AsyncStorage.setItem("userId", data.userId.toString());
//           await AsyncStorage.setItem("email", data.email);

//           navigation.replace("SplashScreen");
//         } else {
//           Alert.alert("Error", "Invalid credentials");
//         }
//       })
//       .catch(() => Alert.alert("Error", "Login failed"));
//   };
//   const handleGoogleSignup = ()=>{

//   }
//   const handleFacebookSignup =()=>{

//   }
//   const handleAppleSignup =()=>{

//   }
//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Login</Text>

//         <TextInput
//           placeholder="Email"
//           placeholderTextColor="#aaa"
//           value={email}
//           onChangeText={setEmail}
//           style={[styles.input, emailError && styles.errorInput]}
//           keyboardType="email-address"
//         />
//         {emailError && <Text style={styles.errorText}>Invalid email format</Text>}

//         <TextInput
//           placeholder="Password"
//           placeholderTextColor="#aaa"
//           value={password}
//           onChangeText={setPassword}
//           style={[styles.input, passwordError && styles.errorInput]}
//           secureTextEntry
//         />
//         {passwordError && (
//           <Text style={styles.errorText}>Password must be at least 8 characters</Text>
//         )}

//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//           <Text style={styles.link}>Don't have an account? Sign up</Text>
//         </TouchableOpacity>
//            <View style={styles.buttonsContainer}>
//                   {/* Google Button */}
//                   <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignup}>
//                     <Icon name="google" size={24} color="#DB4437" style={styles.icon} />
                 
//                   </TouchableOpacity>
        
//                   {/* Facebook Button */}
//                   <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignup}>
//                     <Icon name="facebook" size={24} color="#4267B2" style={styles.icon} />
                   
//                   </TouchableOpacity>
        
//                   {/* Apple Button */}
//                   <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignup}>
//                     <Icon name="apple" size={24} color="#000" style={styles.icon} />
                
//                   </TouchableOpacity>
//                 </View>
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
//   errorInput: {
//     borderColor: "red",
//     borderWidth: 2,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginBottom: 5,
//     marginLeft: 5,
//   },
//    buttonsContainer: {
//     width: "100%",
//     display:'flex',
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems: 'center',
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
//     marginTop: 30,
//   },
//   buttonText: {
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

// export default LoginScreen;
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import tinycolor from "tinycolor2";
import Icon from "react-native-vector-icons/FontAwesome";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateInputs = () => {
    setEmailError(!isValidEmail(email));
    setPasswordError(password.length < 8);
    return isValidEmail(email) && password.length >= 8;
  };

  // const handleLogin = async () => {
  //   if (!validateInputs()) return;

  //   try {
  //     const res = await fetch(`${API_BASE_URL}/auth/login`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (data.userId && data.email && data.accessToken && data.refreshToken) {
  //       await SecureStore.setItemAsync("accessToken", data.accessToken);
  //       await SecureStore.setItemAsync("refreshToken", data.refreshToken);
  //       console.log("accesstoken stored via login screen", accessToken),
  //       console.log("refreshtoken stored via loginscreen", refreshToken)
  //       await AsyncStorage.setItem("userId", data.userId.toString());
  //       await AsyncStorage.setItem("email", data.email);

  //       navigation.replace("SplashScreen");
  //     } else {
  //       Alert.alert("Error", "Invalid credentials");
  //     }
  //   } catch (err) {
  //     Alert.alert("Error", "Login failed");
  //   }
  // };
const handleLogin = async () => {
  if (!validateInputs()) return;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.userId && data.email && data.accessToken && data.refreshToken) {
      await SecureStore.setItemAsync("accessToken", data.accessToken);
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      await AsyncStorage.setItem("userId", data.userId.toString());
      // await AsyncStorage.setItem("email", data.email);

      console.log("✅ AccessToken stored:", data.accessToken);
      console.log("✅ RefreshToken stored:", data.refreshToken);

      navigation.replace("SplashScreen"); // or "Main" depending on your flow
    } else {
      Alert.alert("Error", data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    Alert.alert("Error", "Login failed");
  }
};

  const handleGoogleSignup = () => {

  }
  const handleFacebookSignup = () => {

  }
  const handleAppleSignup = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, emailError && styles.errorInput]}
          keyboardType="email-address"
        />
        {emailError && <Text style={styles.errorText}>Invalid email format</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            style={[styles.input, styles.passwordInput, passwordError && styles.errorInput]}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon name={passwordVisible ? "eye-slash" : "eye"} size={20} color="#555" />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.errorText}>Password must be at least 8 characters</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

         <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
         <View>
             <Text>Don't have an account?</Text>
           </View>
           <View>
             <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.linkcontainer}>
               <Text style={styles.link}> Sign up</Text>
             </TouchableOpacity></View>
         </View>

         <View style={styles.buttonsContainer}>
           {/* Google Button */}
           <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignup}>
             <Icon name="google" size={24} color="#DB4437" style={styles.icon} />

           </TouchableOpacity>

           {/* Facebook Button */}
           <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignup}>
             <Icon name="facebook" size={24} color="#4267B2" style={styles.icon} />

           </TouchableOpacity>

          {/* Apple Button */}
           <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignup}>
             <Icon name="apple" size={24} color="#000" style={styles.icon} />

           </TouchableOpacity>
         </View>



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
  errorInput: {
    borderColor: "red",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
  buttonsContainer: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  icon: {
    marginRight: 8,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 45,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 20,
  },
  button: {
    backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkcontainer:{paddingHorizontal:10, paddingVertical:2, borderWidth:2,borderColor:tinycolor('#DC143C').brighten(10).toString(), marginHorizontal: 5,borderRadius:8},
  link: {
    color: tinycolor('#DC143C').brighten(10).toString(),
    textAlign: "center",
    // marginTop: 20,
   
    fontSize: 18,
    fontWeight: 'bold',
  },
});



// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
//   formContainer: { width: "80%" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//   input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
//   errorInput: { borderColor: "red" },
//   errorText: { color: "red", marginBottom: 10 },
//   button: { backgroundColor: "#007BFF", padding: 12, borderRadius: 8, alignItems: "center" },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   passwordContainer: { flexDirection: "row", alignItems: "center" },
//   passwordInput: { flex: 1 },
//   eyeIcon: { position: "absolute", right: 10 },
// });

export default LoginScreen;
