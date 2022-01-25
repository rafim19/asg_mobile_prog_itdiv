import { View, Text, Image } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../naviagtion/RootStackParamList';

const DetailProductScreen = () => {

  const route = useRoute<RouteProp<RootStackParamList, 'DetailProductScreen'>>();
  const { id, title, price, description, category, image, rating } = route.params.product;

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default DetailProductScreen;
