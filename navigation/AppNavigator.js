// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import IntroductionScreen from '../screens/Introduction/IntroductionScreen';
import IntroductionLogin from '../screens/Introduction/IntroductionLogin';
import FeedScreen from '../screens/Feed/FeedScreen';
import ProfileScreen from '../screens/Profile/Profile';
import CentralScreen from '../screens/Central/CentralScreen';
import MainTabNavigator from './MainTabNavigator';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Introduction" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Introduction" component={IntroductionScreen} />
      <Stack.Screen name="IntroductionLogin" component={IntroductionLogin} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Central" component={CentralScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
