import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SongListScreen from '../screens/SongList/SongListScreen'
import SongDetailScreen from '../screens/SongDetail/SongDetailScreen'


const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SongListScreen" component={SongListScreen} />
        <Stack.Screen name="SongDetailScreen" component={SongDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;