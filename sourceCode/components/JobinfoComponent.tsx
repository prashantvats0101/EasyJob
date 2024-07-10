import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CommonText, OpacityButton } from '.';
import { Colors } from '../constant';

const JobinfoComponent = (props: any) => {
     

    return (
        <View>
            <TouchableOpacity  style={styles.inputView}>
                <CommonText style={styles.inputtxt}>{props?.txt}</CommonText>
                <View style={styles.dropdownArrow}>
                    <Image source={require('../assets/Images/Downarrow.png')} />
                </View>
                <CommonText style={styles.Selectedop}>.</CommonText>
            </TouchableOpacity>
          
        </View>
    );
};

export default JobinfoComponent;

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: Colors.inputbackground,
        height: 61,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderStartColor: 'red'
    },
    inputtxt: {
        color: Colors.black56,
        fontSize: 10,
        marginTop: 10,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 7,
    },
    dropdownContent: {
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
    dropdownContainer: {
        position: 'absolute',
        borderWidth: 1,
        width: 200,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginLeft: 30,
        padding: 10
    },
    dropdownArrow: {
        position: 'absolute',
        top: 28,
        right: 19,
    },
    Selectedop: {
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 4,
        marginTop: 5
    }
});
