import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SpeedDial } from "@rneui/base";

import Feed from "../components/feed";


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
                    icon={{name:'add',color:'#fff'}}
                    title="Add"
                    onPress={()=>console.log("Add something")}
                />
                <SpeedDial.Action 
                    icon={{name:'add',color:'#fff'}}
                    title="Add"
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