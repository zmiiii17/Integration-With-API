import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavbarBottom from './src/navigations/navbarBottom';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SongDetailScreen from './src/screens/SongDetailScreen';

export type RootStackParamList = {
  Tabs: undefined;
  MovieDetail: { id: string; title?: string };
  SongDetail: { id: string; title?: string };
  SongList: undefined;
  MovieList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={NavbarBottom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={({ route }) => ({ title: route.params?.title || 'Movie Detail' })}
        />
        <Stack.Screen
          name="SongDetail"
          component={SongDetailScreen}
          options={({ route }) => ({ title: route.params?.title || 'Song Detail' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
