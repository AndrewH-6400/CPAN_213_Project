import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SpeedDial } from "@rneui/base";

import Feed from "../components/feed";

import Headbar from "../components/header";

const Home = () => {    
    

    return(
        <View style={styles.container}>            
            <Feed />
            <View style={[styles.container,{flex:0.25}]}>
                <Text>this works</Text>            
            </View>

            {/*footer? */}
            <View style={styles.footer}>
                <Text>this might be for the footer</Text>
            </View>            
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
      footer: {
        width: '100%',
        height: '10%',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
      },
      
})