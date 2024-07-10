import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Modal, Button,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../constant'
import { CommonText, OpacityButton } from '../../../components'
import ImgButton from '../../../components/ImgButton'
import apiName, { BASEURL } from '../../../Api/apiName'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import Loaderr from '../../allScreens/StartingScreens/Loaderr'
import {setApplyedJobData, setLoading} from '../../../Redux/reducer';

const AppliedJob = () => {
    const HeaderToken = useSelector<any>(
        state => state?.cookies?.loginUser.data?.token,
      );
      const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);

    const [modalOpen, setModalOpen] = useState(false)
    const [jobpostdata, setjobpostdata] = useState([]);
    const [jobid, setjobid] = useState('')
    const [load, setLoad]=useState(true)

    const handleDeleteModal = (jobId) => {
        setModalOpen(true);
        setjobid(jobId)
    }
  
    useFocusEffect(
      React.useCallback(() => {
        // dispatch(setLoading(true));
        ApplyedJObs();
      }, []),
    );
    const deletejob=async()=>{
      // console.log(jobid,"======job id====")
      console.log(HeaderToken)
      const url = `${BASEURL}${apiName.Delete_Appled_Jobs}${jobid}`
   try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: HeaderToken,
      },
    });
    console.log(response?.data?.data,"response_Delete===")
    setModalOpen(false)
    ApplyedJObs()
   } catch (error) {
    console.log(error,"error delete api")
   }
    }

    const dispatch = useDispatch()

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
            <TouchableOpacity style={styles.heart_view}
            onPress={()=>{handleDeleteModal(item?.jobId?._id)}}
            >
          
              <Image style={{height:70,width:70}} source={require('../../../assets/Images/DeleteIcon.png')} />
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
          
          </View>
        </View>
      );
    };

    // const renderItem2 = ({item}) => {
    //     // console.log(item,"=======item")
    //     if (!item?.jobId) {
    //       return null;
    //     }
    //     return (
    //       <TouchableOpacity
    //         style={styles.renderjob}
            
    //         >
    //         <View style={styles.LogoView}>
    //           <Image
    //             source={{
    //               uri: `${item?.jobId?.image}`,
    //             }}
    //             style={styles.Clogo}
    //           />
    //           <View>
    //             <View
    //               style={[
    //                 {
    //                   height: 30,
    //                   width: '95%',
    //                   //   borderWidth:1
    //                 },
    //               ]}>
    //               <CommonText
    //                 style={[styles.jobnametxt, {flex: 1}]}
    //                 ellipsizeMode="tail"
    //                 numberOfLines={1}>
    //                 {item?.jobId?.jobName}
    //               </CommonText>
    //             </View>
    //             <View style={{paddingRight: 10, width: '95%'}}>
    //               <View style={{backgroundColor: '#fff', height: 20, width: 200}}>
    //                 <CommonText
    //                   numberOfLines={1}
    //                   ellipsizeMode="tail"
    //                   style={[styles.campanynametxt, {flex: 1}]}>
    //                   {item?.jobId?.userId?.companyName}
    //                   {/* Uber */}
    //                 </CommonText>
    //               </View>
    //             </View>
    //           </View>
    //           <View style={{width: '7%'}} />
    //           {/* console.log(item?.jobId?._id) */}
              // <ImgButton
              //   img={require('../../../assets/Images/DeleteIcon.png')}
              //   // button={{:1,}}
              //   pressButton={()=>{handleDeleteModal(item?.jobId?._id)}}
              // />
    //         </View>
    //         <View
    //           style={[
    //             styles.jobtypeView,
    //             {
    //               backgroundColor: '#fff',
    //               flexDirection: 'row',
    //               marginTop: 3,
    //               width: '98%',
    //             },
    //           ]}>
    //           <CommonText style={{fontWeight: 'bold'}}>Location -</CommonText>
    //           <CommonText
    //             style={[styles.txtstyl, {flex: 1}]}
    //             ellipsizeMode="tail"
    //             numberOfLines={1}>
    //             {item?.jobId?.address}
    //           </CommonText>
    //         </View>
    //         <View style={[styles.bottomview, {marginTop: 1}]}>
    //           <View style={[styles.jobtypeView]}>
    //             <CommonText style={styles.txtstyl}>
    //               {item?.jobId?.availablity}
    //             </CommonText>
    //           </View>
    
    //           <View />
    //           <View style={styles.selleryview}>
    //             <CommonText style={styles.txtstyl}>
    //               {'₹' +
    //                 item?.jobId?.startingSalary +
    //                 '-' +
    //                 '₹' +
    //                 item?.jobId?.maximumSalary}
    //             </CommonText>
    //           </View>
    //         </View>
    //       </TouchableOpacity>
    //     );
    //   };

    const ApplyedJObs = async () => {
    
        const url = `${BASEURL}${apiName.GET_APPLYED_JOBS}`;
        const token = HeaderToken;
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: token,
            },
          });
          // console.log(response?.data?.data[0]?.jobId,'<======')
          // console.log(response?.data?.data[0].jobId, '<======');
          const likedJobData = response?.data?.data || []; 
          setLoad(false)
        
          setjobpostdata(likedJobData.reverse());
          dispatch(setApplyedJobData(likedJobData))
          dispatch(setLoading(false))

        } catch (error) {
          console.log(error, 'error=>>>');
          dispatch(setLoading(false))
        }
      };

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#F5F7FC',paddingHorizontal:10 }}>
            {/* <Button title='press' onPress={()=>{ApplyedJObs()}}/> */}
            {isLoading ?( <Loaderr />):(
              <View style={{ flex: 1 ,marginTop: 10,}}>
              
              <FlatList
                  data={jobpostdata}
                  renderItem={renderItem2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.key}
                  ListEmptyComponent={()=>
                    !load && jobpostdata.length === 0 &&
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
                        No Applied Job found
                      </CommonText>
                    </View>
                  }
                
              />
              <Modal
                  visible={modalOpen}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => setModalOpen(false)}
              >
                  <View style={styles.modalmainview}>
                      <View style={styles.modaldataview}>
                          <Image source={require('../../../assets/Images/Deleted.png')} style={styles.deleteimg} />
                          <Text style={styles.modaltxt}>Are you sure you want to delete</Text>
                          <Text style={styles.modaltxt}> the job post from the</Text>
                          <Text style={styles.modaltxt}> platform ?</Text>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", marginTop: 25 }}>
                              <OpacityButton
                                  name="NO"
                                  button={styles.NoButton}
                                  pressButton={() => setModalOpen(false)}
                              />
                              <OpacityButton
                                  name="YES"
                                  button={styles.YesButton}
                                  pressButton={() => deletejob()}
                              />
                          </View>

                      </View>
                  </View>
              </Modal>
          </View>
            )}
            
        </SafeAreaView>
    )
}

