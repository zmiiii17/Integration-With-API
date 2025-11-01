import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { getSongs, Song } from '../api/data';
import SongCard from '../components/SongCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SongList'>;

export default function SongListScreen({ navigation }: Props) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getSongs();
      setSongs(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading songs…</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingVertical: 8 }}
      data={songs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SongCard
          song={item}
          onPress={() => navigation.navigate('SongDetail', { id: item.id })}
        />
      )}
      ListHeaderComponent={<Text style={styles.header}>Hot Electro Songs</Text>}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
