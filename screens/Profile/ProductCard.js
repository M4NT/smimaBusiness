// ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <Text style={styles.productDiscount}>{product.discount}</Text>
            <Text style={styles.productShipping}>{product.shipping}</Text>
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Comprar agora</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        width: '45%', // Adjust as needed
        alignItems: 'center',
    },
    productImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    productName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        marginBottom: 5,
    },
    productDiscount: {
        color: 'red',
        marginBottom: 5,
    },
    productShipping: {
        marginBottom: 5,
    },
    buyButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProductCard;