export default AppliedJob
const styles = StyleSheet.create({
  jobtype_style: {fontSize: 12, fontFamily: 'Poppins-Medium', color: '#637763'},
  job_name_txt: {
    marginTop: '9%',
    marginBottom: '3%',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  heart_view: {
    // backgroundColor: 'rgba(40, 155, 230, 0.5)',
    height: 37,
    width: 37,
    // borderRadius: 40,
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
  NoButton: { marginVertical: 1, backgroundColor: "rgba(215, 215, 215, 1)", width: 141, },
    YesButton: { marginVertical: 1, width: 141, },
    modaltxt: { fontSize: 17, fontFamily: 'Poppins-Medium', alignSelf: 'center', color: "rgba(0, 0, 0, 1)" },
    deleteimg: { height: 144, width: 144, alignSelf: 'center', marginTop: 6 },
    modalmainview: { flex: 1, justifyContent: 'center', alignItems: 'center',  alignSelf: 'center',width: '100%',
    backgroundColor: 'rgba(2,2,3,0.75)', },
    modaldataview: { padding: 10, height: 340, backgroundColor: "rgba(255, 255, 255, 1)", elevation: 5, borderRadius: 10,width: "90%", }
})
// const styles = StyleSheet.create({
//     renderjob: { width: '100%', height: 123, backgroundColor: Colors.whitetxt, padding: 10, margin: 5,borderRadius:7 },
//     Clogo: {height: 50, width: 50, marginRight: 10, borderRadius: 5},
//     LogoView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//     bottomview: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
//     jobtypeView: { backgroundColor: Colors.txtbackground, padding: 4, borderRadius: 10 },
//     txtstyl: { fontSize: 12 },
//     jobnametxt: { fontSize: 16 },
//     campanynametxt: { fontSize: 12, fontFamily: 'Poppins-Medium' },
//     applyedView: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 4, },
//     checkimgstyle: { height: 12, width: 12 },
    // applytxt: { fontFamily: 'Poppins-Medium', fontSize: 10, color: Colors.whitetxt, marginLeft: 4 },
  
// })