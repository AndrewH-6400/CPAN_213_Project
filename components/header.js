import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { faBasketball } from "@fortawesome/free-solid-svg-icons";
import { Header } from "@rneui/base";
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"


const Headbar = ({navigation}) => {
    avatar = useSelector(state=>state.user.avatar);

    return(
        <Header
            statusBarProps={styles.statusbar}
            containerStyle={styles.container}
            leftComponent={<TouchableOpacity onPress={()=>navigation.navigate("Home")}><FontAwesomeIcon icon={faBasketball} style={styles.icon} size={24} /></TouchableOpacity>}           
            rightComponent={
                avatar != null &&
                <FontAwesomeIcon icon={avatar} style={styles.icon} size={24}/>
            }
        />
    )
}

export default Headbar

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',   
        borderWidth: 3,
        borderColor: "orange",
        borderStyle: 'solid'     
    },
    statusbar: {
        backgroundColor: 'orange'
    },
    icon: {
        color: 'white',
        
    }
})