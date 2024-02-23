import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';

const StoryComponent = () => {
    // Array de URLs de imagens de exemplo para os storys
    const storyImages = [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        // Adicione mais URLs de imagens conforme necessário
    ];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                {storyImages.map((image, index) => (
                    <View key={index} style={styles.storyContainer}>
                        <Image source={{ uri: image }} style={styles.storyImage} />
                        <Text style={styles.storyText}>Assunto {index + 1}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    storyContainer: {
        alignItems: 'center',
        marginRight: 20,
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
});

export default StoryComponent;
