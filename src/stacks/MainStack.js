import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PreLoad from '../screens/PreLoad';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from './MainTab';
import Barber from '../screens/Barber';

const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="PreLoad"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="PreLoad" component={PreLoad} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="Barber" component={Barber} />
  </Stack.Navigator>
);
