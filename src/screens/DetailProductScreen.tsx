import { View, Text, Image, FlatList, ListRenderItemInfo, StyleSheet, Button, ScrollViewBase, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../naviagtion/RootStackParamList';
import { IProductListItem } from '../interfaces';

// const { height } = Dimensions.get('window')

const DetailProductScreen = () => {

  const [data, setData] = useState<IProductListItem>();
  // const [screenHeight, setScreenHeight] = useState<number>(0);
  const route = useRoute<RouteProp<RootStackParamList, 'DetailProductScreen'>>();
  const productId = route.params.productId;

  useEffect(() => {
    getDataApi();
  }, []);

  const getDataApi = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products/' + productId);
      const data = await res.json();
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  // const onContentSizeChange = (contentWidth, contentHeight) => {
  //   setScreenHeight(contentHeight)
  // }

  // const scrollEnabled = screenHeight > height ? true : false;
  return (
    // <ScrollView
    //   style={{ flex: 1 }}
    //   scrollEnabled={scrollEnabled}
    //   onContentSizeChange={onContentSizeChange}
    // >
      <View style={styles.base}>
        <View style={styles.imageWrapper}>
          <Image 
            style={styles.productImage}
            source={{ uri: data?.image }}
          />
        </View>
        <View style={styles.detailsWrapper}>
          <Text style={styles.price}>${data?.price}</Text>
          <Text style={styles.title}>{data?.title}</Text>
          <View style={styles.rating}>
            <Image 
              style={styles.starIcon}
              source={require('../../images/star_icon.png')}
            />
            <Text style={{ color: 'white' }}>{data?.rating.rate}</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.descTitle}>Description</Text>
            <Text style={styles.descBody}>{data?.description}</Text>
          </View>
        </View>


        {/* UNTUK CHECK UDH MASUK FAVOURITES ATAU BELUM */}
        {/* <Button 
          onPress={}
          title=
        /> */}
      </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#A3DA8D'
  },
  imageWrapper: {
    width: "100%",
    height: "50%",
    backgroundColor: 'white',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 10
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    borderRadius: 0
  },
  detailsWrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black'
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: 'black'
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#146356',
    width: "15%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: 15
  },
  starIcon: {
    width: "35%",
    height: "100%",
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginRight: 'auto'
  },
  description: {
    borderRadius: 10,
    backgroundColor: '#146356',
    padding: 10
  },
  descTitle: { 
    color: 'black', 
    fontWeight: '500', 
    fontSize: 16,
    backgroundColor: '#F3C892',
    padding: 10,
    borderRadius: 10,
    width: "29%"
  },
  descBody: {
    padding: 10,
    color: 'white'
  }
})

export default DetailProductScreen;
