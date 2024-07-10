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
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import HeaderComp from '../../../components/HeaderComp';
import {Colors} from '../../../constant';
import {CommonText, OpacityButton} from '../../../components';
import {useSelector} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import apiName, { BASEURL } from '../../../Api/apiName';
import axios from 'axios';

const JobDetailPost = () => {
  const name = useSelector<any>(state => state?.cookies?.loginUser);
  const campanyname =
    name?.data?.createCompany?.companyName ??
    name?.data?.findUserId?.companyName;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [applyedData, setApplyedData] = useState('')
  const [isModalVisiblet, setIsModalVisiblet] = useState(false);
  const [applyselectedImageUri, setapplySelectedImageUrit] = useState('');
  const itemDetail = useSelector(store => store?.sliceReducer?.itemDetail);
  // console.log(itemDetail?._id,"item===")
  let a = itemDetail.updatedAt;
  const createdAt = new Date(a);
  // console.log(itemDetail,"itemDetail=====>")
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );

  const handleImagePress = imageUri => {
    setSelectedImageUri(imageUri);
    setIsModalVisible(true);
  };

const handleImagePressapplyes = imageuri =>{
  setapplySelectedImageUrit(imageuri)
  setIsModalVisiblet(true)
}
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

  useEffect(() => {
    getApplyedUser(); 
  }, []);

  const getApplyedUser =async()=>{
    const n = `${BASEURL}${apiName.GET_APPYLED_JOB_USER}${itemDetail?._id}`
    try {
      const token = HeaderToken;
      const response = await axios.get(n,{
        headers: {
          Authorization: token,
        },
      });
      let x = response?.data?.data
      setApplyedData(x)
      // console.log(x,"resp====")
    } catch (error) {
      console.log(error,"error==>>")
    }
  }

  const reversedData = [...applyedData].reverse();

  const renderItem2 = ({item}) => {
    //  console.log(item,"<=======")
    return (
   <View style={styles.appliedProfiles}>
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={() => handleImagePressapplyes(item.userId.image)}>
          <Image
            source={{uri:`${item.userId.image}`}}
            resizeMode='cover'
            style={{height: 58, width: 58,borderRadius:50}}
          />
          </TouchableOpacity>
          <View style={{width:'70%',justifyContent:'center'}}>
          <Text style={styles.username} numberOfLines={1} >{item.userId.name}</Text>
          </View>
          </View>
          <Image
            style={styles.pdfimg}
            resizeMode="contain"
            source={require('../../../assets/Images/pdff.png')}
          />
           <Modal
        visible={isModalVisiblet}
        transparent={true}
        onRequestClose={() => setIsModalVisiblet(false)}>
        <View style={{flex: 1}}>
          <ImageViewer
          imageUrls={[{ url: applyselectedImageUri }]}
            enableSwipeDown={true}
            onSwipeDown={() => setIsModalVisiblet(false)}
            renderIndicator={renderIndicator}
            style={{backgroundColor: 'black'}}
          />
        </View>
      </Modal>
        </View> 
    )
  }

  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: Colors.white}}>
      <StatusBar backgroundColor={Colors.white} />
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt="Job Details"
        style={{marginBottom: 15}}
        // img2={require('../../../assets/Images/ediiit.png')}
        img2styl={styles.img22}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={{flex: 1}}>
          <ImageViewer
            imageUrls={[
              {url: `${itemDetail.image}`},
            ]}
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
          <TouchableOpacity onPress={handleImagePress} style={{}}>
            <Image
              source={{
                uri: `${itemDetail.image}`,
              }}
              // resizeMode="contain"
              style={styles.companylogo}
            />
          </TouchableOpacity>
          <CommonText style={styles.jobname}>{itemDetail.jobName}</CommonText>
          <CommonText style={styles.campanyname}>{campanyname}</CommonText>
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
              {itemDetail.totalNumberOfStaff}
            </CommonText>
          </View>
        </View>

    
        

<View style={[styles.jobtypeview]}>
<View style={{  width:'49%'}}>
            <CommonText style={styles.jobtypetxt}>JOB TYPE</CommonText>
            <CommonText style={{maxWidth: 150}}> {itemDetail.jobType}</CommonText>
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
                {itemDetail?.subCategory}
              </CommonText>
            </View>
          </View>
        </View>

        <View style={[styles.jobtypeview, {justifyContent: 'space-between'}]}>
          <View style={{}}>
            <CommonText style={styles.jobtypetxt}>SALARY RANGE</CommonText>
            <CommonText>
               {'Rs' +
                itemDetail.startingSalary +
                '-' +
                'Rs' +
                itemDetail.maximumSalary}
            </CommonText>
          </View>
          <View style={{marginLeft: 6}}>
            <CommonText style={styles.jobtypetxt}> EXPERIENCE</CommonText>
            <CommonText>
              {' '}
              {itemDetail.minimumExperience +
                '-' +
                itemDetail.maximumExperience +
                '/Years'}
            </CommonText>
          </View>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>EDUCATION</CommonText>
          <CommonText>{itemDetail.education}</CommonText>
        </View>
        <View style={[styles.joblocationview]}>
          <CommonText style={styles.jobtypetxt}>JOB LOCATION</CommonText>
          <CommonText>{itemDetail.address}</CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>GENDER OF THE STAFF</CommonText>
          <CommonText>{itemDetail.genderOfStaffShouldBe}</CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>
            CANDIDATE'S ENGLISH SPEAKING SKILL SHOULD BE
          </CommonText>
          <CommonText>{itemDetail.candidateSpeakingSkillShouldBe}</CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>
            IS IT WORK FROM HOME JOB
          </CommonText>
          <CommonText>{itemDetail.isWorkFromHome ? 'Yes' : 'No'}</CommonText>
        </View>
        <View style={styles.joblocationview}>
          <CommonText style={styles.jobtypetxt}>SKILLS</CommonText>
          <CommonText>{itemDetail.suggestedSkills.join(',')}</CommonText>
        </View>
        <CommonText style={styles.jobdescri}>Job Description</CommonText>
        <CommonText style={{fontSize: 11}}>
          {itemDetail.jobDescriptions}
        </CommonText>
        <CommonText style={styles.Appliedtxt}>
          Applied User for this job{' '}
        </CommonText>
        <FlatList
                    data={reversedData}
                    renderItem={renderItem2}
                    keyExtractor={(item) => item.key}
                />
         
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailPost;

const styles = StyleSheet.create({
  img22: {
    alignSelf: 'center',
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
  },
  pdfimg: {height: 26, width: 26, },
  username: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 15,
    marginLeft: 10,
  },
  appliedProfiles: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',justifyContent:'space-between'
  },
  Appliedtxt: {marginVertical: 15, fontFamily: 'Montserrat-Bold'},
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
