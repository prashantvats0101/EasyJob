
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constant'
import HeaderComp from '../../../components/HeaderComp'
import InputText from '../../../components/textInput'
import { OpacityButton } from '../../../components'
import { useNavigation } from '@react-navigation/native'

const Cvmaking = () => {
  const navigation = useNavigation()
  return (
   <SafeAreaView style={{flex:1,padding:10,backgroundColor:Colors.white}}>
    <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white}/>
<HeaderComp
txt="CV Making"
img={require('../../../assets/Images/arrowback.png')}
/>
<ScrollView style={{marginBottom:7}}
  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
>
  <Text style={styles.textt}>Personal Information</Text>
<InputText
txt="Full Name"
placeholder="Rishabh Singh"
/>
<InputText
txt="Email Address or Phone Number"
placeholder="example@gmail.com"
/>
<InputText
txt="Address (Optional)"
placeholder="Mohali"
/>
<InputText
txt="Date of Birth"
placeholder="25-5-2000"
/>
<InputText
txt="Nationality"
placeholder="5+"
/>
<InputText
txt="Language Spoken "
placeholder="Hindi"
/>
<Text style={styles.textt}>Professional Summary/Objective</Text>
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
pressButton={()=>{navigation.navigate('cvsecond')}}
/>
</ScrollView>
   </SafeAreaView>
  )
}

export default Cvmaking

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
