import { View, Text, StyleSheet, FlatList, TouchableOpacity, ListRenderItemInfo, Image } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { IUserListItem } from '../interfaces';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { deleteFavouriteUser } from '../store/FavouriteReducer/FavouriteReducer';

const FavouriteScreen = () => {
  const dispatch = useDispatch();
  const favourite = useSelector((state: RootState) => state.favourite)
  const navigation = useNavigation()

  const navigateToDetailUser = (userId: string) => {
    navigation.navigate("DetailUserScreen", {
      userId: userId
    })
  }

  const deleteFromFavourite = (login: string) => {
    const msgBody = login + "has beenn remove from favourites"
    dispatch(deleteFavouriteUser(login))
    Alert.alert(
      "Removed",
      msgBody
    )
  }

  const renderItem = (renderItemInfo: ListRenderItemInfo<IUserListItem>) => {
    const { item } = renderItemInfo;
    return (
        <TouchableOpacity onPress={() => navigateToDetailUser(item.login)}>
          <View style={styles.item}>
            <Image style={styles.imageItem} source={{ uri: item.avatar_url }} />
            <View style={styles.userInfo}>
              <Text style={styles.title}>{item.login}</Text>
              <Text style={{ color: '#8C949E' }}>{item.type}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteFromFavourite(item.login)}>
              <Image 
                style={styles.trashIcon}
                source={require('../../images/trash-can-black-symbol_icon-icons.com_72914.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
    )
  }

  return (
    <View style={styles.base}>
      <FlatList 
        data={favourite.item}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#0D1016'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 20,
    borderStyle: 'solid',
    padding: 20,
    margin: 10,
    backgroundColor: '#C9D1D9',
    elevation: 10,
  },
  imageItem: {
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 50,
    aspectRatio: 1,
    marginRight: 10,
    resizeMode: 'contain'
  },
  userInfo: {
    width: "60%",
    padding: 10,
    marginRight: 'auto'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D1016'
  },
  trashIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    width: 40,
    height: 40
  }
})

export default FavouriteScreen;
