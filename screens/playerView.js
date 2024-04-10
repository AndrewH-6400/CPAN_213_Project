import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios'; 
import { Table, Row, Rows } from 'react-native-table-component';

const PlayerView = ({ route }) => {
    const { player } = route.params;// extracting player ID from route parameter
    const [ playerDetails, setPlayerDetails ] = useState(null);
    const [ seasonAverage, setSeasonAverage ] = useState(null);

    // console.log("Player obj from Coming from gameView: ", player);
    // console.log("player id: ", player.id)

    useEffect(() => {
        // Fetch player details when component mounts
        const fetchplayerDetails = async () => {
            try {
                const headers = {
                    Authorization: '87bdef63-ca65-4043-b674-932fe6c60bb3'
                };
                // fetch with players with team id 
                const playerResponse = await axios.get(`https://api.balldontlie.io/v1/players?team_ids[]=${player.team_id}&per_page=100`
                , {headers})

                const teamData = playerResponse.data;
                // console.log("team data:", teamData);

                const playerDetails = teamData.data.find(details => details.last_name === player.last_name && details.first_name === player.first_name);
                // console.log("Player Details from filter: ", playerDetails)
                // const playerData = playerResponse.data.data; // Assuming the first result is the desired player
                // console.log(playerData)
                setPlayerDetails(playerDetails);
                // console.log("Player details id: ", playerDetails.id)

                const seasonAverageResponse = await axios.get(`https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${player.id}`
                , { headers });
                const seasonAverageData = seasonAverageResponse.data;
                // console.log("Season Average of Player: ",seasonAverageData);
                setSeasonAverage(seasonAverageData);



            } catch (error) {
                console.error('Error fetching player details: ', error);
            }
        };
        fetchplayerDetails();

        //clear state when component unmounts
        return () => {
            setPlayerDetails(null);
            setSeasonAverage(null);
          };

    }, [player]);
    const renderPlayerDetailsTable = () => {
        if (!playerDetails) return null;
        const tableData = [
            ['Position', playerDetails.position],
            ['Height', playerDetails.height],
            ['Weight', `${playerDetails.weight} lbs`],
            ['Jersey Number', playerDetails.jersey_number],
            ['College', playerDetails.college],
            ['Country', playerDetails.country],
            ['Draft Year', playerDetails.draft_year],
            ['Draft Round', playerDetails.draft_round],
            ['Draft Number', playerDetails.draft_number],
            ['Team', playerDetails.team.full_name]
        ];
        return (
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                <Rows data={tableData} textStyle={styles.tableText} />
            </Table>
        );
    };

    const renderSeasonAveragesCards = () => {
        if (!seasonAverage) return null;
        const { data } = seasonAverage;
        return data.map(item => (
            <View key={item.id}>
                {/* <Text style={styles.card}>Season: {item.season}</Text> */}
                <View style={styles.card}>
                    <Text>Games Played: {item.games_played}</Text>
                </View>
                <View style={styles.card}>
                    <Text>Minutes Per Game: {item.min}</Text>
                </View>
                <View style={styles.card}>
                    <Text>Points Per Game: {item.pts.toFixed(2)}</Text>
                </View>
                <View style={styles.card}>
                    <Text>Assists Per Game: {item.ast.toFixed(2)}</Text>
                </View>
                <View style={styles.card}>
                    <Text>Rebounds Per Game: {item.reb.toFixed(2)}</Text>
                </View>
                <View style={styles.card}>
                    <Text>Blocks Per Game: {item.blk.toFixed(2)}</Text>
                </View>
                <View style={styles.card}>
                    <Text>Turnovers Per Game: {item.turnover.toFixed(2)}</Text>
                </View>
            </View>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {playerDetails ? (
                <View>
                    <Text style={styles.playerName}>{playerDetails.first_name} {playerDetails.last_name}</Text>
                    {renderPlayerDetailsTable()}
                </View>
            ) : (
                <Text>Loading player details...</Text>
            )}
            {seasonAverage ? (
                <View>
                    <Text style={styles.sectionTitle}>Season Averages for 2023</Text>
                    <ScrollView horizontal={true}>
                        <View style={styles.cardsContainer}>
                            {renderSeasonAveragesCards()}
                        </View>
                    </ScrollView>
                </View>
            ) : (
                <Text>Loading season averages...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    statContainer: {
        marginBottom: 5,
    },
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    playerName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tableText: {
        margin: 6,
    },
    card: {
        width: 300,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginBottom: 20,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default PlayerView;