import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { CommonText } from '.'
import { Colors } from '../constant'

const HeaderComp = (props: any) => {
    const navigation = useNavigation()
    return (
        <View style={[styles.container, props?.style]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={props.img} style={styles.backarrow} />
            </TouchableOpacity>
            <CommonText style={styles.Txtstyl}>{props?.txt} </CommonText>
            <TouchableOpacity style={props.img2styl} onPress={props?.pressimg}>
                <Image source={props.img2}  style={props.imgtwostyle}/>
            </TouchableOpacity>
        </View>
    )//tintColor:'grey'
}

export default HeaderComp

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-between', height: 40, marginTop: 10, paddingHorizontal: 15 },
    Txtstyl: { fontFamily: 'Montserrat-Bold', fontSize: 20 },
    backarrow: { height: 24, width: 24,marginTop:5 }
})