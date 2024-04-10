import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux_store/actions/userRegAction';
import axios from 'axios';

const RegistrationScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [student, setStudent] = useState(false);
    const [age, setAge] = useState('');
    const [favoriteTeam, setFavoriteTeam] = useState('');
    const [favoritePlayer, setFavoritePlayer] = useState('');

    const handleRegister = async () => {
        try {
            console.log('Sending registration request...');
            const requestData = {
                username,
                password,
                email,
                student,
                age,
                favoriteTeam,
                favoritePlayer,
            };
            console.log('Request Data:', requestData);
            dispatch(registerUser(requestData));
            const response = await axios.post('http://192.168.2.28:8000/auth/register', requestData); //use local ip address
            console.log('Registration response:', response.data);

            if (response.status === 201) {
                Alert.alert('Success', 'User registered successfully');
                navigation.navigate('Home')
            } else {
                Alert.alert('Error', 'Failed to register user');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while registering user');
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Enter Username"
            />

            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter Password"
                secureTextEntry={true}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter Email"
                keyboardType="email-address"
            />

            <CheckBox
                title='Are you a student?'
                checked={student}
                onPress={() => setStudent(!student)}
            />

            <Text style={styles.label}>Enter Age:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAge}
                value={age}
                placeholder="Enter Age"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Enter Favorite Team:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFavoriteTeam}
                value={favoriteTeam}
                placeholder="Enter Favorite Team"
            />

            <Text style={styles.label}>Enter Favorite Player:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFavoritePlayer}
                value={favoritePlayer}
                placeholder="Enter Favorite Player"
            />

            <Button title="Register" onPress={handleRegister} />
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
});

export default RegistrationScreen;
