
import {
  Alert,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState, useTransition} from 'react';
import {Colors} from '../../../constant';
import {useDispatch, useSelector} from 'react-redux';
import {CommonText} from '../../../components';
import apiName, {BASEURL} from '../../../Api/apiName';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {setProfiledata} from '../../../Redux/cookiesReducer';
import {Show_Toast} from '../../../utils/helper';
import {setLikedJobdata, setLoading} from '../../../Redux/reducer';
import { useTranslation } from 'react-i18next';

const JobSearch = () => {
  const [bannerimage, setbannerimage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jobData, setJobData] = useState([]);
  const [isLiked, setIsLiked] = useState();
  const [searchText, setSearchText] = useState('');
  const [category, setcategory] = useState('');
  const flatListRef = useRef(null);
  const dataFromRedux = useSelector<any>(state => state?.cookies?.profiledata);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t}=useTranslation();
  const Popular_Category = [
    {
      id: 1,
      imag: require('../../../assets/Images/smsIcon.png'),
      text: 'Accounting & Consulting',
    },
    {
      id: 2,
      imag: require('../../../assets/Images/smsIcon.png'),
      text: 'Admin Support',
    },
    {
      id: 3,
      imag: require('../../../assets/Images/smsIcon.png'),
      text: 'Accounting & Consulting',
    },
    {
      id: 4,
      imag: require('../../../assets/Images/smsIcon.png'),
      text: 'Admin Support',
    },
    {
      id: 5,
      imag: require('../../../assets/Images/smsIcon.png'),
      text: 'Accounting & Consulting',
    },
  ];
