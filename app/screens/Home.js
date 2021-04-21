import React from 'react'
import { View,StyleSheet,Button,Text } from 'react-native'

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}> 
                <Text style={styles.text}>Home is here</Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    content:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#03cafc"
    },
    text:{
        fontSize: 20,
        color:"#ffffff",
        fontWeight: "800"
    }
})


export default Home
