import { View, Text, FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IUserListItem } from '../interfaces';

const HomeScreen = () => {

  const [data, setData] = useState<IUserListItem[]>();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataApi();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  const getDataApi = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://api.github.com/users');
      const data = await res.json();
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const navigateToDetailUser = (userId: string) => {
    navigation.navigate("DetailUserScreen", {
      userId: userId
    })
  }

  const renderItem = (renderItemInfo: ListRenderItemInfo<IUserListItem>) => {
    const { item } = renderItemInfo;
    return (
      <TouchableOpacity onPress={() => navigateToDetailUser(item.login)}>
        <View style={styles.item}>
          <Image style={styles.imageItem} source={{ uri: item.avatar_url }} />
          <View style={styles.userInfo}>
            <Text style={styles.title}>{item.login}</Text>
            <Text style={{ color: '#8C949E', fontSize: 16 }}>{item.type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const toFavouriteScreen = () => {
    navigation.navigate("FavouriteScreen")
  }

  return (
    <View style={styles.base}>
      {/* {userList} */}
      <FlatList 
        data={data}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.favButton}
        onPress={toFavouriteScreen}
      >
        <Image 
          style={styles.favImage}
          source={require('../../images/star_icon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#0D1016',
    width: "100%",
    height: "100%",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  loadingWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 20,
    borderStyle: 'solid',
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#C9D1D9',
    elevation: 10,
    alignItems: 'center'
  },
  imageItem: {
    margin: 'auto',
    borderRadius: 100,
    marginRight: 10,
    resizeMode: 'contain',
    width: 80,
    height: 80
  },
  userInfo: {
    width: "100%",
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D1016'
  },
  favButton: {
    position: 'absolute',
    right: 25,
    bottom: 20,
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#0D1016',
    alignContent: 'center',
    justifyContent: 'center'
  },
  favImage: {
    marginLeft: 2,
    marginBottom: 1,
    width: "90%",
    height: "90%",
  }
})

export default HomeScreen;
