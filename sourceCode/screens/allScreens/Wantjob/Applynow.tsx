import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
  Button,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonText, OpacityButton} from '../../../components';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import DocumentPicker from 'react-native-document-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import FileViewer from 'react-native-file-viewer';
import axios from 'axios';
import {setLoading} from '../../../Redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import apiName, {BASEURL, PDF_UPLOAD} from '../../../Api/apiName';
import Strings from '../../../utils/strings';
import {useNavigation} from '@react-navigation/native';
import {Show_Toast} from '../../../utils/helper';

const Applynow = ({route}) => {
  const {jobId} = route.params;
  // console.log('Job ID:', jobId);

  const [imagedata, setImagedata] = useState<any>(null);
  const [info, setinfo] = useState('');
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();
  audioRecorderPlayer.setSubscriptionDuration(0.09);
  const [showPlaybackButtons, setShowPlaybackButtons] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [imgname, setimgname] = useState('');
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  // console.log(HeaderToken,"=====")
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //   useEffect(() => {
  //     requestMicrophonePermission();
  // }, []);

  // const requestMicrophonePermission = async () => {
  //   if (Platform.OS === 'android') {
  //       try {
  //           const granted = await PermissionsAndroid.request(
  //               PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //               {
  //                   title: 'Microphone Permission',
  //                   message: 'This app requires access to your microphone for recording audio.',
  //                   buttonNeutral: 'Ask Me Later',
  //                   buttonNegative: 'Cancel',
  //                   buttonPositive: 'OK',
  //               },
  //           );
  //           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //               console.log('Microphone permission granted');
  //           } else {
  //               console.log('Microphone permission denied');
  //           }
  //       } catch (error) {
  //           console.error('Failed to request microphone permission:', error);
  //       }
  //   } else if (Platform.OS === 'ios') {
  //       // Handle iOS permissions if needed
  //   }
  // };

  // const onStartRecord = async () => {
  //   try {
  //       const uri = await audioRecorderPlayer.startRecorder();
  //       console.log('Recording started at:', uri);
  //       setShowPlaybackButtons(false)

  //             audioRecorderPlayer.addRecordBackListener((e) => {
  //           console.log('Recording Duration:', e.current_position);
  //       });
  //   } catch (error) {
  //       console.error('Failed to start recording:', error);
  //   }
  // };

  // const onStopRecord = async () => {
  //   try {
  //     setIsDisabled(true);
  //       const uri = await audioRecorderPlayer.stopRecorder();
  //       console.log('Recording stopped. File saved at:', uri);
  //       setShowPlaybackButtons(true)
  //       setTimeout(() => {
  //         setIsDisabled(false);
  //       }, 2000);
  //       } catch (error) {

  //       console.error('Failed to stop recording:', error);
  //   }
  // };

  // const onStartPlay = async () => {
  //           try {
  //               const uri = 'file:///data/user/0/com.easyjob/cache/sound.mp4';
  //               await audioRecorderPlayer.startPlayer(uri);
  //               console.log('Playback started for:', uri);
  //           } catch (error) {
  //               console.error('Failed to start playback:', error);
  //           }
  //       };

  //       const onStopPlay = async () => {
  //           try {
  //               await audioRecorderPlayer.stopPlayer();
  //               console.log('Playback stopped');
  //           } catch (error) {
  //               console.error('Failed to stop playback:', error);
  //           }
  //       };

  // const deleteon= async()=>{
  //   setShowPlaybackButtons(false)
  // try {
  //               await audioRecorderPlayer.stopPlayer();
  //               console.log('Playback stopped');
  //           } catch (error) {
  //               console.error('Failed to stop playback:', error);
  //           }
  // }

  const openPdfWithThirdPartyApp = async contentUri => {
    try {
      await FileViewer.open(contentUri, {showOpenWithDialog: true});
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const readPermission = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );

      if (readPermission === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Error requesting storage permission:', err);
      return false;
    }
  };
  useEffect(()=>{
    requestStoragePermission()
  },[])

  const handleMediaPress = async () => {
   
    // dispatch(setLoading(true));
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      const uri = res[0]?.uri;
      setImagedata(uri);
      // console.log('=====>', uri);
      // dispatch(setLoading(false));
    } catch (err) {
      // dispatch(setLoading(false));
      if (DocumentPicker.isCancel(err)) {
      } else {
        Alert.alert('Error', 'Failed to pick PDF file');
      }
    }
  };

  const handlesavee = () => {
    if (!imagedata) {
      Show_Toast('error', Strings.PDF_null);
    } else if (!info) {
      Show_Toast('error', Strings.Information_null);
    } else {
      pdffupload();
    }
  };

  // useEffect(()=>{

  // },[imagedata])

  const pdffupload = async () => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append('pdf', {
        uri: imagedata,
        type: 'application/pdf',
        name: 'document.pdf',
      });

      const uploadResponse = await axios.post(`${PDF_UPLOAD}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log('uploadResponse:', uploadResponse.data);
      dispatch(setLoading(false))
      let b = uploadResponse.data.filename;
      //  setimgname(b)
      applyjob(b);
    } catch (error) {
      pdffupload();
      dispatch(setLoading(false))
      console.error('Error uploading PDF:', error);
    }
  };

  const applyjob = async filename => {
    dispatch(setLoading(true))
    const data = {
      resume: filename,
      information: info,
    };

    const apiUrl = `${BASEURL}${apiName.APPLY_JOB}${jobId}`;
    const token = HeaderToken;
    // console.log(token)
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(response?.data, 'response====>');
      dispatch(setLoading(false));
      Show_Toast('success', Strings.Appled);
      setTimeout(() => {
        navigation.navigate('TabNavigation');
      }, 1900);
    } catch (error) {
      console.error(error, '=========>');
      dispatch(setLoading(false));
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  function removeImage() {
    setImagedata(null);
    setUploadDisabled(false);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <HeaderComp
        txt="Apply Now"
        style={{marginBottom: 15, marginTop: 30}}
        img={require('../../../assets/Images/arrowback.png')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{alignSelf: 'center'}}>
          <CommonText style={styles.Uploadtxt}>Upload CV</CommonText>
          <CommonText style={styles.addtxt}>
            Add your CV/Resume to apply for a job
          </CommonText>

          {imagedata ? (
            <View
              style={[
                styles.borderimg,
                {
                  borderColor: 'grey',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}>
              <View style={{width: 80, height: 73}}>
                <TouchableOpacity
                  onPress={removeImage}
                  style={{position: 'absolute', top: -5, zIndex: 9, right: -5}}>
                  <Image
                    resizeMode="contain"
                    style={{height: 13, width: 13}}
                    source={require('../../../assets/Images/Vector(3).png')}
                  />
                </TouchableOpacity>
                <Image
                  resizeMode="contain"
                  style={{
                    height: 73,
                    width: 73,
                    marginLeft: 5,
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}
                  source={require('../../../assets/Images/PDF.png')}
                />
              </View>
              <TouchableOpacity
                style={styles.viewpdff}
                onPress={() => {
                  openPdfWithThirdPartyApp(imagedata);
                }}>
                <Text style={{color:Colors.blacktxt}}>View Pdf</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ImageBackground
              source={require('../../../assets/Images/border.png')}
              resizeMode="contain"
              style={styles.borderimg}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  height: 70,
                  width: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={1}
                onPress={uploadDisabled ? undefined : handleMediaPress}>
                <Image source={require('../../../assets/Images/Icon.png')} />

                <View
                  style={{height: 50, width: 120, justifyContent: 'center'}}>
                  <Text style={styles.uploadcv}>Upload Resume</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          )}
          <CommonText style={styles.txt}>Information</CommonText>
          <View style={styles.inputView2}>
            <TextInput
              placeholder="Explain why you are the right person for this job"
              placeholderTextColor="rgba(170, 166, 185, 1)"
              style={{
                color: Colors.blacktxt,
                fontFamily: 'Montserrat-Bold',
                fontSize: 14,
                marginBottom: 5,
                minHeight: 65,
                maxHeight: 232,
              }}
              multiline={true}
              value={info}
              onChangeText={setinfo}
            />
          </View>
        </View>
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',width:'95%',alignSelf:'center'}}>
               {showPlaybackButtons ? (
                <View style={{flexDirection:'row'}}>
                      <OpacityButton name="Start" button={{width: '20%',borderRadius: 21}}  pressButton={onStartPlay}/>
                      <OpacityButton name="Stop" button={{width: '20%',borderRadius: 21,marginLeft:10}}pressButton={onStopPlay} />
                      <TouchableOpacity style={{width:'24%',alignSelf:'center',marginLeft:10}}onPress={deleteon}>
                        <Image  resizeMode="contain"
                  style={{height: 13, width: 13}}
                  source={require('../../../assets/Images/Vector(3).png')}/>
                      </TouchableOpacity>
                    </View>
               ):null
                     }

                    <TouchableOpacity
                    style={styles.MicIconstyl}
                    onLongPress={onStartRecord}
                    onPressOut={onStopRecord}
                    disabled={isDisabled}
                >
                    <Image source={require('../../../assets/Images/MicIcon.png')} />
                </TouchableOpacity>
                    </View> */}

        <OpacityButton
          name="SUBMIT"
          button={{width: '73%', marginTop: 80}}
          pressButton={() => {
            handlesavee();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Applynow;

const styles = StyleSheet.create({
  Uploadtxt: {fontFamily: 'Montserrat-Bold'},
  addtxt: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.addcv,
    marginTop: 10,
  },
  borderimg: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 335,
  },
  uploadcv: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.addcv,
    alignSelf: 'center',
    marginLeft: 7,
  },
  txt: {fontFamily: 'Montserrat-Bold', marginTop: 25},
  inputView2: {
    backgroundColor: Colors.white,
    height: 232,
    width: '98%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 30,
    elevation: 1,
    // shadowColor: "rgba(153, 171, 198, 0.18)"
  },
  MicIconstyl: {height: 47, width: 42, position: 'absolute', right: 0},
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  pdf: {
    width: 500,
    height: 500,
  },
  viewpdff: {
    borderWidth: 0.3,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    right: 0,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
});
