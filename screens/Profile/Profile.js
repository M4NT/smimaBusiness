import React, { useState, useCallback } from 'react'; // Importe useCallback corretamente
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import ProductCard from './ProductCard'; // Ajuste o caminho conforme necessário
import StoryComponent from '../../components/StoryComponent'; // Ajuste o caminho conforme necessário

const ProfileScreen = () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation(); // Obtenha a instância de navegação

    // Limpa o estado do modal ao focar na tela
    useFocusEffect(
        useCallback(() => {
            setModalVisible(false);
            return () => {
                // Cleanup function
            };
        }, [])
    );

    // Exemplo de dados de produtos (pode vir de uma API, por exemplo)
    const products = [
        {
            id: 1,
            name: 'Produto 1',
            image: 'https://via.placeholder.com/150',
            price: 'R$ 10,00',
            discount: '10% OFF',
            shipping: 'Frete grátis',
        },
        {
            id: 2,
            name: 'Produto 2',
            image: 'https://via.placeholder.com/150',
            price: 'R$ 20,00',
            discount: '20% OFF',
            shipping: 'Frete grátis',
        },
    ];

    const renderContent = () => {
        if (activeTab === 'posts') {
            return (
                <ScrollView>
                    <View style={styles.photoGrid}>
                        {/* Aqui você pode adicionar as publicações */}
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.photo}
                        />
                        {/* Adicione mais imagens conforme necessário */}
                    </View>
                </ScrollView>
            );
        } else if (activeTab === 'products') {
            return (
                <ScrollView>
                    <View style={styles.productGrid}>
                        {/* Renderize os cards de produtos */}
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </View>
                </ScrollView>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="person-circle-outline" size={120} color="black" />
                <Text style={styles.username}>SeuNomeDeUsuário</Text>
                <Text style={styles.bio}>Descrição do perfil aqui...</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>100</Text>
                    <Text style={styles.statsText}>Posts</Text>
                </View>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>1000</Text>
                    <Text style={styles.statsText}>Seguidores</Text>
                </View>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>500</Text>
                    <Text style={styles.statsText}>Seguindo</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Seguir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Mensagem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Adicionar Contato</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="menu-outline" size={24} color="black" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <View style={styles.dragBar}></View>
                                {/* Atualize as funções onPress para navegar entre as telas */}
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <View style={styles.modalOption}>
                                        <Ionicons name="key-outline" size={24} color="black" />
                                        <Text style={styles.modalText}>Senha</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                    <View style={styles.modalOption}>
                                        <Ionicons name="person-add-outline" size={24} color="black" />
                                        <Text style={styles.modalText}>Registro</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                    <View style={styles.modalOption}>
                                        <Ionicons name="lock-closed-outline" size={24} color="black" />
                                        <Text style={styles.modalText}>Esqueceu a senha?</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.storySection}>
                <StoryComponent />
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'posts' && styles.activeTabButton]}
                    onPress={() => setActiveTab('posts')}
                >
                    <Ionicons name="images-outline" size={24} color="black" />
                    <Text style={styles.tabButtonText}>Publicações</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'products' && styles.activeTabButton]}
                    onPress={() => setActiveTab('products')}
                >
                    <Ionicons name="pricetag-outline" size={24} color="black" />
                    <Text style={styles.tabButtonText}>Produtos</Text>
                </TouchableOpacity>
            </View>
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    bio: {
        marginTop: 5,
        color: 'gray',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        width: '100%',
    },
    statsItem: {
        alignItems: 'center',
    },
    statsNumber: {
        fontWeight: 'bold',
    },
    statsText: {
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    tabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderColor: 'blue',
    },
    tabButtonText: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 5,
    },
    photo: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 5,
    },
    menuButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingTop: 40,
        maxHeight: '60%',
    },
    dragBar: {
        width: 40,
        height: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 20,
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
});

export default ProfileScreen;
