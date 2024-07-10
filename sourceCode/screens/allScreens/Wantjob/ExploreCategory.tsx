import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../../../components/HeaderComp'
import { Colors } from '../../../constant'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import { CommonText } from '../../../components'
import { Show_Toast } from '../../../utils/helper'
import apiName, { BASEURL } from '../../../Api/apiName'

const ExploreCategory = ({ route, navigation }: any) => {
  const { itemId, itemName } = route.params;
  const [jobData, setJobData] = useState([]);
  // console.log("ItemID===========:", itemId);
  // console.log("Item Name:", itemName);

  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  useFocusEffect(
    React.useCallback(() => {
      fetchPopularCategory();
    }, [navigation]),
  );
  const fetchPopularCategory = async () => {

    const n = ` http://43.205.55.71:3000/api/job/get-sub-category-on-the-basis-of-categories?id=${itemId}`;
    try {
      const token = HeaderToken;

      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });
      setJobData(response?.data?.data?.jobProfiles);
       console.log(response?.data?.data?.jobProfiles,"<<<<===================")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem2 = ({ item, index }: any) => {
    const jobIddd = item?._id;

    // console.log(item.likedUsers,"hhhh=========")
    return (
      <View style={styles.job_card}>
        <View style={styles.job_header_view}>
          <Image style={styles.job_logo} source={{ uri: `${item?.image}` }} />
          <View style={{ width: '60%' }}>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CommonText
            style={[styles.jobtype_style, { maxWidth: '70%' }]}
            numberOfLines={1}>
            {item.jobType}
          </CommonText>
          <CommonText style={styles.jobtype_style}>
            {'- ' + item.availablity}
          </CommonText>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: '5%' }}>
          <CommonText
            style={{ width: item.jobDescriptions.length > 300 ? '90%' : '100%' }}
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
          <CommonText style={{ maxWidth: '63%', fontSize: 14, color: '#637763' }}>
            {' '}
            {'₹' + item?.startingSalary + '-' + '₹' + item?.maximumSalary}
          </CommonText>
          <TouchableOpacity
            onPress={() => navigation.navigate('JobDetail', { alldata: item })}
            style={{
              height: 40,
              width: 97,
              borderWidth: 1,
              borderColor: Colors.Bluebg,
              borderRadius: 30,
              justifyContent: 'center',
            }}>
            <CommonText style={{ textAlign: 'center', color: Colors.Bluebg }}>
              Apply
            </CommonText>
          </TouchableOpacity>
        </View>
      </View>
    );
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
      fetchPopularCategory()
    } catch (error) {
      console.log(error, 'errorrrr=====');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 13, backgroundColor: Colors.white }}>
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt={itemName}
        style={{ marginTop: 1,paddingHorizontal:0 }}
        
      />
       {jobData.length > 0 ? (
         <FlatList
         data={jobData}
         renderItem={renderItem2}
         keyExtractor={item => item?.id?.toString()}
         showsVerticalScrollIndicator={false}
       />
         ):( <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
           flex:1,height:650,width:'100%',
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
            No Jobs found
          </CommonText>
        </View>)
        }
    
    </SafeAreaView>
  )
}

export default ExploreCategory

const styles = StyleSheet.create({
  jobtype_style: { fontSize: 12, fontFamily: 'Poppins-Medium', color: '#637763' },
  job_name_txt: {
    marginTop: '9%',
    marginBottom: '3%',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
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
  heart_view: {
    backgroundColor: 'rgba(40, 155, 230, 0.5)',
    height: 37,
    width: 37,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  job_logo: { height: 58, width: 58, borderRadius: 7 },
  job_header_view: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})