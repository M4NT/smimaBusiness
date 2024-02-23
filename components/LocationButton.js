import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LocationButton = () => {
    return (
        <TouchableOpacity style={styles.locationButton}>
            <MaterialIcons name="location-on" size={24} color="white" />
            <Text style={styles.distanceText}>1.2km</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    locationButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    distanceText: {
        marginLeft: 5,
        color: 'white',
    },
});

export default LocationButton;
