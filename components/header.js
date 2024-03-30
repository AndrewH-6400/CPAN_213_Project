import { View, Text, Button, StyleSheet } from "react-native";
import { Header } from "@rneui/base";

const Headbar = () => {
    return(
        <Header
            statusBarProps={styles.statusbar}
            containerStyle={styles.container}
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
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
    }
})