import { StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#ecf0f1',
    },
    listView:{
        margin:10,
        flexDirection:'row',
    },
    dataView:{
        margin:10,
        flexDirection:'column'
    },
    artistView:{
        flexDirection:'row'
    },
    artistText:{
       fontSize:12,
       fontWeight:'bold'
    },
    artistNameText:{
        width:'60%',
        fontSize:14,
     },
     trackText:{
         width:'80%'
     },
     loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
     
  });

  export default styles