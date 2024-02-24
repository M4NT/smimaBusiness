import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ProductContainer = ({ products }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                {products.map(product => (
                    <View key={product.id} style={styles.productItem}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>{product.price}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 0,
      marginBottom: 10, // Adicionando espaçamento abaixo do container
      alignItems: 'center', // Alinhando os itens ao centro verticalmente
    },
    productItem: {
      marginLeft: -10, // Adicionando espaçamento entre os produtos
      paddingHorizontal: 12.5, // Adicionando espaçamento nas laterais dos produtos
      alignItems: 'center',
    },
    productImage: {
      width: 112.5, // Tamanho original reduzido em 25%
      height: 112.5, // Tamanho original reduzido em 25%
      borderRadius: 10,
    },
    productName: {
      marginTop: 5,
      fontWeight: 'bold',
    },
    productPrice: {
      color: 'gray',
    },
  });  

export default ProductContainer;
