

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constant';

const ImgButton = (props: any) => {


    return (
        <TouchableOpacity style={[styles.container, props.button]}
            onPress={props.pressButton}>
            <Image source={props.img} style={[styles.img, props.btnimgStyle]} />
            {/* <Image source={require('../assets/Images/notification.png')} /> */}
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '10%',

        alignSelf: 'center',



        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 41,

    },
    img: {
        alignSelf: 'center'
    }

});

export default ImgButton;