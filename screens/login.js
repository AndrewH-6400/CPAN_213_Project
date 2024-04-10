const { useState } = require("react");
const { Alert, View, TextInput, TouchableOpacity, StyleSheet, Text } = require("react-native");
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux_store/actions/userRegAction';




const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    dispatch = useDispatch();

    const handleLogin = async () => {        
        try {
            const response = await axios.post('http://192.168.2.16:8000/auth/login', {
                username,
                password    
            });
    
            // Check if response status is 200
            if (response.status === 200) {
                // Assuming response.data.user is present
                console.log('Login Successful' + JSON.stringify(response.data.user.username));
                dispatch(logIn(response.data.user));
                //create a notification for the user to see login was successful
                Alert.alert('Login Successful');
                navigation.navigate('Home');
            } else {
                // Handle unexpected response status
                console.error('Unexpected response:', response);
                Alert.alert('Login Failed', 'Unexpected response from the server');
            }
        } catch (error) {
            // Handle request or response errors
            console.error('Login failed: ', error.response ? error.response.data.error : error.message);
            Alert.alert('Login Failed', error.response ? error.response.data.error : error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username} 
            />

            <TextInput 
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>    

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginScreen;
