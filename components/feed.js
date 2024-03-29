import { View,Text,StyleSheet, FlatList,ScrollView } from "react-native";
import { Card } from "@rneui/base";

import data from './feed.json';

const Feed = () => {

    const quarterlyString = (quarterly) => {
        return(`${quarterly[0]} - ${quarterly[1]} - ${quarterly[2]} - ${quarterly[3]} - ${quarterly[4]}`)        
    }

    return(
    <ScrollView style={styles.feed} overScrollMode="never">        
            {
                data.map((game,i)=>{
                    return(
                        <View                                 
                            key={i} 
                            style={styles.card}                                                        
                        >                                                        
                            <View style={styles.score}>
                                <Text style={{textAlign:'right'}}>{game.data[0].team} </Text>
                                <Text style={{textAlign:'right'}}>{game.data[0].score} </Text>
                                <Text style={{textAlign:'center', fontSize:12}}>{quarterlyString(game.data[0].quarterly)}</Text>
                            </View>
                            <View style={styles.score}>
                                <Text style={{textAlign:'left'}}> {game.data[1].team}</Text>
                                <Text style={{textAlign:'left'}}> {game.data[1].score}</Text>
                                <Text style={{textAlign:'right', fontSize:12}}>{quarterlyString(game.data[1].quarterly)}</Text>
                            </View>                            
                        </View>
                    )
                })
            }           
    </ScrollView>
    )
}

export default Feed

const styles = StyleSheet.create({
    feed:{
        flex: 0.75,
        width: '80%',
        height: '60%',
        flexDirection: 'column',
        backgroundColor: 'black',
        borderRadius: 10,
        
    },
    card: {
        flexDirection: 'row',
        flex: 1,
        justifyContent:'space-between',        
        backgroundColor: 'white',
        margin: 10,
        padding: 20,
        
    },    
    score: {        
        flex: 0.5,        
    }
})