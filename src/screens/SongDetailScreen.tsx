import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
// Pastikan path ke App.tsx benar
import type { RootStackParamList } from '../../App'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Impor fungsi dan Tipe Song yang sudah diperbarui
import { getSongById, Song } from '../api/data';

// Definisikan Tipe Props untuk layar ini
type Props = NativeStackScreenProps<RootStackParamList, 'SongDetail'>;

export default function SongDetailScreen({ route }: Props) {
  // 1. Ambil 'id' lagu dari parameter navigasi
  const { id } = route.params;

  // 2. State untuk menyimpan data lagu dan status loading
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  // 3. useEffect untuk mengambil data saat layar dibuka
  useEffect(() => {
    (async () => {
      // Panggil fungsi getSongById dari api/data.tsx
      const data = await getSongById(id);
      setSong(data);
      setLoading(false);
    })();
  }, [id]); // Dependensi [id] agar data di-fetch ulang jika id berubah

  // 4. Tampilkan loading indicator
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading song details...</Text>
      </View>
    );
  }

  // 5. Tampilkan pesan jika lagu tidak ditemukan
  if (!song) {
    return (
      <View style={styles.center}>
        <Text>Error: Song not found.</Text>
      </View>
    );
  }

  // 6. Tampilkan detail lagu jika data berhasil diambil
  return (
    <ScrollView style={styles.container}>
      {/* Tampilkan gambar dari 'song.avatar' */}
      <Image source={{ uri: song.avatar }} style={styles.image} />
      
      <View style={styles.content}>
        {/* Tampilkan judul dari 'song.name' */}
        <Text style={styles.title}>{song.name}</Text>

        {/* Tampilkan data 'genre', 'score', dan 'description' */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Genre:</Text>
          <Text style={styles.value}>{song.genre}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Score:</Text>
          <Text style={styles.value}>{song.score}</Text>
        </View>
        
        <Text style={styles.labelDescription}>Description</Text>
        <Text style={styles.description}>{song.description}</Text>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250, // Tinggi gambar banner
    backgroundColor: '#eee', // Placeholder
  },
  content: {
    padding: 20, // Padding untuk konten teks
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Jarak di bawah judul
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10, // Jarak antar baris
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  labelDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15, // Jarak di atas deskripsi
  },
  value: {
    fontSize: 16,
    color: 'gray', // Sesuai screenshot Anda
    flex: 1, // Agar teks bisa wrap
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    lineHeight: 22, // Jarak antar baris deskripsi
  },
});