console.log(jobData,"-========hello")
  //
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  // console.log(HeaderToken,"<=========")
  const fetchPopularCategory = async () => {
    //  dispatch(setLoading(true));
    const n = `http://13.48.210.251:3000/api/job/get-popular-jobs`;
    try {
      const token = HeaderToken;

      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });
      setcategory(response?.data?.data);
      //  dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
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
  useFocusEffect(
    React.useCallback(() => {
      setSearchText('')
      fetchData();
      fetchPopularCategory();
    }, [navigation]),
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}${apiName.get_all_jobs}${1}&limit=10`,
        {
          headers: {
            Authorization: HeaderToken,
          },
        },
      );
    console.log(response?.data?.data[0],"<<<<<<<<<=======")

      setJobData(response?.data?.data);
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
      console.log(error, '<<===error aagya job seeker');
    }
  };
  const deviceWidth = Dimensions.get('window').width;

  const isTextOverflowing = text => {
    const threeLinesHeight = 3 * 20;
    // console.log(threeLinesHeight, 'threeLinesHeight===>');
    return text.split('\n').length * 20 > threeLinesHeight;
  };

  const PostLikeJob = async jobId => {
    const url = `${BASEURL}${apiName.LIKE_UNLIKE}`;
    try {
      const token = HeaderToken;
      const data = {
        jobId: jobId,
      };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token,
        },
      });

      console.log(response?.data?.data, 'resssss=====');
      Show_Toast('success', response?.data?.message);
      fetchData()
    } catch (error) {
      console.log(error, 'errorrrr=====');
    }
  };

  const renderItem2 = ({item, index}: any) => {
    const jobIddd = item?._id;

    // console.log(item.likedUsers,"hhhh=========")
    return (
      <View style={styles.job_card}>
        <View style={styles.job_header_view}>
          <Image style={styles.job_logo} source={{uri: `${item?.image}`}} />
          <View style={{width: '60%'}}>
            <CommonText numberOfLines={1}>
              {' '}
              {item?.userId?.companyName}
            </CommonText>
            <CommonText numberOfLines={1}> {item.address}</CommonText>
          </View>
          <TouchableOpacity
            // style={styles.heart_view}
            onPress={() => {
              PostLikeJob(jobIddd);
            }}>
            <Image
              style={{tintColor:item.likedUsers ? 'red' : 'grey',height:33,width:33}}
              source={require('../../../assets/Images/Heart.png')}
            />
          </TouchableOpacity>
        </View>

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
          <TouchableOpacity
            onPress={() => navigation.navigate('JobDetail', {alldata: item})}
            style={{
              height: 40,
              width: 97,
              borderWidth: 1,
              borderColor: Colors.Bluebg,
              borderRadius: 30,
              justifyContent: 'center',
            }}>
            <CommonText style={{textAlign: 'center', color: Colors.Bluebg}}>
              Apply
            </CommonText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const fetchprofile = async () => {
    const n = `${BASEURL}${apiName.JOBSEEKER_PROFILE_DATA}`;
    try {
      const token = HeaderToken;
      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });
      // let x = response?.data?.data?.getLoginUserProfile
      let y = response?.data?.data;
      dispatch(setProfiledata(y));

      // console.log(y,"<<<========yy")
    } catch (error) {
      // dispatch(setLoading(false));
      console.error('Error fetching data:', error);
    }
  };
  const renderItem = ({item}: any) => {
    // console.log(item,"asdfghjk=========")
    return (
      <TouchableOpacity style={styles.popular_card}
      onPress={()=>{navigation.navigate('ExploreCategory',{
        itemId: item._id,
        itemName: item.name,
      })}}
      >
        <View style={styles.image_background}>
          <Image
            resizeMode="contain"
            style={{height: 23, width: 23}}
            source={{uri: `${item.icons}`}}
          />
        </View>
        <CommonText style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
          {item.name}
        </CommonText>
      </TouchableOpacity>
    );
  };
  const handleSearch = () => {
    // if (searchText.trim() !== '') {
      navigation.navigate('SearchScreen', { searchText: searchText });

    // } else {
    //   console.warn('please add value for search');
    // }
  };
  // console.log(category,"helloooooooooooooooo")
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff', paddingVertical: 10}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={{paddingHorizontal:10}}>
      <View style={styles.header_parent_view}>
        <View style={styles.username_view}>
          <Image
            source={{
              uri: `${dataFromRedux?.getLoginUserProfile?.image}`,
            }}
            style={styles.profilepic}
          />
          <CommonText style={styles.username_txt_style} numberOfLines={2}>
            {'Hi ' + dataFromRedux?.getLoginUserProfile?.name}
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
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
           <View style={{paddingHorizontal:10}}>
        <CommonText style={styles.Discover_your_txt}>
          {t('Discover Your Dream Job with')}
          <CommonText style={styles.Easy_job}> Easy Job</CommonText>
        </CommonText>
        <CommonText style={styles.explore_more_txt}>
          {t('Explore more than')}
        </CommonText>
        <CommonText style={styles.jobs_txt}>5000+ Jobs</CommonText>
        <CommonText style={styles.get_platform_txt}>
          {t('Great platform for the job seeker that searching for new')}
        </CommonText>
        <CommonText style={styles.get_platform_txt}>
          {t('career heights and passionate about startups.')}
        </CommonText>
        <View style={{paddingVertical: 5, backgroundColor: '#ffff'}}>
          <View style={styles.search_field_parent_view}>
            <View style={styles.textinput_view}>
              <Image
                style={styles.blue_search}
                resizeMode="contain"
                source={require('../../../assets/Images/search_blue.png')}
              />
              <TextInput
                placeholder={t("Search...")}
                placeholderTextColor={'#637763'}
                style={styles.input}
                onChangeText={text => setSearchText(text)}
                value={searchText}
              />
            </View>
            <TouchableOpacity
              style={styles.searchbutton_view}
              onPress={handleSearch}>
              <Image
                source={require('../../../assets/Images/search_white.png')}
              />
              <CommonText style={styles.search_txt}>{t('Search')}</CommonText>
            </TouchableOpacity>
          </View>
        </View>
        {/* <CommonText style={styles.Suggestion_txt}>
          Suggestion:
          <CommonText style={styles.lines_suggestions}>
            Law/Legal, Other, Hospitality/ Travel/
          </CommonText>
        </CommonText>
        <CommonText style={styles.lines_suggestions}>
          Tourism, Design/Creative, Engineer/Architects, Garments/
        </CommonText>
        <CommonText style={styles.lines_suggestions}>
          Textile, IT & Telecommunication, Driving/Motor Technician, etc.
        </CommonText> */}
        </View>
        <View style={[styles.flatlistmainview, {width: deviceWidth}]}>
          <FlatList
            //ref={flatListRef}
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
                  resizeMode='stretch'
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
        <View style={{paddingHorizontal:10}}>
        <CommonText style={styles.explore_by_txt}>
          {t('Explore by')}{' '}
          <CommonText style={[styles.explore_by_txt, {color: Colors.Bluebg}]}>
            {t('Popular Category')}
          </CommonText>
        </CommonText>
        <FlatList
          data={category.slice(0, 5)}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.searchbutton_view} 
        onPress={()=>{navigation.navigate('PopularCategory')}}
        >
          <CommonText style={[styles.search_txt, {marginLeft: 0}]}>
            {t('View All')}
          </CommonText>
        </TouchableOpacity>
        {jobData?.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CommonText style={styles.explore_by_txt}>
            Latest{' '}
            <CommonText style={[styles.explore_by_txt, {color: Colors.Bluebg}]}>
              Employment
            </CommonText>
          </CommonText>
          <TouchableOpacity style={styles.show_all_view}
          onPress={()=>{navigation.navigate('SearchScreen', { searchText: '' })}}
          >
            <CommonText style={styles.show_all_txtt}>Show All </CommonText>
            <Image source={require('../../../assets/Images/blue_arrow.png')} />
          </TouchableOpacity>
        </View>
        ):(null)
      }
        <FlatList
          data={jobData}
          renderItem={renderItem2}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default JobSearch;

const styles = StyleSheet.create({
  jobtype_style: {fontSize: 12, fontFamily: 'Poppins-Medium', color: '#637763'},
  job_name_txt: {
    marginTop: '9%',
    marginBottom: '3%',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  heart_view: {
    backgroundColor: 'rgba(40, 155, 230, 0.5)',
    height: 37,
    width: 37,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: '#63776333',
    color: Colors.blacktxt,
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
    height: 52,
    width: '100%',
    // borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
