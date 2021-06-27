import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from "react-native";
import styles from "./styles";
import SoundPlayer from "react-native-sound-player";

class SongListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songData: [],
      loading: true,
      refresh:false
    };
  }

  componentDidMount() {
    this.getSongList();
  }

  getSongList() {
    fetch("https://itunes.apple.com/search?term=Michael+jackson", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("songData",JSON.stringify(data))
        var resulting = data.results;
        var result = resulting.map(function (el) {
          var o = Object.assign({}, el);
          o.isPlaying = true;
          return o;
        });
        this.setState({ songData: result, loading: false,refresh:false }, () => {});
      })
      .catch((error) => {
        alert(error);
        this.setState({ loading: false,refresh:false });
        console.error("Error:", error);
      });
  }
  play(url, currentIndex) {
    var resulting = this.state.songData;
    var stop = false;
    var result = resulting.map(function (el) {
      var o = Object.assign({}, el);
      if (!o.isPlaying && url == o.previewUrl) {
        o.isPlaying = true;
        stop = true;
        return o;
      }
      if (o.previewUrl == url) {
        o.isPlaying = false;
      } else {
        o.isPlaying = true;
      }
      return o;
    });
    this.setState({ songData: result }, () => {});

    if (stop) {
      SoundPlayer.stop();
      return;
    }
    try {
      // play the file tone.mp3
      // or play from url
      SoundPlayer.loadUrl(url);
      SoundPlayer.addEventListener("FinishedLoadingURL", ({ success, url }) => {
        this.setState({ currentAudio: url });
        SoundPlayer.play();
      });
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
    if (this.state.currentAudio == url) {
      SoundPlayer.stop();
      return;
    }
  }
  onRefresh = () => {
    this.getSongList()
    this.setState({refresh: true});
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{flexGrow:1}}>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.refresh}
          onRefresh={()=>this.onRefresh()}
        />
      }
       contentContainerStyle={{ flex:1 }}
       >
        <View style={styles.container}>
          {this.state.songData.map((item, index) => {
            //item.isPlaying = false
            const image = !item.isPlaying
              ? require("../../images/pause.jpeg")
              : require("../../images/play.png");

            return (
              <TouchableOpacity
                key={item.previewUrl}
                onPress={() =>
                  navigation.navigate("SongDetailScreen", { data: item })
                }
                style={styles.listView}
              >
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: item.artworkUrl100 }}
                />

                <View style={styles.dataView}>
                  <TouchableOpacity
                    onPress={() =>
                      setTimeout(() => {
                        this.play(item.previewUrl, index);
                      }, 1500)
                    }
                  >
                    <Image style={{ width: 25, height: 25 }} source={image} />
                  </TouchableOpacity>
                  <Text style={styles.trackText}>{item.trackName}</Text>
                  <Text style={styles.trackText}>{item.primaryGenreName}</Text>
                  <View style={styles.artistView}>
                    <Text style={styles.artistText}>Artist Name: </Text>
                    <Text style={styles.artistNameText}>{item.artistName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
      </ScrollView>
      </View>
    );
  }
}

export default SongListScreen;

