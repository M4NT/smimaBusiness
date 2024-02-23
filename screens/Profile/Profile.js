import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
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
            <ScrollView>
                <View style={styles.photoGrid}>
                    {/* Aqui você pode adicionar várias fotos para simular a rolagem */}
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }}
                        style={styles.photo}
                    />
                    {/* Adicione mais imagens conforme necessário */}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
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
});

export default ProfileScreen;
