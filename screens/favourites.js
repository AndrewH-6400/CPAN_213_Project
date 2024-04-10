// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
// import Feed from "../components/feed";
// import Headbar from "../components/header";
// import axios from "axios"; 

// const Home = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [gamesData, setGamesData] = useState([]); // This will store the games data fetched from the API
//     const [loading, setLoading] = useState(false);

//     const fetchGamesData = async (query) => {
//         if (query.length > 0) {
//             setLoading(true);
//             try {
//                 axios.get('https://api.balldontlie.io/v1/games?seasons[]=2023&seasons[]=2024',{
            
//                 headers: {
//                     Authorization: '87bdef63-ca65-4043-b674-932fe6c60bb3' //Bearer is a type of access toekn for authentication
//                 }
//                 const text = await response.text();  // Get the raw text of the response

//                 console.log('Response Status:', response.status);  // Log the response status
//                 console.log('Response Text:', text);  // Log the raw text of the response

//                 // Check for successful response (status code 200) before parsing
//                 if (response.ok) {
//                     const json = JSON.parse(text);
//                     setGamesData(json.data);
//                 } else {
//                     // Handle non-2xx responses here
//                     console.error('Non-OK HTTP status:', response.status);
//                     setGamesData([]);
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setGamesData([]);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             fetchGamesData(searchQuery);
//         }, 500); // Delay the API call by 500ms to throttle requests

//         return () => clearTimeout(delayDebounceFn);
//     }, [searchQuery]);

//     return (
//         <View style={styles.container}>
//             <View style={styles.searchContainer}>
//                 <TextInput
//                     style={styles.searchBar}
//                     placeholder="Search games"
//                     value={searchQuery}
//                     onChangeText={setSearchQuery}
//                 />
//             </View>
//             {loading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <Feed data={gamesData} /> // Pass the fetched games data to the Feed component
//             )}
//             <View style={styles.footer}>
//                 <Text>Welcome to the NBA Score App</Text>
//             </View>
//         </View>
//     );
// };

// export default Home;


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     searchContainer: {
//         width: '100%',
//         backgroundColor: 'orange', 
//         padding: 10, 
//     },
//     searchBar: {
//         height: 40,
//         backgroundColor: '#fff', 
//         paddingHorizontal: 15,
//         borderRadius: 20, 
//         fontSize: 16,
//     },
//     feedContainer: {
//         flex: 1,
//         width: '100%',
//     },
//     footer: {
//         width: '100%',
//         height: 60, 
//         backgroundColor: 'orange',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'; 
import { useDispatch } from 'react-redux'; 
import { fetchGamesRequest, fetchGamesSuccess, fetchGamesFailure } from '../redux_store/actions/gamesAction';
import Feed from "../components/feed";
import Headbar from "../components/header";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [gamesData, setGamesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchGamesData = async (query) => {
        setLoading(true);
        console.log('User Query:', query);
        try {
            // Use backticks for template literal and await to wait for the axios call
            const response = await axios.get(`https://www.balldontlie.io/api/v1/games?search=${query}`, {
                headers: {
                    Authorization: '87bdef63-ca65-4043-b674-932fe6c60bb3'
                }
            });
    
            // console.log('Response Status:', response.status);
            // console.log('Response Data:', response.data);
    
            if (response.status === 200) {
                dispatch(fetchGamesSuccess(response.data.data));
                setGamesData(response.data.data);
            } else {
                // console.error('Non-OK HTTP status:', response.status);
                dispatch(fetchGamesFailure('Failed to fetch'));
                setGamesData([]);
            }
        } catch (error) {
            // console.error('API error:', error);
            dispatch(fetchGamesFailure(error.message));
            setGamesData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(fetchGamesRequest());
        fetchGamesData('');
    }, [dispatch]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchGamesData(searchQuery);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search games"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                // Conditional rendering based on whether there are search results or not
                searchQuery.length > 0 ? (
                    <Feed data={gamesData} />
                ) : (
                    <Feed />
                )
            )}
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
        width: '100%',
        backgroundColor: 'orange',
        padding: 10,
    },
    searchBar: {
        height: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        borderRadius: 20,
        fontSize: 16,
    },
    feedContainer: {
        flex: 1,
        width: '100%',
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