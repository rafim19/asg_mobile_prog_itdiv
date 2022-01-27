import { View, Text, Image, StyleSheet, FlatList, ListRenderItemInfo, Button, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../naviagtion/RootStackParamList';
import { IUserListItem } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../store';
import { addFavouriteUser, deleteFavouriteUser } from '../store/FavouriteReducer/FavouriteReducer';
import { IUserDetail } from '../interfaces/UserDetail';
import { IRepoList } from '../interfaces/repoList';
import { IOrganizationList } from '../interfaces/OrganizationList';

const DetailUserScreen = () => {
  const initialState = {
    login: "",
    id: 0,
    node_id: "",
    avatar_url: "dummyLink",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "",
    site_admin: false,
    name: "",
    company: "",
    blog: "",
    location: "",
    email: "",
    hireable: "",
    bio: "",
    twitter_username: "",
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: "",
    updated_at: ""
  } 

  const [data, setData] = useState<IUserDetail>(initialState);
  const [repos, setRepos] = useState<IRepoList[]>();
  const [organization, setOrganization] = useState<IOrganizationList[]>();
  const [loading, setLoading] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, 'DetailUserScreen'>>();
  const userId = route.params.userId;
  const dispatch = useDispatch();
  const favourite = useSelector((state: RootState) => state.favourite)

  const checkFavouritedItem = (login: string) => {
    let flag = false
    favourite.item.forEach(user => {
      if (user.login === login) {
        flag = true
        return
      }
    })
    return flag
  }
  
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
      const res = await fetch('https://api.github.com/users/' + userId);
      const data = await res.json();
      setData(data)
      const res2 = await fetch(data.repos_url);
      const repos = await res2.json()
      setRepos(repos)
      const res3 = await fetch(data.organizations_url);
      const org = await res3.json()
      setOrganization(org)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const showAlert = (title: string, msg: string) => {
    return (
      Alert.alert(
        title,
        msg,
      )
    )
  }

  const addToFavourite = (data: IUserListItem) => {
    dispatch(addFavouriteUser(data))
    showAlert("Successfully Added", data.login + "has been added to Favourites")
  }

  const deleteFromFavourite = (login: string) => {
    dispatch(deleteFavouriteUser(login))
    showAlert("Removed", data.login + "has been removed to Favourites")
  }

  const checkBio = () => {
    if (data.bio) 
    return (
      <Text 
        style={{ color: '#C9D1D9', marginBottom: 10, paddingLeft: 20, paddingRight: 20 }}
      >
        {data.bio}
      </Text>
    )
  }

  const renderRepos = (renderItemInfo: ListRenderItemInfo<IRepoList>) => {
    const { item, index } = renderItemInfo;
    if (item.visibility === 'public') {
      return (
        <View style={styles.repoWrapper}>
          <Text style={styles.repoName}>{item.name}</Text>
          <View style={styles.repoInfo}>
            <View style={styles.forkWrapper}>
              <Image 
                style={styles.forkIcon}
                source={require('../../images/fork_spoon_cutlery_icon_177633.png')}
              />
              <Text style={styles.forksCount}>{item.forks_count}</Text>
            </View>
            <View style={styles.langWrapper}>
              <Image 
                  style={styles.langIcon}
                  source={require('../../images/language_117614.png')}
                />
              <Text style={styles.langText}>{item.language}</Text>
            </View>
          </View>
        </View>
      )
    }
    return
  }

  return (
    <View style={styles.base}>
      <View style={styles.mainInfoWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.userImage}
            source={{ uri: data.avatar_url }}
          />
        </View>
        <View style={styles.userName}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.loginName}>{data.login}</Text>
        </View>
      </View>
      {checkBio()}
      <View style={styles.githubLink}>
        <Image 
          style={styles.linkIcon}
          source={require('../../images/link_icon-icons.com_70055.png')}
        />
        <Text style={{ color: '#C9D1D9', fontWeight: 'bold' }}>{data.html_url}</Text>
      </View>
      <View style={styles.follWrapper}>
        <Image 
          style={styles.follIcon}
          source={require('../../images/4105943-accounts-group-people-user-user-group-users_113923.png')}
        />
        <Text style={styles.followersCount}>{data.followers}</Text>
        <Text style={styles.foll}>Followers</Text>
        <Text style={styles.followersCount}>{data.following}</Text>
        <Text style={styles.foll}>Following</Text>
      </View>
      <View style={{ height: "2%", backgroundColor: '#080808' }}></View>
      <View style={styles.pinRepoWrapper}>
        <View style={styles.pinRepoTitle}>
          <Image 
            style={styles.pinIcon}
            source={require('../../images/view_pin_icon_181222.png')}
          />
          <Text style={{ color: '#C9D1D9', fontWeight: 'bold' }}>Top Repositories</Text>
        </View>
        <FlatList 
          horizontal={true}
          data={repos?.slice(0, 5)}
          renderItem={renderRepos}
        />
      </View>
      <View style={styles.moreInfoWrapper}>
        <View style={styles.bottomRepoWrapper}>
          <View style={styles.repoIconWrapper}>
            <Image 
              style={styles.repoIcon}
              source={require('../../images/Book-bookmark_icon-icons.com_52252.png')}
            />
          </View>
          <Text style={styles.repoText}>Repositories</Text>
          <Text style={{ color: '#C9D1D9' }}>{data.public_repos}</Text>
        </View>
        <View style={styles.bottomRepoWrapper}>
          <View style={styles.repoIconWrapper}>
            <Image 
              style={styles.repoIcon}
              source={require('../../images/organization2.png')}
            />
          </View>
          <Text style={styles.repoText}>Organization</Text>
          <Text style={{ color: '#C9D1D9' }}>{organization?.length}</Text>
        </View>
        {
          (checkFavouritedItem(data.login))
          ?
            <Button 
              onPress={() => deleteFromFavourite(data.login)}
              title='Remove From Favourites'
            />
          :
            <Button 
              onPress={() => addToFavourite(data)}
              title='Add To Favourites'
            />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#0D1016',
  },
  loadingWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    height: "14%",
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageWrapper: {
    width: "23%",
    height: "100%",
    marginTop: 10
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 70
  },
  userName: {
    height: "100%",
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  name: {
    fontSize: 24,
    color: '#C9D1D9',
    fontWeight: 'bold'
  },
  loginName: {
    fontSize: 15,
    color: '#8C949E',
  },
  githubLink: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    height: "5%",
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  linkIcon: {
    width: "5%",
    height: "53%",
    marginRight: 10,
    resizeMode: 'contain'
  },
  follWrapper: {
    flexDirection: 'row',
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15
  },
  follIcon: {
    width: "5%",
    height: "100%",
    resizeMode: 'contain',
    marginRight: 10
  },
  followersCount: { 
    fontWeight: 'bold', 
    color: '#C9D1D9',
    marginRight: 5
  },
  foll: {
    color: '#C9D1D9',
    marginRight: 10
  },
  pinRepoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: "100%",
    height: "31%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  pinRepoTitle: {
    width: "100%",
    height: "15%",
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  pinIcon: {
    width: "7%",
    height: "100%"
  },
  repoWrapper: {
    marginRight: 20,
    width: 'auto',
    height: "90%",
    borderWidth: 1,
    borderColor: '#3a3d3f',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#18191a'
  },
  repoName: {
    color: '#C9D1D9',
    fontWeight: 'bold'
  },
  repoInfo: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row'
  },
  forkWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    marginRight: 10
  },
  forkIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  forksCount: {
    color: '#8C949E',
  },
  langWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    marginRight: 10
  },
  langIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
    marginRight: 5,
  },
  langText: {
    color: '#8C949E',
  },
  moreInfoWrapper: {
    position: 'absolute',
    bottom: 0,
    height: "30%",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },
  bottomRepoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: "100%",
    marginBottom: 10
  },
  repoIconWrapper: { 
    display: 'flex', 
    alignItems: 'center', 
    backgroundColor: '#080808', 
    width: 30, 
    paddingTop: 10, 
    paddingBottom: 10,
    paddingLeft: 17,
    paddingRight: 17,
    borderRadius: 10,
    marginRight: 20
  },
  repoIcon: {
    width: 15,
    height: 20
  },
  repoText: {
    color: '#C9D1D9',
    fontWeight: 'bold',
    marginRight: 'auto'
  }
})

export default DetailUserScreen;
