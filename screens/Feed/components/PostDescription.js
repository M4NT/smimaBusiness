// PostDescription.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ExpandableText = ({ text, maxCharactersFirstLine, maxCharactersSecondLine }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const formatDescription = () => {
    // Implementação da formatação do texto aqui
  };

  return (
    <Text style={styles.descriptionText}>{formatDescription()}</Text>
  );
};

const PostDescription = ({ post }) => (
  <View style={styles.descriptionContainer}>
    <ExpandableText
      text={post.description}
      maxCharactersFirstLine={50}
      maxCharactersSecondLine={45}
    />
  </View>
);

const styles = StyleSheet.create({
  descriptionContainer: {
    marginBottom: 5,
  },
  descriptionText: {},
  moreLink: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default PostDescription;
