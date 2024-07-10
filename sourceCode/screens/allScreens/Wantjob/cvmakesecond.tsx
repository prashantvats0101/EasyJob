
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constant'
import HeaderComp from '../../../components/HeaderComp'
import InputText from '../../../components/textInput'
import { OpacityButton } from '../../../components'
import { useNavigation } from '@react-navigation/native'

const Cvmakesecond = () => {
    const navigation = useNavigation()
  return (
   <SafeAreaView style={{flex:1,padding:10,backgroundColor:Colors.white}}>
    <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white}/>
<HeaderComp
txt="CV Making"
img={require('../../../assets/Images/arrowback.png')}
/>
<ScrollView style={{marginBottom:7}}>
    <Text style={styles.textt}>Education</Text>
<InputText
txt="Degree/Diploma"
/>
<InputText
txt="Institution Name"
/>
<InputText
txt="Location"
/>
<InputText
txt="Graduation Year"
/>
<Text style={styles.textt}>Work Experience</Text>
<InputText
txt="Job Title"
/>
<InputText
txt="Company Name "
/>
<InputText
txt="Employment Period"
/>
<InputText
txt="Job Responsibilities/ Achievements"
/>
<Text style={styles.textt}>Skills</Text>
<InputText
txt="Technical Skills"
/>
<InputText
txt="Soft Skills"
/>
<OpacityButton
name="SAVE"
button={{width:250,marginTop:10}}
pressButton={()=>{navigation.navigate('cvthird')}}
/>
</ScrollView>
   </SafeAreaView>
  )
}

export default Cvmakesecond

const styles = StyleSheet.create({
    textt:{
        fontFamily:'Montserrat-Bold',fontSize:17,color:'#000000',marginLeft:15
    }
})
