import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

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
                <View style={styles.modalContainer}>
                    {/* Conteúdo do modal */}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro
    },
    topBar: {
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Barra transparente
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
});

export default ProfileModal;
