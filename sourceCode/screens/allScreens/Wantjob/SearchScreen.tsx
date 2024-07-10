import {
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {CommonText} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import apiName, { BASEURL } from '../../../Api/apiName';
import { Show_Toast } from '../../../utils/helper';

const SearchScreen = ({route}) => {
  const { searchText } = route.params || { searchText: '' };
  useEffect(() => {
    searchapi();
  }, []);

  const [searchinput, setsearchinput] = useState(searchText || '');
  const [searchedData, setsearchedData] = useState([]);

  const navigation = useNavigation();
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  // console.log(HeaderToken,"helloo==========>")

  const searchapi = async () => {
    // console.log('searchapi===')
    try {
      const responese = await axios.get(
        `http://43.205.55.71:3000/api/job/get-All-jobs?search=${searchinput}`,
        {
          headers: {
            Authorization: HeaderToken,
          },
        },
      );
      // console.log(responese?.data?.data, 'helloooo===');
      setsearchedData(responese?.data?.data);
    } catch (error) {}
  };

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
      searchapi()
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
            }} >
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
  const handleSearch = () => {
    searchapi();
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  useEffect(() => {
   
    if (searchinput === '') {
      searchapi(); 
    }
  }, [searchinput]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white, padding: 10}}>
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt={searchText.trim() !== '' ? "Search" : "All Jobs"}
        style={{marginTop: 1}}
      />
      {/* Filter_Icon */}
      <View style={{paddingVertical: 5, backgroundColor: '#ffff'}}>
        <View style={styles.search_field_parent_view}>
          <View style={styles.textinput_view}>
            <Image
              style={styles.blue_search}
              resizeMode="contain"
              source={require('../../../assets/Images/search_blue.png')}
            />
            <TextInput
              placeholder="Search..."
              placeholderTextColor={'#637763'}
              style={styles.input}
              value={searchinput}
              onChangeText={text => setsearchinput(text)}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('filter')}}
            >
              <Image  source={require('../../../assets/Images/Filter_Icon.png')}
              style={{height:20,width:20}}
              resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.searchbutton_view}
            onPress={
              handleSearch
            }>
            <Image
              source={require('../../../assets/Images/search_white.png')}
            />
            <CommonText style={styles.search_txt}>Search</CommonText>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={searchedData}
        renderItem={renderItem2}
        keyExtractor={item => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
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
    width: '85%',
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
  jobtype_style: {fontSize: 12, fontFamily: 'Poppins-Medium', color: '#637763'},
  job_name_txt: {
    marginTop: '9%',
    marginBottom: '3%',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
});
