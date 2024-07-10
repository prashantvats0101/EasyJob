import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constant';
import { CommonText } from '.';

const InputText = (props: any) => {


    return (
        <View style={[styles.inputView, props?.style]}>


            <View style={[styles.textinputview, props?.inputview]}>
                <CommonText style={[styles.inputtxt, props?.styletxt]}>{props?.txt} </CommonText>
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={props?.placeholderTextColor ? props?.placeholderTextColor : Colors.blacktxt}
                    maxLength={props?.length}
                    keyboardType={props?.keyboardType}
                    onChangeText={props?.onChangeText}
                    value={props?.value}
                    autoCapitalize={props?.autoCapitalize}
                    secureTextEntry={props?.secureTextEntry}
                    style={[styles.input, { color: Colors.blacktxt, fontFamily: 'Montserrat-Bold', fontSize: 14, }, props?.inputstyl]}
                    editable={true}
                    multiline={props?.multiline}
onFocus={props?.onFocus}
numberOfLines={props?.numberOfLines}
// textAlign={props?.textAlign}

                // placeholderStyle={{ fontFamily: 'Montserrat-Bold' }}
                />

            </View>
            <TouchableOpacity onPress={() => {
                console.log("pressed")
            }}
                style={[styles.img, props?.imgstyle]}
            >


                <Image 
                resizeMode='center'
                source={props.img} />


            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({

    input: { height: 42.8, width: '115%', fontSize: 14, color: Colors.blacktxt, marginTop: 14, fontFamily: 'Montserrat-Bold',marginLeft:1 },

    inputView: { backgroundColor: Colors.inputbackground, height: 61, width: '90%', alignSelf: 'center', flexDirection: 'row', borderRadius: 10, marginTop: 10, marginBottom: 10, justifyContent: 'center' },
    inputtxt: { color: Colors.black56, fontSize: 10,marginLeft: 4.5, position: 'absolute', top: 9,fontFamily: 'Montserrat-Bold',width:'100%' },
    inputimgView: { width: 35, justifyContent: 'center', alignItems: 'center', },
    textinputview: { width: '80%', alignSelf: 'center', },
    img: { alignSelf: 'center', marginLeft: 20, height: 16, width: 20, justifyContent: 'center', alignItems: 'center', }

});

export default InputText;