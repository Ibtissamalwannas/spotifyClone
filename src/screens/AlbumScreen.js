import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import { Loading } from '../components/Lottie';


const onPress = async (URL) => {
  const url = `${URL}`;
  await Linking.canOpenURL(url);
  Linking.openURL(url);
};


const AlbumScreen = () => {
  const route = useRoute()
  let id = route.params.artistId
  let token = route.params.token
  let artistName = route.params.artistName

  const [album, setAlbum] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const AlbumData = async () => {
    const resp = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    return resp.data.items;
  };


  useEffect(() => {
    AlbumData().then(album => {
      setAlbum(album)
      setLoaded(true);
    }).catch(err => {
      setError(true)
      console.log(err)
    });
  }, []);

  return (
    <ScrollView>
      <View style={{ marginTop: 80 }}>
        <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>{artistName} Albums</Text>
        {album.map((data, i) => (
          <View key={i}>
            {data.images[0] &&
              <View style={styles.paper}>
                <Image source={{ uri: data.images[0].url }} style={styles.image} />
                <View style={styles.line}></View>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.artName}>{artistName}</Text>
                <View style={{ marginVertical: 10, marginLeft: 10 }}>
                  <Text style={{ color: 'gray' }}>{data.release_date}</Text>
                  <Text style={{ color: 'gray' }}>{data.total_tracks} tracks</Text>
                </View>
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.button} onPress={() => { onPress(data.external_urls.spotify) }}><Text>Preview on Spotify</Text></TouchableOpacity>
              </View>
            }
          </View>
        ))}
        {!loaded && Loading()}
      </View>
    </ScrollView>
  )
}

export default AlbumScreen

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
  line: {
    height: 1,
    width: Dimensions.get('window').width - 40,
    backgroundColor: 'gray',
    marginBottom: 10
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
  artName: {
    color: 'gray',
    marginLeft: 10
  },
  line: {
    height: 1,
    width: Dimensions.get('window').width - 40,
    backgroundColor: 'gray'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    padding: 15
  }
})
