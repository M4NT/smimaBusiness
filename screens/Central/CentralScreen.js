import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as MediaLibrary from 'expo-media-library';

const CentralScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedAlbum, setSelectedAlbum] = useState("Recentes");
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const albums = await MediaLibrary.getAlbumsAsync();
        setAlbums([{ id: 'recent', title: 'Recentes' }, ...albums]);
        loadPhotos('Recentes');
      }
    })();
  }, []);

  const loadPhotos = async (albumTitle) => {
    let mediaOptions = {
      first: 50,
      sortBy: ['creationTime'],
    };

    if (albumTitle !== "Recentes") {
      const album = albums.find(a => a.title === albumTitle);
      if (album) {
        mediaOptions.album = album.id;
      }
    }

    const media = await MediaLibrary.getAssetsAsync(mediaOptions);
    setPhotos(media.assets);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  };

  const switchCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity style={styles.photoItem}>
      <Image source={{ uri: item.uri }} style={styles.photoImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova publicação</Text>
        <TouchableOpacity style={styles.advanceButton}>
          <Text style={styles.advanceText}>Avançar</Text>
        </TouchableOpacity>
      </View>
      <Camera style={styles.camera} type={type} ref={cameraRef} ratio="1:1" />
      <View style={styles.albumHeader}>
        <Picker
          selectedValue={selectedAlbum}
          style={styles.albumPicker}
          onValueChange={(itemValue) => {
            setSelectedAlbum(itemValue);
            loadPhotos(itemValue);
          }}
        >
          {albums.map((album) => (
            <Picker.Item key={album.id} label={album.title} value={album.title} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.collageButton}>
          <MaterialCommunityIcons name="image-multiple" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} onPress={switchCamera}>
          <MaterialCommunityIcons name="camera-switch" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={4}
        style={styles.photoGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cancelButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 20,
    color: 'black',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  advanceButton: {
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  advanceText: {
    fontSize: 16,
    color: 'white',
  },
  camera: {
    aspectRatio: 1,
  },
  albumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  albumPicker: {
    width: '50%',
    height: 40,
  },
  collageButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoGrid: {
    flex: 1,
    marginHorizontal: 5,
  },
  photoItem: {
    flex: 1,
    margin: 2,
  },
  photoImage: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default CentralScreen;
