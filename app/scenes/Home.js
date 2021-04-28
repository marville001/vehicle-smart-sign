import React from 'react'
import { View,StyleSheet,Button,Text } from 'react-native'
import Header from '../components/Header'

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header title="Home" navigation={navigation}></Header>
            <View style={styles.content}> 
                <Text style={styles.text}>Home is here</Text>
                <Button title="Camera" onPress={()=>navigation.navigate("Camera")} />
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
