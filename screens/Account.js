import { faHippo } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { avatarChange } from "../redux_store/actions/userRegAction";


const Account = () => {    
    user = useSelector(state => state.user.user)
    dispatch = useDispatch()
    //faCat, faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook, faCrow, faDog, faDragon, faFish, faFrog, faHatWizard, faHippo, faMoneyBill, faPerson, faPersonDress, faPersonMilitaryPointing, faPersonSkiing, faSkull, faUserAstronaut, faUserSecret, faUserTie
    const icons = [
        "person", "person-dress", "person-skiing", "user-tie", "user-secret", "user-astronaut",
        "dog", "cat", "crow","fish","frog","dragon",
        "chess-pawn","chess-rook","chess-bishop","chess-knight","chess-queen","chess-king",
    ]
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
                <Text style={[styles.text,{fontWeight:'bold', color:'black'}]}>Select Your Avatar!</Text>                    
                <View style={styles.iconSelect}>        
                    {icons.map((icon,id)=>{
                        return(
                            <TouchableOpacity id={id} onPress={()=>dispatch(avatarChange(icon))}>
                                <FontAwesomeIcon icon={icon} style={styles.icon} size={40}/>
                            </TouchableOpacity>
                        )
                    })}                    
                    
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
        padding: 10,   
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
        flex: 0.35,
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
        // borderColor: 'black',
        // borderStyle: 'solid',
        // borderWidth: 5,
      },
      icon: {
        color: 'white',
        marginHorizontal: 10,
        marginVertical: 20,        
      },
      footer: {
        width: '100%',
        height: '10%',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
      },
      
})