import { SafeAreaView, StyleSheet, Text, View, StatusBar, ScrollView, Image, TouchableOpacity, Modal, Button, TextInput, Alert, TouchableWithoutFeedback, FlatList, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../../constant'
import HeaderComp from '../../../components/HeaderComp'
import { CommonText } from '../../../components'
import apiName, { BASEURL } from '../../../Api/apiName'
import { useSelector } from 'react-redux'

const Messages = () => {

    const navigation = useNavigation()
    const data = [
        // {
        //     id: 2,
        //     username:"Andy Robertson",
        //     unreadmessage:"Oh yes, please send your CV/Res...",
        //     sentmessage:"",
        //     time:"5m ago",
        //     countmessage:"2",
        //     profilepic:require('../../../assets/Images/andy.png')
        // },
        {
            id: 1,
            username:"Easy Job's Admin",
            unreadmessage:"",
            sentmessage:"Tap To Chat",
            time:"30m ago",
            countmessage:"",
            profilepic:require('../../../assets/Images/Splashimg.png')
        },
        
    ]

    const renderItem = ({ item }) => {
        let messageToShow = item.sentmessage;
        let messageStyle = styles.sentmessagestyle;
      
        if (!item.sentmessage && item.unreadmessage) {
          messageToShow = item.unreadmessage;
          messageStyle = styles.unreadmessagestyle;
        } else if (!item.sentmessage && item.countmessage) {
          messageToShow = item.countmessage;
          messageStyle = styles.unreadmessagestyle; 
        }


        return (
          <TouchableOpacity style={styles.render_main_view} onPress={()=>{navigation.navigate("Dmmessage")}}>
            <View style={styles.renderview}>
              <Image source={item.profilepic} style={styles.profilepic} resizeMode='contain'/>
              <View style={styles.usernameview}>
               
                <CommonText style={styles.username_txt} >{item.username}</CommonText>
             
                <CommonText style={messageStyle}>{messageToShow}</CommonText>
              </View>
              <View style={[styles.timeview,]}>
                {/* <CommonText style={styles.sentmessagestyle}>{item.time}</CommonText> */}
                {item.countmessage && !item.sentmessage && (
                  <View style={styles.countmessageview}>
                    <CommonText style={styles.countstyl}>{item.countmessage}</CommonText>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      }
      
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.white} />
            <HeaderComp
                txt="Messages"
                style={{ marginTop: 25 }}
                Txtstyl={{fontFamily:'DMSans-Bold'}}
                img={require('../../../assets/Images/arrowback.png')}
                // txt="Edit Profile"
            />
            {/* <View style={styles.inputview}>
                <Image source={require('../../../assets/Images/SearchI.png')} style={{ height: 24, width: 24, marginRight: 10 }} />
                <TextInput
                    placeholder='Search message'
                    placeholderTextColor={"#A0A7B1"}
                    style={styles.inputtext}
//                     value={inputMessage}
// onChangeText={setinputMessage}
                />
            </View> */}
            <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    style={{ flex: 1,paddingHorizontal:18 ,marginTop:20}}
                />
        </SafeAreaView>
    )
}
export default Messages

const styles = StyleSheet.create({
    inputview: {
        height: 50, width: 335, alignSelf: 'center', borderRadius: 7,
        backgroundColor: Colors.white, elevation: 18, shadowColor: '#A0A7B1',
        marginTop: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20,
    }
    ,
    inputtext: { fontFamily: 'DMSans-Bold', width: 280 },
    render_main_view:{
        flexDirection:'row',marginVertical:2,height:70,alignItems:'center',  backgroundColor: Colors.white, elevation: 18, shadowColor: '#A0A7B1',width:'98%',alignSelf:'center',borderRadius:10
    },
    renderview:{flexDirection:'row',width:'100%'},
    profilepic:{height:50,width:50},
    timeview:{right:5,position:'absolute',top:9},
    usernameview:{marginLeft:10,alignSelf:'center'},
    username_txt:{color:'#150B3D',fontFamily: 'DMSans-Bold'},
    unreadmessagestyle:{color:'#524B6B',fontFamily: 'DMSans-Bold',fontSize:12},
    sentmessagestyle:{color:'#AAA6B9',fontSize:12,fontFamily:'DMSans-Medium'},
    countstyl:{fontSize:9,color:Colors.white,fontFamily:'OpenSans-Medium'},
    countmessageview  :{height:14,width:14,backgroundColor:Colors.Bluebg,alignSelf:'flex-end',borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:5}
})