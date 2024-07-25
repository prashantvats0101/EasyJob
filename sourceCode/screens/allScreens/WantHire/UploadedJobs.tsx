

import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from '../../../constant';
import {useDispatch, useSelector} from 'react-redux';
import {CommonText, OpacityButton} from '../../../components';
import apiName, {BASEURL} from '../../../Api/apiName';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {setProfiledata, setcampanyProfiledata} from '../../../Redux/cookiesReducer';
import {Show_Toast, onclickHandler} from '../../../utils/helper';
import {
  setLikedJobdata,
  setLoading,
  setgetJobDetail,
} from '../../../Redux/reducer';

const UploadedJob = () => {
  const [bannerimage, setbannerimage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jobData, setJobData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [load, setLoad] = useState(true);

  const dispatch = useDispatch();

  const datafromredux = useSelector<any>(
    state => state?.cookies?.campanyprofiledata,
  );
  const campanynamee = datafromredux?.companyName;
  const imagee = `${datafromredux?.companyLogo}`;
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Exit App', 'Do you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => {
        backHandler.remove();
        console.log('Listener removed');
      };
    }, []),
  );
  const fetchprofile = async () => {
    // dispatch(setLoading(true));
    const n = `${BASEURL}${apiName.GET_PROFILE_DATA}`;
    try {
      const token = HeaderToken;
      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });
      let x = response?.data?.data?.getCompanyProviderProfile;
      dispatch(setcampanyProfiledata(x));
      // console.log(x,"djdjdj")
      setUserData(x);

      //  console.log(x,"<<<<<<<<<=======")

      //   dispatch(setLoading(false));
    } catch (error) {
      // dispatch(setLoading(false));

      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteModal = itemId => {
    setDeleteItemId(itemId);
    setModalOpen(true);
    // console.log(itemId,"idd")
  };
  const DeleteJob = async () => {
    if (!deleteItemId) return;
    dispatch(setLoading(true));
    try {
      const token = HeaderToken;
      const apiUrl = `${BASEURL}${apiName.DELETE_UPLOADED_JOB}${deleteItemId}`;

      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: token,
        },
      });
      fetchData();
      console.log('Job profile deleted successfully:', response.data);
      setModalOpen(false);
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error deleting job profile:', error);
      dispatch(setLoading(false));
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      setSearchText('')
    }, [navigation]),
  );
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );

  const fetchData = async () => {
    //  dispatch(setLoading(true));
    const n = `${BASEURL}${apiName.CAMAPANY_POSTED_JOB}`;
    try {
      const token = HeaderToken;
      // console.log(token,"====")
      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });
      let x = response?.data?.data;
      setJobData(x);
      setLoad(false);
      // console.log(x,"====x")
      dispatch(setgetJobDetail(x));

      //  dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerimage?.length;
      flatListRef?.current?.scrollToIndex({index: nextIndex});
      setCurrentIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, flatListRef, bannerimage]);

  const renderIndicator = index => (
    <View
      key={index}
      style={{
        width: currentIndex === index ? 19 : 8,
        height: 4,
        borderRadius: 4,
        backgroundColor:
          currentIndex === index ? 'blue' : 'rgba(210, 210, 210, 1)',
        marginHorizontal: 2,
      }}
    />
  );
  useFocusEffect(
    React.useCallback(() => {
      fetchprofile();
      getBannar();
    }, []),
  );
  const getBannar = async () => {
    try {
      const response = await axios.get(`${BASEURL}${apiName.GET_BANNER}`);
      // console.log(response.data?.data[0].image,"data==========")
      setbannerimage(response.data?.data);
    } catch (error) {
      console.log(error, '<<===error aagya');
    }
  };
  const deviceWidth = Dimensions.get('window').width;

  const isTextOverflowing = text => {
    const threeLinesHeight = 3 * 20;
    // console.log(threeLinesHeight, 'threeLinesHeight===>');
    return text.split('\n').length * 20 > threeLinesHeight;
  };

  const {fun} = onclickHandler();

  const renderItem2 = ({item, index}: any) => {
    return (
      <View
        style={styles.job_card}
       >
        <View style={styles.job_header_view}>
          <Image style={styles.job_logo} source={{uri: `${item.image}`}} />
          <View style={{width: '58%', }}>
            <CommonText numberOfLines={1}>
              {' '}
              {campanynamee}
            </CommonText>
            <CommonText numberOfLines={1}> {item.address}</CommonText>
          </View>
          <View style={[styles.heart_view]}>
            <TouchableOpacity
              style={styles.delete_icon}
              onPress={() => {
                handleDeleteModal(item._id);
              }}
              >
              <Image
                source={require('../../../assets/Images/DeleteJob.png')}
                resizeMode='contain'
                style={{height: 15, width: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delete_icon}
              onPress={() => fun(item, 'Edit')}>
              <Image
                source={require('../../../assets/Images/EditJob.png')}
                resizeMode='contain'
                style={{height: 15, width: 15}}
              />
            </TouchableOpacity>
          </View>
         
        </View>
<TouchableOpacity  onPress={() => {
          fun(item, 'Detail');
        }}>
        <CommonText numberOfLines={1} style={styles.job_name_txt}>
          {item.jobName}
        </CommonText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CommonText
            style={[styles.jobtype_style, {maxWidth: '70%'}]}
            numberOfLines={1}>
            {item.jobType}
          </CommonText>
          <CommonText style={styles.jobtype_style}>
            {'- ' + item.availablity}
          </CommonText>
        </View>
        <View style={{flexDirection: 'row', marginVertical: '5%'}}>
          <CommonText
            style={{width: item.jobDescriptions.length > 300 ? '90%' : '100%'}}
            numberOfLines={3}>
            {item.jobDescriptions}
          </CommonText>
          {isTextOverflowing(item.jobDescriptions) && (
            <CommonText
              style={{
                color: Colors.Bluebg,
                position: 'absolute',
                bottom: 0,
                right: 5,
                backgroundColor: 'white',
              }}
              onPress={() => console.log('Read More button clicked')}>
              <CommonText>...</CommonText>
              Learn More
            </CommonText>
          )}
        </View>
        <View
          style={{
            height: 40,
            marginTop: '3%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CommonText style={{maxWidth: '63%', fontSize: 14, color: '#637763'}}>
            {' '}
            {'₹' + item?.startingSalary + '-' + '₹' + item?.maximumSalary}
          </CommonText>
        </View>
        </TouchableOpacity>
      </View>
    );
  };
  // const handleSearch = () => {
  //   if (searchText.trim() !== '') {
  //     navigation.navigate('SearchScreen', { searchText: searchText });

  //   } else {
  //     console.warn('please add value for search');
  //   }
  // };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff', }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={styles.header_parent_view}>
        <View style={styles.username_view}>
          <Image source={{uri: imagee}} style={styles.profilepic} />
          <CommonText style={styles.username_txt_style} numberOfLines={2}>
            {'Hi ' + campanynamee}
          </CommonText>
        </View>
        <View style={styles.two_button_view}>
          <TouchableOpacity
            style={styles.message_button_view}
            onPress={() => {
              navigation.navigate('Message');
            }}>
            <Image source={require('../../../assets/Images/smsIcon.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notification');
            }}
            style={[styles.message_button_view, {marginLeft: '15%'}]}>
            <Image
              source={require('../../../assets/Images/notification.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
     
        <View style={[styles.flatlistmainview, {width: deviceWidth}]}>
          <FlatList
            ref={flatListRef}
            data={bannerimage}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatlistContentContainer}
            onScroll={event => {
              const {contentOffset} = event.nativeEvent;
              const index = Math.floor(
                contentOffset.x / event.nativeEvent.layoutMeasurement.width,
              );
              setCurrentIndex(index);
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.itemrenderview, {width: deviceWidth}]}>
                <Image
                  resizeMode="stretch"
                  source={{uri: item.image}}
                  style={styles.imagee}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.toString()}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            {bannerimage.map((_, index) => renderIndicator(index))}
          </View>
        </View>
<View style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CommonText style={styles.explore_by_txt}>
            Uploaded{' '}
            <CommonText style={[styles.explore_by_txt, {color: Colors.Bluebg}]}>
              Jobs
            </CommonText>
          </CommonText>
          {/* <TouchableOpacity style={styles.show_all_view}>
            <CommonText style={styles.show_all_txtt}>Show All </CommonText>
            <Image source={require('../../../assets/Images/blue_arrow.png')} />
          </TouchableOpacity> */}
        </View>
        <FlatList
          data={jobData}
          renderItem={renderItem2}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() =>
            !load && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 340,
                }}>
                {/* <Image
                  source={require('../../../assets/Images/Illustrasi.png')}
                  resizeMode="contain"
                  style={{height: 177, width: 157}}
                />
                <CommonText
                  style={{
                    fontFamily: 'OpenSans-Bold',
                    fontSize: 16,
                    color: '#1D1D1D',
                    marginTop: 30,
                  }}>
                  No Uploaded Job found
                </CommonText> */}
                <TouchableOpacity style={styles.add_button}
                onPress={()=>{navigation.navigate('PostJob')}}
                >
                  <Image source={require('../../../assets/Images/plusss.png')} style={{height:20,width:20,marginRight:10}} />
                  <CommonText style={{fontSize:18,color:Colors.white,fontFamily:'Poppins-Bold',marginTop:3}}>Add Job</CommonText>
                </TouchableOpacity>
              </View>
            )
          }
        />
        </View>
      </ScrollView>
      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
    <View style={styles.modalmainview}>
          <View style={styles.modaldataview}>
          <Image source={require('../../../assets/Images/Deleted.png')} style={styles.deleteimg} />
            <CommonText style={{fontSize:20,fontWeight:'bold',marginTop:20}}>Are you sure you want to delete</CommonText>
            <CommonText style={{fontSize:20,fontWeight:'bold',marginTop:3}}>the job post from the</CommonText>
            <CommonText style={{fontSize:20,fontWeight:'bold',marginTop:2}}> platform ?</CommonText>
            <View style={{justifyContent: 'space-between', width: '100%',flexDirection:'row',paddingHorizontal:15,marginTop:0}}>
              <OpacityButton
                name="NO"
                button={{width: "45%", backgroundColor: Colors.inputbackground,}}
                btnTextStyle={{color:'black'}}
                pressButton={() => setModalOpen(false)}
              />
               <View style={{width:"10%",}}/>
              <OpacityButton
                name="YES"
                button={{width: "45%",}}
                pressButton={() => DeleteJob()}
              />
            </View>

          </View>
        </View>
        </Modal>
    </SafeAreaView>
  );
};
export default UploadedJob;

