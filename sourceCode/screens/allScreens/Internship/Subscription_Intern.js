/* eslint-disable prettier/prettier */
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens'
const data = [
     {id:1,name:"For 1st year Students", cost:"1999/-", year:"For 3years"},
     {id:2,name:"For 2nd year Students", cost:"1399/-", year:"For 2years"},
     {id:3,name:"For 3rd year Students", cost:"799/-", year:"For 1year"},
]
const Subscription_Intern = () => {
  return (
    <SafeAreaView style={{flex:1, justifyContent:'center',margin:0,backgroundColor:'white',alignItems:'center',}}>
      <View style={styles.container}>
        <Text style={styles.title}>Subscription{'\n'}Plan</Text>
        <Text style={styles.smalltitle}>For an Intern</Text>
        <View style={styles.listsubcost}>{data.map((item) =>
          <View style={styles.listcontainer}>
           <Text style={styles.textname}>{item.name}</Text>
           <View><Text style={styles.textcost}>{item.cost}</Text><Text style={styles.yeartext}>{item.year}</Text></View>    
          </View>             
        )}
        </View>
        <View>
        <TouchableOpacity style={styles.buttoncontainer} onPress={'/'}>
            
            <Text style={styles.buttontext}>Continue</Text>
            <Image style={styles.buttonimage} source={require('../../../assets/Images/bluearrow.png')}/>
            

        </TouchableOpacity></View>
      </View>
      <Text style={styles.bottomtext} onPress={'/'}>Students can also Join us for Internship</Text>
    </SafeAreaView>
  )
}

export default Subscription_Intern

const styles = StyleSheet.create({
    container:{
        width:'85%',
        backgroundColor:'#3BA4E9',
        alignItems:'center',
        height:600,
        borderRadius:25,
        elevation:5,
    },
    title:{
        paddingTop:20,
        padding:10,
        fontSize:45,
        // backgroundColor:'red',
        textAlign:'center',
        fontWeight:'bold',
    },
    smalltitle:{
        paddingTop:10,
        fontSize:16,
        fontWeight:'bold',
        color:'#FFC480',

    },
    listsubcost:{
        paddingTop:40,
    },
    listcontainer: {

        flex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        alignSelf:'baseline',
        // backgroundColor:'red',
        width:'80%',
        padding:20,
        fontSize:25,
        
    },
    textcost:{
        paddingLeft:20,
        textAlign:'right',
        color:'#FFC480'
    },
    textname:{fontSize:17,},
    buttoncontainer:{
        flex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        alignSelf:'baseline',
        backgroundColor:'white',
        width:'60%',
        height:'24.3%',
        padding:5,  
        marginTop:'20%',
        borderRadius:30, 
        elevation:5,

    },
    buttontext:{
        color:'black',
        fontSize:25,
        justifyContent:'center',
        paddingTop:5,
        paddingLeft:'10%',

    },
    buttonimage:{
        // backgroundColor:'red',
        paddingRight:'',
    },
    bottomtext:{
        paddingTop:'10%',
        color:'#3DB2FF',
        fontSize:16,
        
    },
    yeartext:{
        fontSize:8,
        textAlign:'right',
    }
    
})