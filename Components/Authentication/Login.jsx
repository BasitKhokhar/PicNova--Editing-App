
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateInputs = () => {
    setEmailError(!isValidEmail(email));
    setPasswordError(password.length < 8);
    return isValidEmail(email) && password.length >= 8;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.userId && data.email && data.token) {
          await SecureStore.setItemAsync("jwt_token", data.token);
          await AsyncStorage.setItem("userId", data.userId.toString());
          await AsyncStorage.setItem("email", data.email);

          navigation.replace("SplashScreen");
        } else {
          Alert.alert("Error", "Invalid credentials");
        }
      })
      .catch(() => Alert.alert("Error", "Login failed"));
  };
  const handleGoogleSignup = ()=>{

  }
  const handleFacebookSignup =()=>{

  }
  const handleAppleSignup =()=>{

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

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          style={[styles.input, passwordError && styles.errorInput]}
          secureTextEntry
        />
        {passwordError && (
          <Text style={styles.errorText}>Password must be at least 8 characters</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
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
    color: "#8b3dff",
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
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    gap:20,
    marginTop: 20,
  },
  icon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: "#8b3dff",
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
  link: {
    color: "#8b3dff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});

export default LoginScreen;
