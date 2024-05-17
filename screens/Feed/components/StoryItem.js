// StoryComponent.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StoryItem = ({ image, index, onPress }) => (
  <TouchableOpacity style={styles.storyItem} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.storyImage} />
    <Text style={styles.storyText}>Assunto {index + 1}</Text>
  </TouchableOpacity>
);

const StoryComponent = ({ storyImages }) => (
  <View style={styles.storyContainer}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity style={styles.storyItem} onPress={() => console.log('Criar novo story')}>
        <View style={[styles.storyImage, { backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="add" size={32} color="white" />
        </View>
        <Text style={styles.storyText}>Criar</Text>
      </TouchableOpacity>
      {storyImages.map((image, index) => (
        <StoryItem key={index} image={image} index={index} onPress={() => console.log(`Abrir story ${index}`)} />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  storyContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  storyText: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default StoryComponent;
