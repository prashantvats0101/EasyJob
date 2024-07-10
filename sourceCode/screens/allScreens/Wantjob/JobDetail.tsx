import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import HeaderComp from '../../../components/HeaderComp';
import {Colors} from '../../../constant';
import {CommonText, OpacityButton} from '../../../components';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios, {all} from 'axios';
import apiName, {BASEURL} from '../../../Api/apiName';
import {useSelector} from 'react-redux';
import {Show_Toast} from '../../../utils/helper';
const JobDetail = ({route}) => {
  const {alldata} = route.params;
  // console.log(alldata?._id,"jjjjj======")
  const educcation = alldata?.education;
  const jobtype = alldata?.jobType;
  // const companyNamee = alldata?.companyName
  const jobNamee = alldata?.jobName;
  const genderOfStaffShouldBee = alldata?.genderOfStaffShouldBe;
  const minexp = alldata?.minimumExperience;
  const maxexp = alldata?.maximumExperience;
  const minSalary = alldata?.startingSalary;
  const maxSalary = alldata?.maximumSalary;
  const totalstaff = alldata?.totalNumberOfStaff;
  const workHome = alldata?.isWorkFromHome;
  const addresss = alldata?.address;
  const campanynamee = alldata?.userId?.companyName;
  const skilll = alldata?.suggestedSkills.join(',');
  const Descriptionn = alldata?.jobDescriptions;
  const englishspeak = alldata?.candidateSpeakingSkillShouldBe;
  const subCategory = alldata?.subCategory
  const Report = alldata?.isReported
  // console.log(Report,'====aaaa=====')

 

  const createdAt = new Date(alldata?.createdAt);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [isLiked, setIsLiked] = useState(alldata?.likedUsers);
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  // console.log(alldata?.applyUsers,"=========>");
  // const likeee = useSelector<any>(state => state?.sliceReducer?.likedjobdata);
  // console.log(likeee[0].jobId?.likedUsers,"ajay=====")
  const handleImagePress = imageUri => {
    setSelectedImageUri(imageUri);
    setIsModalVisible(true);
  };

  // Format the creation date
  const formattedDate = `Posted on ${createdAt.getDate()} ${getMonthName(
    createdAt.getMonth(),
  )}`;

  function getMonthName(monthIndex) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthIndex];
  }

  const navigation = useNavigation();
  const renderIndicator = (currentIndex, allSize) => {
    return null;
  };



  const PostLikeJob = async () => {
    const url = `${BASEURL}${apiName.LIKE_UNLIKE}`;
    try {
      const token = HeaderToken;
      const data = {
        jobId: alldata?._id,
      };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token,
        },
      });
      setIsLiked(!isLiked)
      // console.log(response?.data?.data,"post_like_api_respones")
      // const likedUsers = response?.data?.data?.likedUsers || [];

      Show_Toast('success', response?.data?.message);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: Colors.white}}>
      <StatusBar backgroundColor={Colors.white} />
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt="Job Details"
        style={{marginBottom: 15}}
        img2={require('../../../assets/Images/Heart.png')}
        pressimg={() => {
          PostLikeJob();
        }}
        imgtwostyle={{tintColor: isLiked ? 'red' : 'grey'}}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={{flex: 1}}>
          <ImageViewer
            imageUrls={[{url: `${selectedImageUri}`}]}
            enableSwipeDown={true}
            onSwipeDown={() => setIsModalVisible(false)}
            renderIndicator={renderIndicator}
            style={{backgroundColor: 'black'}}
          />
        </View>
      </Modal>

      <ScrollView
        style={{flex: 1, paddingHorizontal: 18}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.campanydetailView}>
          {/* <Image source={require('../../../assets/Images/Toptal.png')} style={styles.companylogo} /> */}
          <TouchableOpacity onPress={() => handleImagePress(alldata?.image)}>
            <Image
              source={{
                uri: `${alldata?.image}`,
              }}
              style={styles.companylogo}
            />
          </TouchableOpacity>
          <CommonText style={styles.jobname}>{jobNamee} </CommonText>
          <CommonText style={styles.campanyname}>{campanynamee}</CommonText>
          <CommonText style={styles.posted}>{formattedDate}</CommonText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 20,
              marginTop: 20,
            }}>
            <CommonText style={styles.neededstaff}>
              No of staff I need
            </CommonText>
            <CommonText style={[styles.neededstaff, {fontSize: 17}]}>
              {totalstaff}
            </CommonText>
          </View>
        </View>
        <View style={[styles.jobtypeview]}>
          <View style={{width:'49%'}}>
            <CommonText style={styles.jobtypetxt}>JOB TYPE</CommonText>
            <CommonText>{jobtype}</CommonText>
          </View>
          <View style={{  width:'49%'}}>
            <CommonText style={[styles.jobtypetxt, {alignSelf: 'flex-end'}]}>
            SUB CATEGORY
            </CommonText>
            <View
              style={{  
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <CommonText
              numberOfLines={1}
                style={{
                 
                  fontFamily: 'Poppins-Mediun',
                  color: '#181A1F',
                }}>
                {subCategory}
              </CommonText>
            </View>
          </View>
        </View>
        <View style={styles.jobtypeview}>
        <View style={{width:'55%'}}>
            <CommonText style={styles.jobtypetxt}>SALARY RANGE</CommonText>
            <CommonText>{'Rs' + minSalary + '-' + 'Rs' + maxSalary}</CommonText>
          </View>
          <View style={{alignItems: 'center'}}>
            <CommonText style={styles.jobtypetxt}> EXPERIENCE</CommonText>
            <CommonText>
              {minexp + '-' + maxexp + '/Years'}
              {/* 01-04/Years */}
            </CommonText>
          </View>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>EDUCATION</CommonText>
          <CommonText>{educcation}</CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>JOB LOCATION</CommonText>
          <CommonText>{addresss}</CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>GENDER OF THE STAFF</CommonText>
          <CommonText>{genderOfStaffShouldBee}</CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>
            CANDIDATE'S ENGLISH SPEAKING SKILL SHOULD BE
          </CommonText>
          <CommonText>
            {/* Do not speak english */}
            {englishspeak}
          </CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>
            IS IT WORK FROM HOME JOB
          </CommonText>
          <CommonText>{workHome ? 'Yes' : 'No'}</CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>SKILLS</CommonText>

          <View style={{minHeight: 20, maxHeight: 500}}>
            <CommonText style={{marginBottom: 10}}>{skilll}</CommonText>
          </View>
        </View>
        <CommonText style={styles.jobdescri}>Job Description</CommonText>
        <CommonText style={{fontSize: 11}}>
          {/* Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye?
                    We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you? We're looking for a like-minded */}
          {Descriptionn}
        </CommonText>
        {!Report && (
 <TouchableOpacity
 onPress={() => {
   navigation.navigate('Report', {jobId: alldata?._id});
 }}>
 <CommonText style={styles.reporttxt}>Report</CommonText>
</TouchableOpacity>
        )}
       
        {!alldata?.applyUsers && (
        <OpacityButton
          name="APPLY"
          pressButton={() => {
            navigation.navigate('ApplyNow', {jobId: alldata?._id});
          }}
        />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetail;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1, // Ensure it's above the image
  },

  fullScreenImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    // Add other styles as needed
  },
  companylogo: {height: 64, width: 64, borderRadius: 8},
  campanydetailView: {width: '100%'},
  jobname: {fontSize: 26, color: Colors.jobnametxt, marginTop: 15},
  campanyname: {
    fontFamily: 'Poppins-Medium',
    color: Colors.jobnametxt,
    marginTop: 5,
  },
  posted: {fontFamily: 'Poppins-regular'},
  neededstaff: {fontFamily: 'Montserrat-Bold'},
  jobtypeview: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
  },
  jobtypetxt: {fontFamily: 'Montserrat-Bold', marginBottom: 4},
  joblocationview: {marginTop: 25},
  jobdescri: {
    marginTop: 35,
    marginBottom: 15,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
  },
  reporttxt: {
    marginTop: 20,
    color: Colors.Bluebg,
    fontFamily: 'Montserrat-Bold',
  },
});

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { CommonText } from '../../../components'
// import { useNavigation } from '@react-navigation/native'

// const JobDetail = () => {
//     const navigation = useNavigation()
//     return (
//         <View>
//             <TouchableOpacity onPress={() => {
//                 navigation.navigate("GetStarted");
//                 console.log("hello");
//             }}>
//                 <CommonText>JobDetail</CommonText>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default JobDetail

// const styles = StyleSheet.create({})
