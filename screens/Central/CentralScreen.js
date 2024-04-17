import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, ImageBackground, Alert, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { FileSystem } from 'expo-file-system';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as MediaLibrary from 'expo-media-library';
import { ImageEditor } from 'expo';

const CentralScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedAlbum, setSelectedAlbum] = useState("Recentes");
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [collageMode, setCollageMode] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isCollageModeActive, setIsCollageModeActive] = useState(false);
  const [collageCounter, setCollageCounter] = useState(1);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [doubleTapTimer, setDoubleTapTimer] = useState(null);
  const [photoAspectRatio, setPhotoAspectRatio] = useState(1);
  const [selectedPhotoUri, setSelectedPhotoUri] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null); // Armazenar a foto capturada

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
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

  const toggleCollageMode = () => {
    setCollageMode(!collageMode);
    if (selectedPhotos.length > 0) {
      setIsCollageModeActive(true);
    }
  };

  // Função para tirar uma foto
  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({
        allowsEditing: false, // Não permite a edição da foto aqui
        quality: 0.8 // Define a qualidade da foto (0.8 é um exemplo)
      });

      setCapturedPhoto(photo); // Armazenar a foto capturada
    }
  };

  const switchCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handlePhotoPressIn = (index) => {
    setLongPressTimer(
      setTimeout(() => {
        setIsCollageModeActive(true);
        setCollageMode(true);
        setSelectedPhotoIndex(index);
      }, 500)
    );
  };

  const handlePhotoPressOut = () => {
    clearTimeout(longPressTimer);
    if (collageMode) {
      setLongPressTimer(null);
      startCollageCounter();
    }
  };

  const handlePhotoSelect = (index) => {
    if (!collageMode && index !== 0) {
      setSelectedPhotoIndex(index);
      setSelectedPhotoUri(photos[index]?.uri);
    }
  };

  const renderPhotoItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.photoItem}
        onPressIn={() => handlePhotoPressIn(index)}
        onPressOut={handlePhotoPressOut}
        onPress={() => handlePhotoSelect(index)}
        delayLongPress={300}
      >
        <ImageBackground
          source={{ uri: item.uri }}
          style={styles.photoImage}
        >
          {selectedPhotos.includes(index) && (
            <View style={styles.selectedIndicator}>
              <Text style={styles.selectedIndicatorText}>{selectedPhotos.indexOf(index) + 1}</Text>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const startCollageCounter = () => {
    let counter = 9;
    const timer = setInterval(() => {
      if (counter === 0) {
        clearInterval(timer);
        setCollageCounter(1);
        setIsCollageModeActive(false);
        return;
      }
      setCollageCounter(counter);
      counter--;
    }, 1000);
  };

  // Função para redimensionar a foto capturada
  const resizeCapturedPhoto = async () => {
    if (capturedPhoto) {
      const resizedPhoto = await ImageEditor.resize(capturedPhoto.uri, {
        width: 300, // Largura desejada
        height: 300, // Altura desejada
        format: 'jpeg', // Formato desejado
      });

      // Você pode fazer o que quiser com a foto redimensionada aqui, como exibí-la em um componente Image

      console.log(resizedPhoto); // Aqui você pode lidar com a foto redimensionada
    }
  };

  return (
    <View style={styles.container}>
      {!selectedPhotoIndex && !isCollageModeActive && !capturedPhoto ? (
        <Camera style={styles.camera} type={type} ref={cameraRef} ratio="4:4" />
      ) : (
        <View style={styles.previewContainer}>
          <ImageBackground source={{ uri: capturedPhoto?.uri }} style={styles.capturedPhoto}>
            {/* Aqui você pode adicionar componentes para permitir a edição da foto */}
            <TouchableOpacity style={styles.controlButton} onPress={resizeCapturedPhoto}>
              <Text style={{ color: 'white' }}>Redimensionar</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}
      {!selectedPhotoIndex && (
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
          <TouchableOpacity
            style={[styles.collageButton, collageMode && styles.collageButtonActive]}
            onPress={toggleCollageMode}
          >
            <MaterialCommunityIcons name="image-multiple" size={24} color={collageMode ? "white" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={switchCamera}>
            <MaterialCommunityIcons name="camera-switch" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <MaterialCommunityIcons name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
      {!selectedPhotoIndex && !isCollageModeActive && !capturedPhoto && (
        <FlatList
          data={photos}
          renderItem={renderPhotoItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
          style={styles.photoGrid}
        />
      )}
      {isCollageModeActive && (
        <TouchableOpacity style={styles.nextButton}>
          <MaterialCommunityIcons name="arrow-right" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    aspectRatio: 1,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    marginHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
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
  collageButtonActive: {
    backgroundColor: 'blue',
    borderRadius: 15,
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
    aspectRatio: 1, // Manter as fotos quadradas
  },
  photoImage: {
    flex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorText: {
    color: 'black',
    fontWeight: 'bold',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  selectedPhotoCounter: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedPhotoCounterText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CentralScreen;