const styles = StyleSheet.create({
  add_button:{paddingVertical:5,paddingHorizontal:15,borderRadius:10,backgroundColor:Colors.Bluebg,justifyContent:'center',alignItems:'center',flexDirection:'row'},
  deleteimg: {height: 144, width: 144, alignSelf: 'center'},
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
    // height: 280,
    width: '87%',
    borderRadius: 10,
    alignSelf: 'center',paddingVertical:1
  },
  delete_icon:{
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Bluebg,
    borderRadius: 10,
  },
  jobtype_style: {fontSize: 12, fontFamily: 'Poppins-Medium', color: '#637763'},
  job_name_txt: {
    marginTop: '9%',
    marginBottom: '3%',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  heart_view: {
    flexDirection: 'row',
    height: 40,
    width: '22%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  },
  job_logo: {height: 58, width: 58, borderRadius: 7},
  job_header_view: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  job_card: {
    marginVertical: '3%',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    width: '99%',
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },

  show_all_txtt: {fontSize: 10, color: '#637763', marginRight: 5},
  show_all_view: {
    height: 30,
    width: 104,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: '#fff',
  },

  popular_card: {
    flexDirection: 'row',
    height: 43,
    marginVertical: '2%',
    alignItems: 'center',
  },
  image_background: {
    backgroundColor: '#6377631A',
    height: 43,
    width: 43,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
  },
  explore_by_txt: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginVertical: '5%',
  },
  imagee: {width: '100%', height: '100%', alignSelf: 'center'},

  flatlistContentContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  flatlistmainview: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 5,
    marginTop:20
  },
  lines_suggestions: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    textAlign: 'center',
  },
  Suggestion_txt: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    textAlign: 'center',
  },
  search_txt: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },
  searchbutton_view: {
    height: 40,
    backgroundColor: Colors.Bluebg,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    width: '90%',
    marginLeft: '3%',
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: '#63776333',color:Colors.blacktxt
  },
  blue_search: {height: 15, width: 15},
  textinput_view: {flexDirection: 'row', alignItems: 'center', marginTop: '4%'},
  search_field_parent_view: {
    backgroundColor: '#fff',
    height: 150,
    marginVertical: '4%',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '99.5%',
    alignSelf: 'center',
    elevation: 4,
  },
  get_platform_txt: {
    textAlign: 'center',
    fontSize: 8,
    fontFamily: 'Poppins-Medium',
    color: '#637763',
  },
  jobs_txt: {
    textAlign: 'center',
    marginVertical: '3%',
    color: Colors.Bluebg,
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
  },
  explore_more_txt: {
    textAlign: 'center',
    marginTop: '3%',
    color: Colors.txtcolor,
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
  },
  Discover_your_txt: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginTop: '7%',
    color: Colors.txtcolor,
  },
  Easy_job: {fontSize: 12, fontFamily: 'Montserrat-Bold', color: Colors.Bluebg},
  message_button_view: {
    height: 32,
    width: 32,
    borderRadius: 10,
    backgroundColor: '#3DB2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  two_button_view: {
    // borderWidth: 1,
    // borderColor: 'red',
    height: '100%',
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  username_view: {flexDirection: 'row', width: '75%',alignItems:'center'},
  username_txt_style: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#3DB2FF',
    marginLeft: '3%',
    width: '78%',
  },
  profilepic: {
    width: 51,
    height: 51,
    borderRadius: 40,
  },
  header_parent_view: {
    paddingHorizontal: 10,
    height: 60,
    width: '100%',
    // borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
