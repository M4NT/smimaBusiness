import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductContainer from '../../components/ProductContainer';

// Componente de Story
const StoryComponent = () => {
  // Array de URLs de imagens de exemplo para os stories
  const storyImages = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    // Adicione mais URLs de imagens conforme necessário
  ];

  return (
    <View style={styles.storyContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {storyImages.map((image, index) => (
          <View key={index} style={styles.storyItem}>
            <Image source={{ uri: image }} style={styles.storyImage} />
            <Text style={styles.storyText}>Assunto {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Componente de Post
// Dentro do componente Post
const Post = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const formatDescription = () => {
    if (expanded) {
      return post.description;
    } else {
      const maxCharacters = 95;
      const maxLines = 2;
      const lines = post.description.split('\n');

      if (lines.length > maxLines || post.description.length > maxCharacters) {
        return `${lines.slice(0, maxLines).join('\n').slice(0, maxCharacters)}`;
      } else {
        return post.description;
      }
    }
  };

  return (
    <View style={styles.postContainer}>
      {/* Cabeçalho da postagem */}
      <View style={styles.postHeader}>
        <Image source={{ uri: post.userImage }} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.userCategory}>{post.userCategory}</Text>
        </View>
      </View>
      {/* Corpo da postagem */}
      <Image source={{ uri: post.postImage }} style={styles.postImage} />

      {/* Espaçamento entre a imagem da publicação e o ProductContainer */}
      <View style={{ height: 5 }} />

      {/* Exibir o ProductContainer somente se houver produtos */}
      {post.products && post.products.length > 0 && (
        <ProductContainer products={post.products} />
      )}

      {/* Ações da postagem */}
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]}>
          <Ionicons name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Contagem de curtidas */}
      <Text style={styles.likeCount}>{post.likeCount} curtidas</Text>

      {/* Descrição da postagem */}
      <View style={styles.postDescription}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text numberOfLines={expanded ? 0 : 2} ellipsizeMode="tail" style={styles.descriptionText}>
            {formatDescription()}
            {post.description.length > 95 && (
              <Text onPress={toggleExpansion} style={styles.moreLink}>{expanded ? ' Ver menos' : '... Ver mais'}</Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

const FeedScreen = () => {
  // Dados de exemplo para o feed
  const data = [
    {
      id: 1,
      userImage: 'https://via.placeholder.com/150', // Link fictício para a foto de perfil do usuário
      userName: 'Nome do Usuário',
      userCategory: 'Categoria do Usuário',
      postImage: 'https://via.placeholder.com/150', // Link fictício para a foto da postagem
      likeCount: 47,
      description: 'Descrição da postagem...',
      // Adicione um array de produtos abaixo
      products: [
        {
          id: 1,
          name: 'Produto 1',
          price: 'R$ 10,00',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Produto 2',
          price: 'R$ 15,00',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          name: 'Produto 3',
          price: 'R$ 20,00',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 4,
          name: 'Produto 4',
          price: 'R$ 20,00',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 5,
          name: 'Produto 5',
          price: 'R$ 20,00',
          image: 'https://via.placeholder.com/150',
        },
        // Adicione mais produtos conforme necessário
      ],
    },
    {
      id: 2,
      userImage: 'https://via.placeholder.com/150', // Link fictício para a foto de perfil do usuário
      userName: 'Nome do Usuário',
      userCategory: 'Categoria do Usuário',
      postImage: 'https://via.placeholder.com/150', // Link fictício para a foto da postagem
      likeCount: 32,
      description: 'Descrição da postagem...',
    },
    // Adicione mais dados conforme necessário
  ];

  return (
    <ScrollView>
      <StoryComponent />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Post post={item} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10, // Adicionei marginBottom aqui para separar os itens de história
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35, // Deixa a imagem circular
    marginBottom: 5,
  },
  storyText: {
    textAlign: 'center',
    marginTop: 5, // Espaçamento entre a imagem e o texto
  },
  postContainer: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
    padding: 10,
  },
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
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userCategory: {
    fontSize: 14,
    color: 'gray',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1, // Mantém a proporção da imagem
    marginBottom: 10,
    borderRadius: 10, // Adicione essa propriedade para arredondar as bordas
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  leftActions: {
    flexDirection: 'row',
    flex: 1,
  },
  actionButton: {
    marginRight: 10,
  },
  saveButton: {
    marginLeft: 'auto',
  },
  likeCount: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    flex: 1,
  },
  moreLink: {
    color: 'blue',
    marginLeft: 5,
  },
  modalLinkText: {
    color: 'blue',
  },
  storyContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  productImage: {
    width: 300, // Aumentando o tamanho em 50%
    height: 300, // Aumentando o tamanho em 50%
    borderRadius: 10,
  },
});

export default FeedScreen;
