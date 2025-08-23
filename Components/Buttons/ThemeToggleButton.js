// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// // import { useTheme } from '../context/ThemeContext';
// import { useTheme } from '../context/ThemeContext';
// const ThemeToggleButton = () => {
//   const { isDark, toggleTheme, theme } = useTheme();

//   return (
//     <TouchableOpacity
//       onPress={toggleTheme}
//       style={[
//         styles.button,
//         { backgroundColor: theme.primary, borderColor: theme.border },
//       ]}
//     >
//       <Text style={[styles.text, { color: theme.text }]}>
//         Switch to {isDark ? 'Light' : 'Dark'} Mode
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   text: {
//     fontWeight: 'bold',
//   },
// });

// export default ThemeToggleButton;
import React, { useEffect, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { isDark, toggleTheme, theme } = useTheme();
  const animation = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  // Animate when theme changes
  useEffect(() => {
    Animated.timing(animation, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  // Interpolate circle position
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 28], // position for left & right
  });

  // Background color transition
  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.border, theme.primary],
  });

  return (
    <TouchableWithoutFeedback onPress={toggleTheme}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 25,
    borderRadius: 30,
    padding: 2,
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
});

export default ThemeToggleButton;
