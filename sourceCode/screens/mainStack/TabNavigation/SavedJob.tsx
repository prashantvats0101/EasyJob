import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constant';
import {CommonText} from '../../../components';
import ImgButton from '../../../components/ImgButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import apiName, {BASEURL} from '../../../Api/apiName';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {Show_Toast} from '../../../utils/helper';
import Loaderr from '../../allScreens/StartingScreens/Loaderr';
import {setLikedJobdata, setLoading} from '../../../Redux/reducer';

const SavedJob = () => {
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  const dispatch = useDispatch();
  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);

  const [jobpostdata, setjobpostdata] = useState([]);
  const navigation = useNavigation();
  const [load, setLoad] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      // dispatch(setLoading(true));
      getlikedJobs();
    }, []),
  );

  const getlikedJobs = async () => {
    const url = `${BASEURL}${apiName.GET_LIKED_JOBS}`;
    const token = HeaderToken;
    // console.log(token,"asdfghjkl====")
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(response?.data?.data, '<======like');
      setLoad(false);
      const likedJobData = response?.data?.data;
      setjobpostdata(likedJobData.reverse());
      dispatch(setLikedJobdata(likedJobData));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error, 'error=>>>');
    }
  };

  // Like Unlike APi =
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
      getlikedJobs();
        // console.log(response?.data?.data,"resssss=====")
      Show_Toast('success', response?.data?.message);
    } catch (error) {}
  };

  const isTextOverflowing = text => {
    const threeLinesHeight = 3 * 20;
    
    return text.split('\n').length * 20 > threeLinesHeight;
  };

  const renderItem2 = ({item, index}: any) => {
    
    const jobIddd = item?.jobId?._id;
    if (!item?.jobId) {
     
      return null;
    }
    return (
      <View style={styles.job_card}>
        <View style={styles.job_header_view}>
          <Image style={styles.job_logo} source={{uri: `${item?.jobId?.image}`}} />
          <View style={{width: '60%'}}>
            <CommonText numberOfLines={1}>
              {' '}
              {item?.jobId?.userId?.companyName}
            </CommonText>
            <CommonText numberOfLines={1}> {item?.jobId?.address}</CommonText>
          </View>
          <TouchableOpacity 
          // style={styles.heart_view}
          onPress={() => {
            PostLikeJob(jobIddd);
          }}
          >
            {/* heart_blue */}
            <Image   style={{tintColor:item.likedUsers ? 'red' : 'grey',height:33,width:33}}
              source={require('../../../assets/Images/Heart.png')} />
          </TouchableOpacity>
        </View>

        <CommonText numberOfLines={1} style={styles.job_name_txt}>
          {item.jobId?.jobName}
        </CommonText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CommonText
            style={[styles.jobtype_style, {maxWidth: '70%'}]}
            numberOfLines={1}>
            {item.jobId?.jobType}
          </CommonText>
          <CommonText style={styles.jobtype_style}>
            {'- ' + item.jobId?.availablity}
          </CommonText>
        </View>
        <View style={{flexDirection: 'row', marginVertical: '5%'}}>
          <CommonText
            style={{width: item.jobId?.jobDescriptions.length > 300 ? '90%' : '100%'}}
            numberOfLines={3}>
            {item.jobId?.jobDescriptions}
          </CommonText>
          {isTextOverflowing(item.jobId?.jobDescriptions) && (
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
            {'₹' + item?.jobId?.startingSalary + '-' + '₹' + item?.jobId?.maximumSalary}
          </CommonText>
          <TouchableOpacity
            onPress={() => navigation.navigate('JobDetail', {alldata: item?.jobId})}
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F7FC',paddingHorizontal:10}}>
      {isLoading ? (
        <Loaderr />
      ) : (
        <View style={{flex: 1, marginTop: 10}}>
          <FlatList
            data={jobpostdata}
            renderItem={renderItem2}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.key}
            ListEmptyComponent={() =>
              !load && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 540,
                  }}>
                  <Image
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
                    No Saved Job found
                  </CommonText>
                </View>
              )
            }
          />
        </View>
      )}

      {/* </View> */}
    </SafeAreaView>
  );
};

export default SavedJob;

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

})
