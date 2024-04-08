import { View,Text,StyleSheet, FlatList } from "react-native";
import { Image } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGamesRequest, fetchGamesSuccess, fetchGamesFailure } from '../redux_store/actions/gamesAction';
import { Card } from "@rneui/base";
import * as Progress from 'react-native-progress';
// import data from './feed.json';
import axios from "axios";
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



const Feed = () => {
    const dispatch = useDispatch();
    const {games, loading, error} = useSelector(state => state.games); //exstract data from redux store
    //{ games, loading, error } deconstructing task to extract properties from state in redux store
    //I am selecting the game slice in actions. game is the key, I can name it anything(it should be constant with redux store) but the key accesses the state i created it in the reducer
    //console.log('Redux State check: ', games);
    useEffect(()=> {
        dispatch(fetchGamesRequest());

        axios.get('https://api.balldontlie.io/v1/games?seasons[]=2023&seasons[]=2024',{
            
            headers: {
                Authorization: '87bdef63-ca65-4043-b674-932fe6c60bb3' //Bearer is a type of access toekn for authentication
            }
        })
        .then(response => {
            //console.log("Api Response:", response.data) //logging response from api
            dispatch(fetchGamesSuccess(response.data.data)); //response.data returns HTTP response when using AXIOS, this is accessed with data property. 
            //data.data is becaues the data is an array of objs. So data will look within the array of Data and .data will go within that array to exstract data
            //dispatch will dispatch this action to the Redux store by passing the array of objs, as payload fetchGame
        })
        .catch(error => {
            console.error("API errorL ", error)
            dispatch(fetchGamesFailure(error.message)) //message is property of error, error.message is extracting that error
        });


    }, []); //ensures that useEffect is only executed once when component mounts


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

    //error rendering from state
    if (error) {
        return <Text>Error: {error}</Text>
    }
    // const quarterlyString = (quarterly) => {
    //     return(`${quarterly[0]} - ${quarterly[1]} - ${quarterly[2]} - ${quarterly[3]} - ${quarterly[4]}`)        
    // }

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

    const renderGameItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.homeContainer}>
                <Image source={teamLogos[item.home_team.id]} style={styles.teamLogo} />
                <View style={styles.textContainer}>
                    <Text style={styles.teamName}>{item.home_team.full_name}</Text>
                    <Text style={styles.teamScore}>{item.home_team_score}</Text>
                </View>
            </View>
            <View style={styles.visitorContainer}>
                <Image source={teamLogos[item.visitor_team.id]} style={styles.teamLogo} />
                <View style={styles.textContainer}>
                    <Text style={styles.teamName}>{item.visitor_team.full_name}</Text>
                    <Text style={styles.teamScore}>{item.visitor_team_score}</Text>
                </View>
            </View>
            <View style={styles.gameInfo}>
                {/* <Text style={styles.quarterInfo}>Period: {item.period}</Text>
                <Text style={styles.quarterInfo}>Status: {item.status}</Text> */}
                {/* <Text style={styles.quarterInfo}>Date: {item.date}</Text> */}
            </View>
            
        </View>
    );
    return (
        <FlatList
            style={styles.feed}
            data={games}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderGameItem}
        />
    );

}

export default Feed

const styles = StyleSheet.create({
    feed: {
        flex: 1,
    },
    teamLogo: {
        width: 75,
        height: 75,
        resizeMode: 'contain', 
    },
    textContainer: {
        alignItems: 'center',
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, 
        width: '95%',
        alignItems: 'center',                
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    homeContainer: {
        paddingRight: 40,        
        flex: 1,   
        alignItems: 'center',             
    },
    visitorContainer: {
        paddingLeft: 40,
        flex: 1,
        alignItems: 'center',     
    },
    textContainer: {
        alignItems: 'center',
    },
    // score: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'flex-start',
    //     alignItems: 'flex-end',
    // },
    gameInfo: {
        alignSelf: 'center', 
        marginTop: 10, 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        fill: 'transparent',
    },
    teamName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    teamScore: {
        fontWeight: 'bold',
    },
    // quarterInfo: {
    //     fontSize: 12,
    //     marginBottom: 2,
    // },
});
