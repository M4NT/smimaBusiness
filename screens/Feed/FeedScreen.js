import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import ProductContainer from '../../components/ProductContainer';

const StoryComponent = () => {
  const storyImages = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  return (
    <View style={styles.storyContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.storyItem} onPress={() => console.log('Criar novo story')}>
          <View style={[styles.storyImage, { backgroundColor: 'lightgrey', justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="add" size={32} color="white" />
          </View>
          <Text style={styles.storyText}>Criar</Text>
        </TouchableOpacity>
        {storyImages.map((image, index) => (
          <TouchableOpacity key={index} style={styles.storyItem} onPress={() => console.log(`Abrir story ${index}`)}>
            <Image source={{ uri: image }} style={styles.storyImage} />
            <Text style={styles.storyText}>Assunto {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Componente de Post
const Post = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const formatDescription = () => {
    const maxCharactersFirstLine = 50;
    const maxCharactersSecondLine = 45;
    const maxCharacters = 95;
    const maxLines = 2;
    const lines = post.description.split('\n');
    let shortenedDescription = '';

    for (let line of lines) {
      if (shortenedDescription.length + line.length > maxCharactersFirstLine) {
        shortenedDescription += '\n' + line.substring(0, maxCharactersSecondLine);
        break;
      }
      shortenedDescription += line + '\n';
    }

    if (!expanded && post.description.length > maxCharactersFirstLine) {
      return (
        <Text>
          {shortenedDescription.trim()}
          <Text style={styles.moreLink} onPress={toggleExpansion}> ...</Text>
        </Text>
      );
    } else {
      return (
        <Text>
          {post.description}
          {expanded && <Text style={styles.moreLink} onPress={toggleExpansion}> Ver menos</Text>}
        </Text>
      );
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.postImage }} style={styles.postImage} />
        <View style={styles.overlayContentContainer}>
          {/* Informações do usuário */}
          <View style={styles.userInfo}>
            <Image source={{ uri: post.userImage }} style={styles.userImage} />
            <View style={styles.userInfoText}>
              <Text style={[styles.userName, { color: 'white' }]}>{post.userName}</Text>
              <Ionicons name="storefront-outline" size={20} color="green" style={styles.userCategoryIcon} />
              <TouchableOpacity style={[styles.followButton, { borderColor: '#04BF55', backgroundColor: 'transparent', borderWidth: 1 }]}>
                <Text style={[styles.followButtonText, { color: 'white' }]}>Seguir</Text>
              </TouchableOpacity>
            </View>
            <Ionicons name="storefront-outline" size={20} color="green" style={styles.userCategoryIcon} />
          </View>

          {/* Descrição da foto */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{formatDescription()}</Text>
          </View>
        </View>
        <View style={styles.overlayButtonsContainer}>
          <TouchableOpacity style={styles.overlayButton}>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayButton}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayButton}>
            <Ionicons name="bookmark-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {post.products && post.products.length > 0 && (
        <ProductContainer products={post.products} />
      )}
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          {/* Botões restantes mantidos aqui */}
        </View>
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]}>
          <Ionicons name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.postDescription}>
        {/* Descrição do post mantida aqui */}
      </View>
    </View>
  );
};

const FeedScreen = () => {
  const data = [
    {
      id: 2,
      postImage: 'https://via.placeholder.com/150',
      userImage: 'https://via.placeholder.com/150',
      userName: 'smima',
      userCategory: 'Categoria do Usuário',
      userCity: 'Cidade do Usuário',
      likeCount: 32,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isVerified: true,
    },
    {
      id: 1,
      userImage: 'https://via.placeholder.com/150',
      userName: 'smima',
      userCategory: 'Categoria do Usuário',
      userCity: 'Cidade do Usuário',
      postImage: 'https://via.placeholder.com/150',
      likeCount: 47,
      description: 'Descrição da postagem...',
      isSeller: true,
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
      ],
    },
  ];

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  userFollow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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
  userCity: {
    fontSize: 14,
    color: 'gray',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  actionButton: {
    marginRight: 10,
  },
  saveButton: {
    marginLeft: 'auto',
  },
  descriptionContainer: {
    marginBottom: 5,
  },
  descriptionText: {},
  moreLink: {
    color: 'blue',
    marginLeft: 5,
  },
  storyContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
  },
  categoryAndSeller: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlayButtonsContainer: {
    position: 'absolute',
    top: '43%', // Ajuste aqui para posicionar os botões mais acima ou abaixo
    right: 5, // Ajuste a distância da direita conforme necessário
  },
  overlayButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  overlayContentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default FeedScreen;
