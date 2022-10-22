import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { Rating } from 'react-native-stock-star-rating'
import { AntDesign } from '@expo/vector-icons';
import Animated, { SlideInLeft } from 'react-native-reanimated'
import { EmptyData, Loading } from '../components/Lottie';


const ArtistSearch = () => {
  const route = useRoute()
  let token = route.params.token
  const navigation = useNavigation();

  const [artist, setArtist] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [empty, SetEmpty] = useState(false)

  const ArtistData = async () => {
    const resp = await axios.get('https://api.spotify.com/v1/search?query=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=artist&market=ES&locale=en-US%2Cen%3Bq%3D0.9&offset=5&limit=10', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    return resp.data.artists.items;
  };

  useEffect(() => {
    ArtistData().then(artists => {
      setArtist(artists)
      setMasterData(artists)
      setLoaded(true);
    }).catch(err => {
      console.log(err)
    });
  }, []);


  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1;
      });
      if (newData.length === 0) SetEmpty(true)
      setArtist(newData);
      setSearch(text)
    } else {
      setArtist(masterData);
      setSearch(text)
      SetEmpty(false)
    }

  }

  return (
    <ScrollView>
      <View style={{ alignItems: 'center', marginTop: 90 }}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Search for an artist..."
            underlineColorAndroid="transparent"
            value={search}
            onChangeText={(text) => searchFilter(text)}
          />
          <AntDesign name="search1" size={24} color="Black" />
        </View>
      </View>
      {artist.map((data, i) => (
        data.images[0] &&
        <Animated.View
          key={i}
          entering={SlideInLeft.delay(i * 300)}
        >
          <Pressable onPress={() => { navigation.navigate('AlbumScreen', { artistId: data.id, token: token, artistName: data.name }) }}>
            <View>
              <View style={styles.paper}>
                <View>
                  <Image source={{ uri: data.images[0].url }} style={styles.image} />
                  <View style={{ height: 1, width: Dimensions.get('window').width - 40, backgroundColor: 'gray', marginBottom: 10 }}></View>
                  <Text style={styles.name}>{data.name}</Text>
                  <Text style={styles.follower}>{data.followers.total} followers</Text>
                  <View style={{ marginLeft: 10 }}>
                    <Rating stars={data.popularity / 2} maxStars={5} size={25} />
                  </View>
                  <View style={{ marginBottom: 20 }} />
                </View>
              </View>
            </View>
          </Pressable>
        </Animated.View>
      ))}
      {!loaded && Loading()}
      {empty && EmptyData()}
    </ScrollView>
  )
}

export default ArtistSearch

const styles = StyleSheet.create({
  paper: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.002,
    shadowRadius: 22,
    elevation: 3,
    margin: 8,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderWidth: 0.2
  },
  heading: {
    fontSize: 17,
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10, marginBottom: 20
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
  searchSection: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'Black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  image: {
    height: 350,
    width: Dimensions.get('window').width - 40,
    resizeMode: 'cover'
  },
  name: {
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: '600'
  },
  follower: {
    color: 'gray',
    marginLeft: 10,
    marginBottom: 10
  }
})
