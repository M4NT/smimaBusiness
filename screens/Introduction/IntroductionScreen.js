import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WavingHand from '../../assets/icons/hand-waving.svg';
import PlantIntroduction from '../../assets/plant-introduction.svg';

const IntroductionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem vindo ao</Text>
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>Smima</Text>
        <WavingHand width={50} height={50} style={styles.icon} />
      </View>
      <PlantIntroduction width="100%" height="50%" style={styles.image} />
      <Text style={styles.description}>
        A melhor comunidade de plantas em um único app com tudo o que você precisa!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IntroductionLogin')}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'normal',
    color: '#000',
    marginBottom: 10,
    marginLeft: -120,
  },
  appNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  appName: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 0,
    marginLeft: -40,
    marginTop: -30,
  },
  icon: {
    marginLeft: 10,
    marginBottom: 10,
  },
  image: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: -50,
  },
  button: {
    backgroundColor: '#2ecc71',
    width: '90%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IntroductionScreen;
