import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Header } from "@rneui/base";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBasketball, faQuestion, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const Headbar = ({navigation}) => {
    return(
        <Header
            statusBarProps={styles.statusbar}
            containerStyle={styles.container}
            leftComponent={<TouchableOpacity onPress={()=>navigation.navigate("Home")}><FontAwesomeIcon icon={faBasketball} style={styles.icon} size={24} /></TouchableOpacity>}           
            rightComponent={<FontAwesomeIcon icon={faUserAstronaut} style={styles.icon} size={24}/>}
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