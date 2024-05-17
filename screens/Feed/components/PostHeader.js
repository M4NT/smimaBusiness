// PostHeader.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostHeader = ({ post }) => (
  <View style={styles.postHeader}>
    <View style={styles.userInfo}>
      <Image source={{ uri: post.userImage }} style={styles.userImage} />
      <View style={styles.userInfoText}>
        <Text style={[styles.userName, { color: 'white' }]}>{post.userName}</Text>
        <Ionicons name="storefront-outline" size={20} color="green" style={styles.userCategoryIcon} />
        <TouchableOpacity style={[styles.followButton, { borderColor: '#04BF55', backgroundColor: 'transparent', borderWidth: 1 }]}>
          <Text style={[styles.followButtonText, { color: 'white' }]}>Seguir</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfoText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
  },
  userCategoryIcon: {
    marginLeft: 5,
  },
});

export default PostHeader;
