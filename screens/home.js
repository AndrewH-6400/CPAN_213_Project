import { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Registration from "./Registration";

const APIKey = "5c415b93-66df-4422-a506-10b9a006532e"
const APITeams = "http://api.balldontlie.io/v1/teams"

const Home = () => {

    useEffect(()=>{
        fetch({})
    },[])

    return(
        <View style={styles.container}>
            <Registration/>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})