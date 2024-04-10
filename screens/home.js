
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios'; 
// import { useDispatch } from 'react-redux'; 
// import { fetchGamesRequest, fetchGamesSuccess, fetchGamesFailure } from '../redux_store/actions/gamesAction';
// import Feed from "../components/feed";
// import Headbar from "../components/header";

// const Home = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [gamesData, setGamesData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();

//     const fetchGamesData = async (query) => {
//         setLoading(true);
//         console.log('User Query:', query);
//         try {
//             // Use backticks for template literal and await to wait for the axios call
//             const response = await axios.get(`https://www.balldontlie.io/api/v1/games?search=${query}`, {
//                 headers: {
//                     Authorization: '87bdef63-ca65-4043-b674-932fe6c60bb3'
//                 }
//             });
    
//             // console.log('Response Status:', response.status);
//             // console.log('Response Data:', response.data);
    
//             if (response.status === 200) {
//                 dispatch(fetchGamesSuccess(response.data.data));
//                 setGamesData(response.data.data);
//             } else {
//                 // console.error('Non-OK HTTP status:', response.status);
//                 dispatch(fetchGamesFailure('Failed to fetch'));
//                 setGamesData([]);
//             }
//         } catch (error) {
//             // console.error('API error:', error);
//             dispatch(fetchGamesFailure(error.message));
//             setGamesData([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         dispatch(fetchGamesRequest());
//         fetchGamesData('');
//     }, [dispatch]);

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             fetchGamesData(searchQuery);
//         }, 500);

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
//                 // Conditional rendering based on whether there are search results or not
//                 searchQuery.length > 0 ? (
//                     <Feed data={gamesData} />
//                 ) : (
//                     <Feed />
//                 )
//             )}
//             <View style={styles.footer}>
//                 <Text>Welcome to the NBA Score App</Text>
//             </View>
//         </View>
//     );
// };

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

// export default Home;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo, otherwise adjust the import path
import Feed from "../components/feed";
import { fetchGamesSuccess, fetchGamesFailure } from '../redux_store/actions/gamesAction';
import axios from 'axios';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [allTeams, setAllTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Function to fetch all teams with Authorization headers
    const fetchAllTeams = async () => {
        setLoading(true);
        const headers = {
            Authorization: '87bdef63-ca65-4043-b674-932fe6c60bb3'
        };
        try {
            const response = await axios.get('https://api.balldontlie.io/v1/teams', { headers });
            console.log('Api response: ', response.data)
            setAllTeams(response.data.data);
            setFilteredTeams(response.data.data);
        } catch (error) {
            console.error('API error:', error);
            dispatch(fetchGamesFailure(error.message));
        } finally {
            setLoading(false);
        }
    };

    // Function to filter teams based on the search query
    const filterTeams = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = allTeams.filter(team => {
            return team.full_name.toLowerCase().includes(lowercasedQuery) ||
                   team.city.toLowerCase().includes(lowercasedQuery) ||
                   team.abbreviation.toLowerCase().includes(lowercasedQuery);
        });
        console.log("filtered query: ", filtered)
        setFilteredTeams(filtered);
    };

    useEffect(() => {
        fetchAllTeams();
    }, []);

    useEffect(() => {
        filterTeams(searchQuery);
    }, [searchQuery]);

    const handleSearch = () => {
        filterTeams(searchQuery);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : searchQuery.length > 0 ? (
                <View>
                    {filteredTeams.map(team => (
                        <View key={team.id}>
                            <Text>{team.full_name}</Text>
                            <Text>{team.city}</Text>
                            {/* Render other team details as needed */}
                        </View>
                    ))}
                </View>
            ) : (
                <Feed />
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
