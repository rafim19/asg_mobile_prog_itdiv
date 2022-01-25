import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import HomeScreen from '../screens/HomeScreen';
import DetailProductScreen from '../screens/DetailProductScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={'HomeScreen'}
      >
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'DetailProductScreen'} component={DetailProductScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
