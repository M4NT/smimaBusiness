import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Modal, Image, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const CentralScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
        loadPhotos();
      }
    })();
  }, []);

  const loadPhotos = async () => {
    const media = await MediaLibrary.getAssetsAsync({ first: 50, sortBy: ['creationTime'] });
    setPhotos(media.assets);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const openDescriptionModal = () => {
    setModalVisible(true);
  };

  const closeDescriptionModal = () => {
    setModalVisible(false);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Permissão para acessar a câmera foi negada.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <MaterialCommunityIcons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {selectedPhotos.map((photo, index) => (
          <Image key={index} source={{ uri: photo.uri }} style={styles.selectedPhoto} />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeDescriptionModal}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={closeDescriptionModal}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Adicione uma descrição..."
              value={description}
              onChangeText={handleDescriptionChange}
              style={styles.descriptionInputModal}
              multiline={true}
            />
          </View>
        </TouchableOpacity>
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
    flex: 1,
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
  selectedPhoto: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  descriptionContainer: {
    padding: 10,
  },
  descriptionLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  descriptionInputModal: {
    width: '100%',
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default CentralScreen;
