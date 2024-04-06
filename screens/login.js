const { useState } = require("react");
const { Alert, View, TextInput, TouchableOpacity, StyleSheet, Text } = require("react-native");
import axios from 'axios';



const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.2.16:8000/auth/login', {
            username,
            password    
        });
        console.log('Login Successful')
        //create a notifcation for user to see login was successful
        Alert.alert('Login Successful')
        } catch (error) {
            console.error('Login failed: ', error.response.data.error)  //error at this data
            Alert.alert('Login Failed', error.response.data.error) //this exstracts the error from my login function in my backend
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
