// UserFollowButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const UserFollowButton = () => (
  <TouchableOpacity style={[styles.followButton, { borderColor: '#04BF55', backgroundColor: 'transparent', borderWidth: 1 }]}>
    <Text style={[styles.followButtonText, { color: 'white' }]}>Seguir</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  followButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
  },
});

export default UserFollowButton;
