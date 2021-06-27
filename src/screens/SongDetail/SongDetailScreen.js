import React from 'react'
import { Text,View,Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles'

function SongDetailScreen ({navigation,route}) {
    const data = route.params.data
    const date = new Date(data.releaseDate).toString()
     return(
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
            <Image style={{alignSelf:'center', width:100,height:100}} source={{uri:data.artworkUrl100}}      />
            <Text style={styles.detailText}><Text style={styles.boldText}>Artist : </Text>{data.artistName}</Text>
            <Text style={styles.detailText}><Text style={styles.boldText}>Collection Name : </Text>{data.collectionName}</Text>
            <Text style={styles.detailText}><Text style={styles.boldText}>Track Name : </Text>{data.trackName}</Text>
            <Text style={styles.detailText}><Text style={styles.boldText}>Description : </Text>{data.description}</Text>
            <Text style={styles.detailText}><Text style={styles.boldText}>Collection Price : </Text>{data.collectionPrice}</Text>
            <Text style={styles.detailText}><Text style={styles.boldText}>Track Price : </Text>{data.trackPrice}</Text>
            <Text style={styles.detailText}><Text style={styles.boldText}>Country : </Text>{data.country}</Text>

        </View>
   </ScrollView>
     )
}

export default SongDetailScreen