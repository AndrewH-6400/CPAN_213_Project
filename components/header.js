import { View, Text, Button, StyleSheet } from "react-native";
import { Header } from "@rneui/base";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faBasketball, faQuestion, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const Headbar = ({route}) => {
    return(
        <Header
            statusBarProps={styles.statusbar}
            containerStyle={styles.container}
            leftComponent={<FontAwesomeIcon icon={faBasketball} style={styles.icon} size={24}/>}
            centerComponent={{ text: route.route, style: { color: '#fff' } }}
            rightComponent={<FontAwesomeIcon icon={faUserAstronaut} style={styles.icon} size={24}/>}
        />
    )
}

export default Headbar

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        marginBottom: 15
    },
    statusbar: {
        backgroundColor: 'orange'
    },
    icon: {
        color: 'white',
        
    }
})