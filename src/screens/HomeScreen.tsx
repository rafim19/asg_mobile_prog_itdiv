import { View, Text, FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

  const navigateToDetailProduct = (product: IProductListItem) => {
    navigation.navigate("DetailProductScreen", {
      product: product
    })
  }

  const renderItem = (renderItemInfo: ListRenderItemInfo<IProductListItem>) => {
    const { item, index } = renderItemInfo;
    return (
      <TouchableOpacity onPress={() => navigateToDetailProduct(item)}>
        <View style={styles.item}>
          <Image style={styles.imageItem} source={{ uri: item.image }} />
          <View style={styles.productInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Rating: {item.rating.rate}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
  base: {
    backgroundColor: '#f2f2f2'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 20,
    borderStyle: 'solid',
    padding: 20,
    margin: 10,
    backgroundColor: '#FFFFFF',
    elevation: 10
  },
  productInfo: {
    width: "60%",
    padding: 10
  },
  imageItem: {
    aspectRatio: 0.9,
    marginRight: 10,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default HomeScreen;
