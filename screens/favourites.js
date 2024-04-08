import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SpeedDial } from "@rneui/base";

import Feed from "../components/feed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
//import { response } from "express";

const bballUrl = "http://api.balldontlie.io/v1/teams"

const Favourites = () => {    

    const [open, setOpen] = useState(false)    

    return(
        <View style={styles.container}>
            <Feed />
            <SpeedDial 
                isOpen={open}
                icon={{name:'menu', color:'#fff'}}
                openIcon={{name:'close', color:'#fff'}}
                onOpen={()=>setOpen(!open)}
                onClose={()=>setOpen(!open)}
            >
                <SpeedDial.Action 
                    icon={<FontAwesomeIcon icon={faStar} color="white"/>}
                    title="Favourite?"
                    onPress={()=>console.log("Add something")}
                />
                <SpeedDial.Action 
                    icon={{name:'remove',color:'#fff'}}
                    title="Remove"
                    onPress={()=>console.log("Add something")}
                />
            </SpeedDial>
        </View>
    )
}

export default Favourites

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})