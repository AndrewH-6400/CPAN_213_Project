import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";


const Account = () => {    
    user = useSelector(state => state.user.user)

    return(

        <View style={styles.container}>            
            
            <View style={[styles.container]}>
                <Text>{user.username}</Text>            
            </View>

            {/*footer? */}
            <View style={styles.footer}>
                <Text>this might be for the footer</Text>
            </View>            
        </View>
    )
}

export default Account

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