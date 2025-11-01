import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// Impor Tipe Song dari file data Anda
import { Song } from '../api/data'; 

// 1. Definisikan tipe untuk props yang diterima SongCard
type SongCardProps = {
  song: Song;
  onPress: () => void; // Prop untuk navigasi
};

// 2. Terima 'song' dan 'onPress' sebagai props
const SongCard = ({ song, onPress }: SongCardProps) => {
  return (
    // 3. Gunakan TouchableOpacity agar card bisa diklik
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      {/* * 4. Tampilkan gambar menggunakan 'song.avatar'
       * (Sebelumnya mungkin 'song.cover' atau 'song.img')
       */ }
      <Image 
        source={{ uri: song.avatar }} 
        style={styles.image} 
      />

      <View style={styles.info}>
        {/* * 5. Tampilkan judul lagu menggunakan 'song.name'
         * (Sebelumnya mungkin 'song.title')
         */ }
        <Text style={styles.title} numberOfLines={1}>{song.name}</Text>
        
        {/* * CATATAN: Schema mockapi Anda tidak memiliki 'artist'. 
         * Anda bisa menampilkan tanggal dibuat, atau kembali ke mockapi.io
         * untuk menambahkan field 'artist' di schema Anda.
         */}
        <Text style={styles.artist}>
          ID: {song.id}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// 6. Styling untuk card
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16, // Sesuaikan dengan list Anda
    backgroundColor: 'black',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center', // Pusatkan item secara vertikal
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8, // Sedikit bulat di sudut
    marginRight: 15,
    backgroundColor: '#eee', // Warna placeholder saat loading
  },
  info: {
    flex: 1, // Agar teks bisa mengisi sisa ruang
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white'
  },
  artist: {
    fontSize: 14,
    color: 'white',
  },
});

export default SongCard;