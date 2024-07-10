import { Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, FlatList, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import { CommonText } from '../../../components';
import { useSelector } from 'react-redux';
import axios from 'axios';


const PersnolDetail = () => {
    const [jobprofile, setJobprofile] = useState(null);

    const dataFromRedux = useSelector<any>(state => state?.cookies?.profiledata);


useEffect(() => {
   
    const y = dataFromRedux?.getLoginUserProfile;

    
    setJobprofile(y);
  }, [dataFromRedux]); 


      const formatDate = (dob) => {
        const date = new Date(dob);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[monthIndex];
        return `${day} ${monthName} ${year}`;
      };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>

            <HeaderComp
                style={{ marginTop: 30 ,paddingHorizontal:25,}}
                txt="Personal Details"
                img={require('../../../assets/Images/arrowback.png')}
            />
            <ScrollView>
            <View style={{width:'100%',alignItems:'center',marginTop:15}}>
               
                <View style={styles.dataview}>
                    <View style={styles.imgbackground}>
                        <Image source={require('../../../assets/Images/calendarr.png')} />
                    </View>
                    <CommonText style={styles.detail_txt}>{formatDate(jobprofile?.DOB)}</CommonText>
                </View>
              
                <View style={styles.addressview}>
          <View
            style={{
              height: 32,
              width: 31,
              backgroundColor: Colors.Bluebg,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 15,
            }}>
            <Image source={require('../../../assets/Images/Unionn.png')} />
          </View>
          <View style={{width: '95%', paddingVertical: 20}}>
            <CommonText style={styles.detail_txt}>{jobprofile?.address}</CommonText>
          </View>
        </View>
                <View style={styles.dataview}>
                    <View style={styles.imgbackground}>
                        <Image source={require('../../../assets/Images/job-type.png')} />
                    </View>
                    <CommonText style={styles.detail_txt}>{jobprofile?.jobType}</CommonText>
                </View>
                <View style={styles.dataview}>
                    <View style={styles.imgbackground}>
                        <Image source={require('../../../assets/Images/job-type.png')} />
                    </View>
                    <CommonText style={styles.detail_txt}>{jobprofile?.availability}</CommonText>
                </View>
                <View style={styles.dataview}>
                    <View style={styles.imgbackground}>
                        <Image source={require('../../../assets/Images/exp.png')} />
                    </View>
                    <CommonText style={styles.detail_txt}>{jobprofile?.experience}</CommonText>
                </View>
                <View style={styles.addressview}>
                    <View  style={{
              height: 32,
              width: 31,
              backgroundColor: Colors.Bluebg,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 15,
            }}>
                        <Image source={require('../../../assets/Images/study.png')} />
                    </View>
                    <View 
                    style={{width: '95%', paddingVertical: 20}}
                    >
                    <CommonText style={styles.detail_txt}>{jobprofile?.education}</CommonText>
                    </View>
                </View>
                <View style={styles.dataview}>
                    <View style={styles.imgbackground}>
                        <Image source={require('../../../assets/Images/salary.png')} />
                    </View>
                    <CommonText style={styles.detail_txt}>{jobprofile?.currentSalary ? "Rs " + jobprofile.currentSalary : ""}</CommonText>
                </View>
                
                </View>
                
                </ScrollView>
        </SafeAreaView>
    )
}

export default PersnolDetail

const styles = StyleSheet.create({
    addressview : {
        borderWidth: 1,
        minHeight: 68,
        maxHeight: 300,
        width: '80%',
        borderRadius: 16,
        borderColor: '#E8E8E8',
        flexDirection: 'row',
        // alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 8,
        alignSelf: 'center',
        paddingRight: 24,
      },
    dataview: { borderWidth: 1, height: 68, width: '80%', borderRadius: 16, borderColor: '#E8E8E8', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 8 },
    imgbackground: { height: 32, width: 31, backgroundColor: Colors.Bluebg, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    detail_txt: { color: '#000000', fontFamily: 'Montserrat-Bold', marginLeft: 7 },
    infotxt:{fontFamily:'Montserrat-Bold',color:'#150B3D',marginTop:25},
    txt:{color:'#B8B8B8',marginTop:15}

})