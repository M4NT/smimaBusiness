import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import Bell from '../../assets/icons/bell.svg';
import HandWaving from '../../assets/icons/hand-waving.svg';
import LupaZoom from '../../assets/icons/lupa-zoom.svg';
import Messages from '../../assets/icons/messages.svg';
import Filter from '../../assets/icons/filter.svg';
import CoffeeCup from '../../assets/icons/icon-coffe.svg';
import Zzz from '../../assets/icons/sleep-icon.svg';

const HeaderComponent = () => {
    const userProfileImage = 'https://via.placeholder.com/150';
    const userName = 'Usuário';

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 12) {
            return {
                greeting: 'Bom dia',
                icon: HandWaving,
            };
        } else if (currentHour >= 12 && currentHour < 18) {
            return {
                greeting: 'Boa tarde',
                icon: CoffeeCup,
            };
        } else {
            return {
                greeting: 'Boa noite',
                icon: Zzz,
            };
        }
    };

    const { greeting, icon: GreetingIcon } = getGreeting();

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.userInfoContainer}>
                    <Image source={{ uri: userProfileImage }} style={styles.userImage} />
                    <View style={styles.userInfo}>
                        <View style={styles.greetingContainer}>
                            <Text style={styles.greetingText}>{greeting}</Text>
                            <GreetingIcon width={24} height={24} marginLeft={5} />
                        </View>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>{userName}</Text>
                            <ArrowDown width={16} height={16} style={styles.arrowDown} />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Bell width={35} height={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Messages width={35} height={35} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchContainer}>
                <LupaZoom width={20} height={20} style={styles.searchIcon} />
                <TextInput placeholder="Pesquisar por ..." style={styles.searchInput} />
                <Filter width={20} height={20} style={styles.filterIcon} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 70,
        height: 70,
        borderRadius: 70,
        marginRight: 15,
    },
    userInfo: {
        flexDirection: 'column',
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greetingText: {
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 0,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'normal',
        marginTop: 5,
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowDown: {
        marginLeft: 5,
        marginTop: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingLeft: 50, // Adicionei isso para criar um espaço para a lupa
        paddingRight: 50, // Adicionei isso para criar um espaço para o botão de filtro
    },
    searchIcon: {
        position: 'absolute', // Adicionei isso para posicionar a lupa dentro do input
        left: 15, // Adicionei isso para posicionar a lupa no lado esquerdo do input
    },
    filterIcon: {
        position: 'absolute', // Adicionei isso para posicionar o botão de filtro dentro do input
        right: 15, // Adicionei isso para posicionar o botão de filtro no lado direito do input
    },
    iconButton: {
        marginHorizontal: 5,
    },
});

export default HeaderComponent;
