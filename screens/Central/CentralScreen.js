import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Modal, TouchableWithoutFeedback, Dimensions, ImageBackground, ScrollView, Animated } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

const CentralScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedAlbum, setSelectedAlbum] = useState("Recentes");
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [deleteIconVisible, setDeleteIconVisible] = useState(false);
  const [deleteIconPosition, setDeleteIconPosition] = useState(new Animated.Value(-1));

  const cameraRef = useRef(null);
  const scrollViewRef = useRef(null);

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

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

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({
        allowsEditing: true,
        quality: 0.8,
        aspect: [1, 1] // Captura no formato 1:1
      });

      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const openDescriptionModal = () => {
    setModalVisible(true);
  };

  const closeDescriptionModal = () => {
    setModalVisible(false);
  };

  const handlePhotoSelection = async (photo) => {
    if (selectedPhotos.length >= 9) {
      return;
    }
    setSelectedPhotos([...selectedPhotos, photo]);
  };

  const handleDeleteIconPress = (index) => {
    const newSelectedPhotos = [...selectedPhotos];
    newSelectedPhotos.splice(index, 1);
    setSelectedPhotos(newSelectedPhotos);
  };

  const handleLongPress = (index) => {
    setDeleteIconVisible(true);
    Animated.timing(deleteIconPosition, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    setDeleteIconVisible(false);
  };

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = (index) => {
    setDragging(false);
    const newIndex = Math.floor(deleteIconPosition._value);
    if (index !== newIndex) {
      const newSelectedPhotos = [...selectedPhotos];
      const [removedPhoto] = newSelectedPhotos.splice(index, 1);
      newSelectedPhotos.splice(newIndex, 0, removedPhoto);
      setSelectedPhotos(newSelectedPhotos);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={type} ref={cameraRef} />
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <MaterialCommunityIcons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.albumAndDescriptionContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 5 }}
        >
          {selectedPhotos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              style={styles.selectedPhotoContainer}
              onPress={() => handlePhotoSelection(photo)}
              onLongPress={() => handleLongPress(index)}
              onPressOut={handlePressOut}
            >
              <Animated.View
                style={[
                  styles.selectedPhoto,
                  { opacity: dragging ? 0.7 : 1, marginLeft: index === 0 ? 0 : 5 },
                  index === deleteIconPosition ? { position: 'absolute', right: 5, top: 5 } : null,
                ]}
              >
                <ImageBackground source={{ uri: photo.uri }} style={styles.photoPreview}>
                  {selectedPhotos.length > 1 && (
                    <View style={styles.photoCountContainer}>
                      <Text style={styles.photoCount}>{index + 1}</Text>
                    </View>
                  )}
                </ImageBackground>
              </Animated.View>
              {deleteIconVisible && index === deleteIconPosition && (
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleDeleteIconPress(index)}
                >
                  <MaterialCommunityIcons name="trash-can-outline" size={20} color="black" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Descrição da foto</Text>
          <TextInput
            placeholder="Adicione uma descrição..."
            value={description}
            onChangeText={handleDescriptionChange}
            style={styles.descriptionInput}
            multiline={true}
            onFocus={openDescriptionModal}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeDescriptionModal}
      >
        <TouchableWithoutFeedback onPress={closeDescriptionModal}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TextInput
                  placeholder="Adicione uma descrição..."
                  value={description}
                  onChangeText={handleDescriptionChange}
                  style={styles.descriptionInputModal}
                  multiline={true}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 5,
  },
  camera: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  captureButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 50,
  },
  albumAndDescriptionContainer: {
    marginBottom: 10,
  },
  selectedPhotoContainer: {
    marginRight: 5,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedPhoto: {
    width: 70,
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  photoCountContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 50,
    margin: 5,
  },
  photoCount: {
    color: 'white',
    fontSize: 12,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  descriptionLabel: {
    fontSize: 10,
    marginBottom: 5,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    height: 100,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  descriptionInputModal: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 50,
    padding: 5,
  },
});

export default CentralScreen;
