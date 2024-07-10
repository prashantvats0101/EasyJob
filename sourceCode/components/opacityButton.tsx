import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constant';

const OpacityButton = (props: any) => {


    return (
        <TouchableOpacity style={[styles.container, props.button]}
            onPress={props.pressButton}>
            <Text style={[styles.myText, props.btnTextStyle]}>{props.name}</Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '90%',

        alignSelf: 'center',


        fontWeight: '600',
        fontSize: 14,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Bluebg, borderRadius: 41, marginVertical: 30

    },
    myText: {


        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: Colors.whitetxt
    }

});

export default OpacityButton;