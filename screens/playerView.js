import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios'; 


const PlayerView = ({ route }) => {
    const { player } = route.params;// extracting player ID from route parameter
    const [ playerDetails, setPlayerDetails ] = useState(null);
    console.log("Player obj from Coming from gameView: ", player);
    console.log("team id: ", player.team_id)

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
                console.log("team data:", teamData);

                const playerDetails = teamData.data.filter(details => details.last_name === player.last_name 
                    && details.first_name === player.first_name);
                console.log("Player Details: " , playerDetails)
                // const playerData = playerResponse.data.data; // Assuming the first result is the desired player
                // console.log(playerData)
                setPlayerDetails(teamData);
            } catch (error) {
                console.error('Error fetching player details: ', error);
            }
        };
        fetchplayerDetails();

        //clear state when component unmounts
        return () => {
            setPlayerDetails(null);
          };

    }, [player]);
    return (
        <View style={styles.container}>
          {/* {playerDetails ? (
            <View>
              <Text style={styles.playerName}>
                {playerDetails.first_name} {playerDetails.last_name}
              </Text>
              <Text>Position: {playerDetails.position}</Text>
              <Text>Height: {playerDetails.height}</Text>
              <Text>Weight: {playerDetails.weight} lbs</Text>
              <Text>Jersey Number: {playerDetails.jersey_number}</Text>
              <Text>College: {playerDetails.college}</Text>
              <Text>Country: {playerDetails.country}</Text>
              <Text>Draft Year: {playerDetails.draft_year}</Text>
              <Text>Draft Round: {playerDetails.draft_round}</Text>
              <Text>Draft Number: {playerDetails.draft_number}</Text>
              <Text>Team: {playerDetails.team.full_name}</Text>
            </View>
          ) : (
            <Text>Loading player details...</Text>
          )} */}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      playerName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
    });
    
    export default PlayerView;