import { faHippo, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";


const Account = () => {    
    user = useSelector(state => state.user.user)

    return(

        <View style={styles.container}>            
            
            <View style={styles.container}>
                <View style={styles.nameC}>
                    <View style={styles.line}>
                        <Text style={[styles.text,{fontWeight:'bold'}]}>Name: </Text>
                        <Text style={styles.text}>{user.username}</Text>
                    </View>
                    <View style={styles.line}>
                    <Text style={[styles.text,{fontWeight:'bold'}]}>Email: </Text>
                        <Text style={styles.text}>{user.email}</Text>
                    </View>
                    <View style={styles.line}>
                    <Text style={[styles.text,{fontWeight:'bold'}]}>Age: </Text>
                        <Text style={styles.text}>{user.age}</Text>
                    </View>
                    <View style={styles.line}>
                    <Text style={[styles.text,{fontWeight:'bold'}]}>Favourite Team: </Text>
                        <Text style={styles.text}>{user.favoriteTeam}</Text>                
                    </View>
                </View>
                <View style={styles.iconSelect}>
                    <Text style={[styles.text,{fontWeight:'bold', width: '100%'}]}>Select Your Avatar!:{'\n'}</Text>
                    <FontAwesomeIcon icon={faUserAstronaut}/>
                </View>
                <View >
                    <FontAwesomeIcon icon={faHippo}/>
                </View>
                
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
        justifyContent: 'space-between',
        width: '100%',
      },
      nameC: {
        flex: 0.25,        
        backgroundColor: 'white',
        width: '100%',        
        justifyContent: 'space-between',        
      },
      line: {
        flexDirection: 'row',
        flex: 0.25,        
      },
      text: {
        fontSize: 20
      },
      iconSelect: {
        backgroundColor: "orange",
        width: '100%',
        flex: 0.5,
        flexDirection: 'row',
        
      },
      footer: {
        width: '100%',
        height: '10%',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
      },
      
})