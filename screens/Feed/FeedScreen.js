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
  const [modalVisible, setModalVisible] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
      <View style={styles.postHeader}>
        <Image source={{ uri: post.userImage }} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.userName}</Text>
          <View style={styles.userInfoRight}>
            <View style={styles.categoryAndSeller}>
              {post.isSeller && <Ionicons name="storefront-outline" size={20} color="green" />}
              {post.isVerified && <Ionicons name="checkmark-circle" size={20} color="blue" />}
              <Text style={styles.userCategory}>{post.userCategory}</Text>
            </View>
            <Text style={styles.userCity}>{post.userCity}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.actionButton}>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalTopBar}>
            {/* Aqui você pode adicionar qualquer conteúdo desejado para a barra superior */}
          </View>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.modalOption}>
              <Ionicons name="bookmark-outline" size={24} color="black" />
              <Text style={styles.modalOptionText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.modalOption}>
              <Ionicons name="share-social-outline" size={24} color="black" />
              <Text style={styles.modalOptionText}>Compartilhar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.modalOption}>
              <MaterialIcons name="favorite-border" size={24} color="black" />
              <Text style={styles.modalOptionText}>Adicionar aos Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.modalOption}>
              <Ionicons name="person-remove-outline" size={24} color="black" />
              <Text style={styles.modalOptionText}>Deixar de Seguir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.modalOption}>
              <Ionicons name="eye-off-outline" size={24} color="black" />
              <Text style={styles.modalOptionText}>Ocultar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.modalOption}>
              <MaterialIcons name="report" size={24} color="black" />
              <Text style={styles.modalOptionText}>Denunciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image source={{ uri: post.postImage }} style={styles.postImage} />
      <View style={{ height: 5 }} />
      {post.products && post.products.length > 0 && (
        <ProductContainer products={post.products} />
      )}
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
          <Text style={styles.likeCount}>{post.likeCount} curtidas</Text>
        </View>
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]}>
          <Ionicons name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
  const data = [
    {
      id: 1,
      userImage: 'https://via.placeholder.com/150',
      userName: 'Nome do Usuário',
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
    {
      id: 2,
      userImage: 'https://via.placeholder.com/150',
      userName: 'Nome do Usuário',
      userCategory: 'Categoria do Usuário',
      userCity: 'Cidade do Usuário',
      postImage: 'https://via.placeholder.com/150',
      likeCount: 32,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isVerified: true,
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

const ProfileModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalSize = () => {
    setModalVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topBar} onPress={toggleModalSize}>
        {/* Ícone ou indicador visual para mostrar que pode ser pressionado */}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <View style={styles.dragBar}></View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToLogin}>
              <View style={styles.modalOption}>
                <Ionicons name="key-outline" size={24} color="black" />
                <Text style={styles.modalText}>Senha</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSignup}>
              <View style={styles.modalOption}>
                <Ionicons name="person-add-outline" size={24} color="black" />
                <Text style={styles.modalText}>Registro</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToForgotPassword}>
              <View style={styles.modalOption}>
                <Ionicons name="lock-closed-outline" size={24} color="black" />
                <Text style={styles.modalText}>Esqueceu a senha?</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  dragBar: {
    width: 40,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginLeft: 10,
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
  userCity: {
    fontSize: 14,
    color: 'gray',
  },
  categoryAndSeller: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCategory: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  userCity: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FeedScreen;
