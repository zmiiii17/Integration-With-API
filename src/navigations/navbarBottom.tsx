import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieListScreen from '../screens/MovieListScreen';
import SongListScreen from '../screens/SongListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function NavbarBottom() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Movies') {
            iconName = 'film-outline';
          } else if (route.name === 'Songs') {
            iconName = 'musical-notes-outline';
          }

          return <Text>▶️</Text>;
        },
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Movies" component={MovieListScreen} />
      <Tab.Screen name="Songs" component={SongListScreen} />
    </Tab.Navigator>
  );
}
