import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
// import { fetchGamesRequest, fetchGamesSuccess, fetchGamesFailure } from '../redux_store/actions/gamesAction';
import axios from 'axios'; // Import axios for making HTTP requests
import ProgressCircle from 'react-native-progress/Circle'; // Import ProgressCircle
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import DenverNuggetsLogo from '../assets/Denver Nuggets.png';
import LosAngelesLakersLogo from '../assets/Los Angeles Lakers.png'
import GoldenStateWarriorsLogo from '../assets/Golden State Warriors.png';
import PhoenixSunsLogo from '../assets/Phoenix Suns.png';
import AtlantaHawksLogo from '../assets/Atlanta Hawks.png';
import CharlotteHornetsLogo from '../assets/Charlotte Hornets.png';
import IndianaPacersLogo from '../assets/Indiana Pacers.png';
import NewYorkKnicksLogo from '../assets/New York Knicks.png';
import OrlandoMagicLogo from '../assets/Orlando Magic.png';
import BrooklynNetsLogo from '../assets/Brooklyn Nets .png';
import MiamiHeatLogo from '../assets/Miami Heat.png';
import TorontoRaptorsLogo from '../assets/Toronto Raptors.png';
import ChicagoBullsLogo from '../assets/Chicago Bulls.png';
import MemphisGrizzliesLogo from '../assets/Memphis Grizzlies.png';
import UtahJazzLogo from '../assets/Utah Jazz.png';
import SanAntonioSpursLogo from '../assets/San Antonio Spurs.png';
import LAclippersLogo from '../assets/LA Clippers.png';
import MilwaukeeBucksLogo from '../assets/Milwaukee Bucks.png';
import Philadelphia76ersLogo from '../assets/Philadelphia 76ers.png';
import DallasMavericksLogo from '../assets/Dallas Mavericks.png';
import ClevelandCavaliersLogo from '../assets/Cleveland Cavaliers.png';
import OklahomaCityThunderLogo from '../assets/Oklahoma City Thunder.png';
import NewOrleansPelicansLogo from '../assets/New Orleans Pelicans.png';
import SacramentoKingsLogo from '../assets/Sacramento Kings.png';
import HoustonRocketsLogo from '../assets/Houston Rockets.png';
import WashingtonWizardsLogo from '../assets/Washington Wizards.png';
import BostonCelticsLogo from '../assets/Boston Celtics.png';
import DetroitPistonsLogo from '../assets/Detroit Pistons.png';
import MinnesotaTimberwolvesLogo from '../assets/Minnesota Timberwolves.png';
import PortlandTrailBlazers from '../assets/Portland Trail Blazers.png'




