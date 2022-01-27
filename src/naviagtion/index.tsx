import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import HomeScreen from '../screens/HomeScreen';
import DetailUserScreen from '../screens/DetailUserScreen';
import FavouriteScreen from '../screens/FavouriteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={'HomeScreen'}
      >
        <Stack.Screen 
          name={'HomeScreen'} 
          component={HomeScreen}
          options={{
              title: 'Para Petinggi Github',
              headerStyle: {
                backgroundColor: '#0D1016',
              },
              headerTintColor: '#C9D1D9'
          }}
        />
        <Stack.Screen 
          name={'DetailUserScreen'} 
          component={DetailUserScreen} 
          options={{ 
            title: 'Detail Petinggi',
            headerStyle: {
              backgroundColor: '#0D1016',
            },
            headerTintColor: 'white'
          }}
        />
        <Stack.Screen 
          name={'FavouriteScreen'} 
          component={FavouriteScreen}
          options={{ 
            title: 'Petinggi Favorit',
            headerStyle: {
              backgroundColor: '#0D1016',
            },
            headerTintColor: 'white'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
