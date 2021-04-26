import React from 'react'

import { View,StyleSheet,Button,Text } from 'react-native'
import Header from '../components/Header'

const Contact = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header title="Contact" navigation={navigation}/>
            <View style={styles.content}>
                <Text style={styles.text}>Contact is here</Text>
                <Button title="Go Home" onPress={()=>navigation.goBack()} />
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
        backgroundColor:"#c203fc"
    },
    text:{
        fontSize: 20,
        color:"#ffffff",
        fontWeight: "800"
    },
    button:{

    }
})


export default Contact
