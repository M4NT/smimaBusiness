import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CentralScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Central Screen</Text>
      <Button 
        title="Go to Feed"
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CentralScreen;
