import { Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, FlatList, Button, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import HeaderComp from '../../../components/HeaderComp';
import { Colors } from '../../../constant';
import { CommonText, OpacityButton } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginuser, setProfiledata, setcampanyProfiledata } from '../../../Redux/cookiesReducer';
import Strings from '../../../utils/strings';
import apiName, { BASEURL } from '../../../Api/apiName';
import { setLoading } from '../../../Redux/reducer';
import axios from 'axios';

const Setting = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false)

    const HeaderToken = useSelector<any>(
      state => state?.cookies?.loginUser.data?.token,
    );
    const navigation = useNavigation()
    const dispatch =useDispatch()
const onlogout=()=>{
       dispatch(setLoginuser({}))
       dispatch(setProfiledata({}))
       dispatch(setcampanyProfiledata({}))
    // navigation.navigate('Login')
    navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });

}

const handleOpenModal = () => {
    setModalOpen(false);
  };


  const DeleteProfile = async () => {
  dispatch(setLoading(true))
    try {
      const token = HeaderToken;
      const apiUrl = `${BASEURL}${apiName.USER_DELETE}`;
  
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: token,
        },
      });
  
      console.log('profile deleted successfully:', response.data);
      setdeleteModal(false)
      onlogout()
      dispatch(setLoading(false))
 
  
    } catch (error) {
      console.error('Error deleting job profile:', error);
      dispatch(setLoading(false))
    }
  };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <HeaderComp
                style={{ marginTop: 20 }}
                txt="Setting"
                img={require('../../../assets/Images/arrowback.png')}
            />
            <View style={styles.LanguageView}>
                <CommonText style={styles.langtxt}>Language</CommonText>
                <View style={styles.langbuttonview}>
                    {/* <TouchableOpacity style={styles.langbutton}>
                        <CommonText>First Language</CommonText>
                        <Image source={require('../../../assets/Images/Vectorr.png')} style={{ tintColor: '#898A8D' }} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.langbutton}>
                        <CommonText>Subscription</CommonText>
                        <Image source={require('../../../assets/Images/Vectorr.png')} style={{ tintColor: '#898A8D' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.othermainview}>
                <CommonText style={styles.langtxt}>Other Settings</CommonText>
                <View style={styles.othersecondview}>
               
                    <View style={[styles.otherbuttons,]}>
                        <CommonText>Notification</CommonText>
                        <TouchableOpacity>
                        <Image source={require('../../../assets/Images/Switch.png')} style={{ tintColor: '#898A8D' }} />
                        </TouchableOpacity>
                    </View>
                  
                    <TouchableOpacity style={styles.otherbuttons}>
                        <CommonText>Privacy Policy </CommonText>
                        <Image source={require('../../../assets/Images/Vectorr.png')} style={{ tintColor: '#898A8D' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.otherbuttons}>
                        <CommonText>Terms and Condition</CommonText>
                        <Image source={require('../../../assets/Images/Vectorr.png')} style={{ tintColor: '#898A8D' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.otherbuttons}>
                        <CommonText>App Info</CommonText>
                        <Image source={require('../../../assets/Images/Vectorr.png')} style={{ tintColor: '#898A8D' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.otherbuttons} onPress={()=>{setModalOpen(true)}}>
                        <CommonText>Logout</CommonText>
                        <Image source={require('../../../assets/Images/Vectorr.png')} style={{ tintColor: '#898A8D' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.otherbuttons} onPress={()=>{setdeleteModal(true)}}>
                        <CommonText style={{color:'red'}}>Delete Account</CommonText>
                        <Image source={require('../../../assets/Images/Vectorr.png')} style={{ tintColor: '#898A8D' }} />
                    </TouchableOpacity>
                </View>
            </View>
             <Modal
        visible={modalOpen}
        // animationType="slide"
        transparent
        onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalmainview}>
          <View style={styles.modaldataview}>
            <CommonText style={{fontSize:20,fontWeight:'bold',marginTop:30,alignSelf:'center', textAlign: 'center',}}>{Strings.Sure_Logout}</CommonText>
            <View style={{justifyContent:'space-between', width: '100%',flexDirection:'row',paddingHorizontal:15,marginTop:20}}>
              <OpacityButton
                name="NO"
                button={{width: "45%", backgroundColor: Colors.inputbackground,}}
                btnTextStyle={{color:'black'}}
                pressButton={() => handleOpenModal()}
              />
              <View style={{width:"10%",}}/>
              <OpacityButton
                name="YES"
                button={{width: "45%"}}
                pressButton={()=>{onlogout()}}
              />
            </View>
            
          </View>
        </View>
      </Modal>
      <Modal
        visible={deleteModal}
        // animationType="slide"
        transparent
       >
        <View style={styles.modalmainview}>
          <View style={styles.modaldataview}>
            <CommonText style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Are You Sure To Delete Your </CommonText>
            <CommonText style={{fontSize:20,fontWeight:'bold',marginTop:7}}> Account</CommonText>

            <View style={{justifyContent: 'space-between', width: '100%',flexDirection:'row',paddingHorizontal:15,marginTop:0}}>
              <OpacityButton
                name="NO"
                button={{width: "45%", backgroundColor: Colors.inputbackground,}}
                btnTextStyle={{color:'black'}}
                pressButton={() => setdeleteModal(false)}
              />
               <View style={{width:"10%",}}/>
              <OpacityButton
                name="YES"
                button={{width: "45%",}}
                pressButton={()=>{DeleteProfile()}}
              />
            </View>
            
          </View>
        </View>
      </Modal>
        </SafeAreaView>
    )
}

export default Setting

const styles = StyleSheet.create({
    modalmainview: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,width:'100%',
        backgroundColor:'rgba(2,2,3,0.7)'
      },
      modaldataview: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 250,
        width: '87%',
        borderRadius: 10,
        alignSelf: 'center',paddingVertical:40
      },
    LanguageView: { width: '80%', height: 110, borderWidth: 1, borderColor: '#DADADA', alignSelf: 'center', marginTop: 20, padding: 13, borderRadius: 6 },
    langtxt: { fontSize: 12, fontFamily: 'Poppins-Medium', color: '#898A8D' },
    langbutton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    langbuttonview: { height: '90%', paddingHorizontal: 10, justifyContent: 'space-between', paddingVertical: 20, paddingBottom: 30 },
    othermainview: { width: '80%', height: 410, borderWidth: 1, borderColor: '#DADADA', alignSelf: 'center', marginTop: 20, padding: 13, borderRadius: 6 },
    othersecondview: { paddingHorizontal: 10 ,paddingVertical: 10, },
    otherbuttons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,marginVertical:15,height:30},

})