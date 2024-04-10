
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'; 
import { useDispatch } from 'react-redux'; 
import { fetchGamesRequest, fetchGamesSuccess, fetchGamesFailure } from '../redux_store/actions/gamesAction';

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
            {/* <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search games"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View> */}
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
                <Text>Welcome to the NBA Score App</Text>
            </View>
        </View>
    );
};
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
//         let allMatchingGames = [];
//         try {
//             // If the query isn't empty, we'll assume the user is searching for a team or player
//             if (query.trim() !== '') {
//                 // Perform an API call to search for teams
//                 const teamsResponse = await axios.get(`https://www.balldontlie.io/api/v1/teams`, {
//                     params: { search: query },
//                 });
//                 const teams = teamsResponse.data.data;
    
//                 // Perform an API call to search for players
//                 const playersResponse = await axios.get(`https://www.balldontlie.io/api/v1/players`, {
//                     params: { search: query },
//                 });
//                 const players = playersResponse.data.data;
    
//                 // Fetch games based on team IDs
//                 for (const team of teams) {
//                     const teamGamesResponse = await axios.get(`https://www.balldontlie.io/api/v1/games`, {
//                         params: { team_ids: [team.id] },
//                     });
//                     allMatchingGames = allMatchingGames.concat(teamGamesResponse.data.data);
//                 }
    
//                 // Fetch games based on player IDs
//                 for (const player of players) {
//                     const playerGamesResponse = await axios.get(`https://www.balldontlie.io/api/v1/games`, {
//                         params: { player_ids: [player.id] },
//                     });
//                     allMatchingGames = allMatchingGames.concat(playerGamesResponse.data.data);
//                 }
                
//                 // You may need to filter out duplicate games if a player and their team are both returned from the search
    
//                 // Update the state and Redux store with the fetched games
//                 dispatch(fetchGamesSuccess(allMatchingGames));
//                 setGamesData(allMatchingGames);
//             }
//         } catch (error) {
//             console.error('API error:', error);
//             dispatch(fetchGamesFailure(error.message));
//             setGamesData([]);
//         } finally {
//             setLoading(false);
//         }
//     };
    

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