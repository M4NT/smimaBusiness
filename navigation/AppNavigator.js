// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import IntroductionScreen from '../screens/Introduction/IntroductionScreen';
import IntroductionLogin from '../screens/Introduction/IntroductionLogin';
import FeedScreen from '../screens/Feed/FeedScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Introduction">
      <Stack.Screen name="Introduction" component={IntroductionScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="IntroductionLogin" component={IntroductionLogin} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;
