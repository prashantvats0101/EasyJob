

import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constant'
import HeaderComp from '../../../components/HeaderComp'
import InputText from '../../../components/textInput'
import { OpacityButton } from '../../../components'

const Cvmakethird = () => {
  return (
   <SafeAreaView style={{flex:1,padding:10,backgroundColor:Colors.white}}>
    <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white}/>
<HeaderComp
txt="CV Making"
img={require('../../../assets/Images/arrowback.png')}
/>
<ScrollView style={{marginTop:7}}>
    <Text style={styles.textt}>Certifications</Text>
<InputText
txt="Certification Name"
/>
<InputText
txt="Issuing Organization"
/>
<InputText
txt="Certification Date"
/>
<Text style={styles.textt}>Projects</Text>
<InputText
txt="Project Title"
/>
<InputText
txt="Description"
/>
<InputText
txt="Role "
/>
<Text style={styles.textt}>References</Text>
<InputText
txt="Name"
/>
<InputText
txt="Position"
/>
<InputText
txt="Contact Information"
/>
<Text style={styles.textt}>Additional Information</Text>

<View style={styles.inputView2}>
            <TextInput
             
              placeholder="Brief summary of career goals or professional achievements"
              placeholderTextColor="rgba(170, 166, 185, 1)"
              style={styles.info}
              multiline={true}
            
            />
          </View>
<OpacityButton
name="SAVE"
button={{width:250,marginTop:10}}
/>
</ScrollView>
   </SafeAreaView>
  )
}

export default Cvmakethird

const styles = StyleSheet.create({
    textt:{
        fontFamily:'Montserrat-Bold',fontSize:17,color:'#000000',marginLeft:15
    },
    inputView2: {
        backgroundColor: Colors.inputbackground,
        height: 109,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        marginBottom: 30,
      }, info: {
        color: Colors.blacktxt,
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,width:'100%'
      },
})