const GameDetailsScreen = ({ route }) => { 
    const { gameId } = route.params; // Extracting gameId from route params
    // const dispatch = useDispatch();
    const { games, loading } = useSelector(state => state.games); // Accessing game details state from Redux store and deconstructing it
    // console.log('Redux state:', useSelector(state => state));
    const gameDetails = games.find(game => game.id === gameId);

    const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
    const [visitorTeamPlayers, setVisitorTeamPlayers] = useState([]);
    const navigation = useNavigation();
    //fetch stats when component mounts
    useEffect(() => {
        // console.log("Game Details:", gameDetails);
        // console.log("Game ID:", gameId);
        const fetchGameStats = async () => {
            try {
                const headers = {
                    Authorization: '87bdef63-ca65-4043-b674-932fe6c60bb3' 
                };

                const gameStatsResponse = await axios.get(`https://api.balldontlie.io/v1/stats?game_ids[]=${gameId}&per_page=35`, { headers });
                const playerStats = gameStatsResponse.data.data;

                // console.log(gameDetails.home_team.id);
                // console.log(gameDetails.visitor_team.id);
                // console.log(playerStats)
                 // Accessing the data property of gameStatsResponse
                

               
 
                //  const statVisitorTeamId = playerStats.team.visitor_team_id;
                //  const statHomeTeamId = playerStats.team.home_team_id;
 
               
                //  console.log(statVisitorTeamId);
                //  console.log(statHomeTeamId);
 

                // Filter player stats based on home team and visitor team
                const homeTeamStats = playerStats.filter(stats => stats.team.id === gameDetails.home_team.id);
                const visitorTeamStats = playerStats.filter(stats => stats.team.id === gameDetails.visitor_team.id);

                // console.log('Home team stats:', homeTeamStats);
                // console.log('Visitor team stats:', visitorTeamStats);

                // Set home team and visitor team players' stats
                setHomeTeamPlayers(homeTeamStats);
                setVisitorTeamPlayers(visitorTeamStats);
            } catch (error) {
                console.error('Error fetching player stats:', error);
            }
        };

        fetchGameStats();
    }, [gameId]); // Dependency on gameId to fetch stats when gameId changes

    

    const handlePlayerPress = (player) => {
        // Navigate to PlayerView screen with player details
        console.log('sending player details:', player);

        navigation.navigate('PlayerView', { player: player });
    };

     //rending loading state with circle animation 
    if(loading) {
        return(
            <View style={styles.loadingContainer}>
                <Progress.Circle
                    size={50} color='blue' borderWidth={5}
                    style={styles.circle} indeterminate={true} />
            </View>
        )
    }

    const teamLogos = {
        8: DenverNuggetsLogo,
        14: LosAngelesLakersLogo,
        10: GoldenStateWarriorsLogo,
        24: PhoenixSunsLogo,
        1: AtlantaHawksLogo,
        4: CharlotteHornetsLogo,
        12: IndianaPacersLogo,
        20: NewYorkKnicksLogo,
        22: OrlandoMagicLogo,
        3: BrooklynNetsLogo,
        16: MiamiHeatLogo,
        28: TorontoRaptorsLogo,
        5: ChicagoBullsLogo,
        15: MemphisGrizzliesLogo,
        29: UtahJazzLogo,
        27: SanAntonioSpursLogo,
        13: LAclippersLogo,
        17: MilwaukeeBucksLogo,
        23: Philadelphia76ersLogo,
        7: DallasMavericksLogo,
        6: ClevelandCavaliersLogo,
        21: OklahomaCityThunderLogo,
        19: NewOrleansPelicansLogo,
        26: SacramentoKingsLogo,
        11: HoustonRocketsLogo,
        30: WashingtonWizardsLogo,
        2: BostonCelticsLogo,
        9: DetroitPistonsLogo,
        18: MinnesotaTimberwolvesLogo,
        25:PortlandTrailBlazers
    }
    
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
            {gameDetails ? (
                <View>
                    <View style={styles.teamsContainer}>
                        <View style={styles.teamContainer}>
                            <Image source={teamLogos[gameDetails.home_team.id]} style={styles.teamLogo} />
                            <Text style={[styles.teamName, styles.homeTeamName]}>{gameDetails.home_team.full_name}</Text>
                            <Text style={styles.teamScore}>{gameDetails.home_team_score}</Text>
                        </View>
                        <View style={styles.vsContainer}>
                            <Text style={styles.vsText}>VS</Text>
                        </View>
                        <View style={styles.teamContainer}>
                            <Image source={teamLogos[gameDetails.visitor_team.id]} style={styles.teamLogo} />
                            <Text style={[styles.teamName, styles.visitorTeamName]}>{gameDetails.visitor_team.full_name}</Text>
                            <Text style={styles.teamScore}>{gameDetails.visitor_team_score}</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            <Icon name="calendar" size={20} color="#333" /> {gameDetails.date}
                        </Text>
                        {/* <Text style={styles.infoText}>
                            <Icon name="clock-o" size={20} color="#333" /> {gameDetails.time}
                        </Text>
                        <Text style={styles.infoText}>
                            <Icon name="trophy" size={20} color="#333" /> {gameDetails.status}
                        </Text> */}
                        {/* Add more game details here */}
                    </View>
                    <View style={styles.playersContainer}>
    <View style={styles.homeTeamPlayers}>
        <Text style={styles.teamPlayersHeader}>{gameDetails.home_team.full_name} Players:</Text>
        <View style={styles.playerTable}>
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Player</Text>
                <Text style={styles.headerText}>PTS</Text>
                <Text style={styles.headerText}>AST</Text>
                <Text style={styles.headerText}>REB</Text>
            </View>
            {/* Sort home team players by points */}
            {homeTeamPlayers.sort((a, b) => b.pts - a.pts).map(player => {
            // console.log('Player Object:', player.player);
            return (
                <TouchableOpacity key={player.id} onPress={() => {
                    console.log('Player First Name (Visitor):', player.player.first_name);
                    console.log('Player Last Name (Visitor):', player.player.last_name);
                    handlePlayerPress(player.player)
                }}>
                    <View key={player.id} style={styles.tableRow}>
                        <Text style={styles.playerName}>{player.player.first_name} {player.player.last_name}</Text>
                        <Text style={styles.playerStat}>{player.pts}</Text>
                        <Text style={styles.playerStat}>{player.ast}</Text>
                        <Text style={styles.playerStat}>{player.reb}</Text>
                    </View>
                </TouchableOpacity>
            );
        })}
        </View>
    </View>
    <View style={styles.visitorTeamPlayers}>
        <Text style={styles.teamPlayersHeader}>{gameDetails.visitor_team.full_name} Players:</Text>
        <View style={styles.playerTable}>
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Player</Text>
                <Text style={styles.headerText}>PTS</Text>
                <Text style={styles.headerText}>AST</Text>
                <Text style={styles.headerText}>REB</Text>
            </View>
            {/* Sort visitor team players by points */}
            {visitorTeamPlayers.sort((a, b) => b.pts - a.pts).map(player => {
            // console.log('Player Object (Visitor):', player.player);
                return (
                    <TouchableOpacity key={player.id} onPress={() => {
                        console.log('Player First Name (Visitor):', player.player.first_name);
                        console.log('Player Last Name (Visitor):', player.player.last_name);
                        handlePlayerPress(player.player)
                 }}>
            <View key={player.id} style={styles.tableRow}>
                <Text style={styles.playerName}>{player.player.first_name} {player.player.last_name}</Text>
                <Text style={styles.playerStat}>{player.pts}</Text>
                <Text style={styles.playerStat}>{player.ast}</Text>
                <Text style={styles.playerStat}>{player.reb}</Text>
            </View>
        </TouchableOpacity>
        );
        })}
        </View>
    </View>
</View>

                </View>
            ) : (
                <Text>Error: Game details not available</Text>
            )}
        </View>
        </ScrollView>
    )};


    const styles = StyleSheet.create({
        scrollViewContainer: {
            flexGrow: 1, 
        },
        container: {
          flex: 1,
          paddingHorizontal: 20,
        },
        teamsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginBottom: 20,
        },
        teamContainer: {
          alignItems: 'center',
        },
        vsContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
        },
        vsText: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333',
        },
        homeTeamName: {
          fontWeight: 'bold',
          color: 'green',
        },
        visitorTeamName: {
          fontWeight: 'bold',
          color: 'red',
        },
        teamScore: {
          fontSize: 20,
          marginHorizontal: 10,
        },
        infoContainer: {
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          marginBottom: 20,
        },
        infoText: {
          fontSize: 16,
          marginBottom: 5,
        },
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        playersContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        homeTeamPlayers: {
          flex: 1,
          paddingRight: 10,
        },
        visitorTeamPlayers: {
          flex: 1,
          paddingLeft: 10,
        },
        teamPlayersHeader: {
          fontWeight: 'bold',
          marginBottom: 10,
        },
        playerTable: {
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
        },
        tableHeader: {
            flexDirection: 'row',
            backgroundColor: '#f0f0f0',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        headerText: {
            flex: 1,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        playerName: {
            flex: 1,
        },
        playerStat: {
            flex: 1,
            textAlign: 'center',
        },
        teamLogo: {
            width: 50, 
            height: 50,
            resizeMode: 'contain', 
            marginBottom: 5,
        },
      });

export default GameDetailsScreen;