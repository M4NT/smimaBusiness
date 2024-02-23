import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/Auth/Login';
import SignupScreen from '../screens/Auth/Signup';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import Profile from '../screens/Profile/Profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = 'log-in-outline';
          } else if (route.name === 'Signup') {
            iconName = 'person-add-outline';
          } else if (route.name === 'ForgotPassword') {
            iconName = 'key-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Signup" component={SignupScreen} />
      <Tab.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
