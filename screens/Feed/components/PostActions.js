// PostActions.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const PostActions = () => (
  <View style={styles.postActions}>
    {/* Botões restantes mantidos aqui */}
  </View>
);

const styles = StyleSheet.create({
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PostActions;
