import { View, Text, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IProductListItem } from '../interfaces';

const HomeScreen = () => {

  const [data, setData] = useState<IProductListItem[]>();
  const navigation = useNavigation();

  useEffect(() => {
    getDataApi();
  }, []);

  const getDataApi = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const renderItem = (renderItemInfo: ListRenderItemInfo<IProductListItem>) => {
    const { item, index } = renderItemInfo;
    return (
      <View style={styles.item}>
        <Text>Title: {item.title}</Text>
        <Text>Price: {item.price}</Text>
        <Text>Rating: {item.rating.rate}</Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList 
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: 'solid',
    padding: 10,
    margin: 10
  }
})

export default HomeScreen;
