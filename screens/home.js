

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo, otherwise adjust the import path
import Feed from "../components/feed";
import { fetchGamesSuccess, fetchGamesFailure } from '../redux_store/actions/gamesAction';
import axios from 'axios';

const Home = () => {
  
    return (
        <View style={styles.container}>
            
                <Feed />
            <View style={styles.footer}>
                <Text>Welcome to the NBA Score App</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    searchBar: {
        height: 40,
        width: '70%',
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 20,
    },
    footer: {
        width: '100%',
        height: 60,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;
