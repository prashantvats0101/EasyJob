/* eslint-disable prettier/prettier */
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import InputText from '../../../components/textInput';
import {CommonText, OpacityButton} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import {openPicker} from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import apiName, {BASEURL, IMAGE_UPLOAD} from '../../../Api/apiName';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Loaderr from '../StartingScreens/Loaderr';
import {setLoading, setPersonalInfo} from '../../../Redux/reducer';
import {setLoginuser} from '../../../Redux/cookiesReducer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Strings from '../../../utils/strings';
import {Show_Toast} from '../../../utils/helper';
import i18n from '../../../language/i18n';
import { useTranslation } from 'react-i18next';

const PersonalInfo = () => {  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [imagedata, setImagedata] = useState<Image | null>(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [alternateMobileNumber, setAlternateMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const logindata = useSelector<any>(state => state?.sliceReducer?.userId);
  const userID = logindata;
  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);
  const {t}=useTranslation();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        // Now you can use launchCamera method from react-native-image-picker
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDateChange = date => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setCalendarVisibility(false);
  };

  const formatDate = date => {
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  };

  const today = new Date();

  const pickImage = () => {
    setModalOpen(false);
    try {
      openPicker({
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        console.log(image);
        setImagedata(image);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = email => {
    return emailRegex.test(email);
  };
  const handleNext = async () => {
    if (!imagedata) {
      Show_Toast('error', Strings.ProfilePhoto);
    } else if (!name) {
      Show_Toast('error', Strings.EnterNamee);
    } else if (!email) {
      Show_Toast('error', Strings.ENterEmaill);
    } else if (!isValidEmail(email)) {
      Show_Toast('error', Strings.validemaill);
    } else if (!mobileNumber) {
      Show_Toast('error', Strings.Mobilenummm);
    } else if (mobileNumber.length < 10) {
      Show_Toast('error', Strings.tendigitmobilenum);
    } else if (!alternateMobileNumber) {
      Show_Toast('error', Strings.alternateMobileNumberr);
    } else if (mobileNumber === alternateMobileNumber) {
      Show_Toast('error', Strings.Mobile_alternate_same);
    } else if (alternateMobileNumber.length < 10) {
      Show_Toast('error', Strings.alternate_length);
    } else if (!selectedGender) {
      Show_Toast('error', Strings.genderselect);
    } else if (!selectedDate) {
      Show_Toast('error', Strings.DOBSelect);
    } else if (!address) {
      Show_Toast('error', Strings.EnterAdress);
    } else {
      dispatch(setLoading(true));
      try {
        const imageNameArr = imagedata?.path?.split?.('/');
        const formData = new FormData();
        formData.append('image', {
          name: imageNameArr[imageNameArr?.length - 1],
          type: imagedata.mime,
          uri: imagedata.path,
        });

        console.log('name====>', imageNameArr[imageNameArr?.length - 1]);
        console.log('type====>', imagedata.mime);
        console.log('uri====>', imagedata.path);

        axios({
          maxBodyLength: Infinity,
          method: 'post',
          url: `${IMAGE_UPLOAD}`,
          data: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(uploadResponse => {
            console.warn('uploadResponse===>', uploadResponse.data);
            let b = uploadResponse.data.filename;
            console.log(b, '<======');
            postData(b);
          })
          .catch(uploadError =>
            console.warn('uploadError===>', uploadError.response.data),
          );
      } catch (error) {
        Show_Toast('error', Strings.ProfilePhoto);
      }
    }
  };

  const postData = async filename => {
    const data = {
      name: name,
      email: email,
      gender: selectedGender,
      DOB: selectedDate,
      address: address,
      alterNateNumber: alternateMobileNumber,
      image: filename,
      userType: 'jobSeeker',
    };

    console.log(data, '<<<========');
    const n = `${BASEURL}${apiName.JOBSEEKER_REGISTER}${userID}`;
    // console.log(userID,"<-----userid")

    try {
      const response = await axios.post(n, data, {});
      console.log(response.data, 'usertype===');
      dispatch(setLoginuser(response?.data));

      dispatch(setLoading(false));
      navigation.navigate('JobInfo');
    } catch (error) {
      console.error(error, '=========>');
      dispatch(setLoading(false));
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  const openCamera = async () => {
    try {
      setModalOpen(false);
      const cameraResponse = await launchCamera({
        includeBase64: false,
      });

      if (cameraResponse.assets && cameraResponse.assets.length > 0) {
        const image = {
          height: cameraResponse.assets[0].height,
          mime: cameraResponse.assets[0].type,
          modificationDate: cameraResponse.assets[0].modificationDate,
          path: cameraResponse.assets[0].uri,
          size: cameraResponse.assets[0].fileSize,
          width: cameraResponse.assets[0].width,
        };

        console.log('Camera Image:', image, '-=====');

        setImagedata(image);
        // dispatch(setLoading(true));
      } else if (cameraResponse.didCancel) {
        console.log('Camera closed without capturing');
      } else if (cameraResponse.errorCode) {
        console.log(
          'Error occurred:',
          cameraResponse.errorCode,
          cameraResponse.errorMessage,
        );
      }
    } catch (error) {
      console.log('Error launching camera:', error);
      // dispatch(setLoading(true));
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.whitetxt}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.whitetxt} />
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt={t('Personal Information')}
      />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.profileimgView}>
          <View style={[styles.profilepicstv]}>
            {imagedata ? (
              <Image
                source={{uri: imagedata.path}}
                style={styles.profilepicst}
              />
            ) : (
              <View>
              <Image
                source={require('../../../assets/Images/profilepic.png')}
                style={styles.profilepicst}
              />
              <TouchableOpacity
              onPress={handleOpenModal}
              style={{
                position: 'absolute',
                height: 27,
                width: 27,
                bottom: 7,
                right: 13,
              }}>
              <Image
                source={require('../../../assets/Images/plusicon.png')}
                style={styles.plusimg}
              />
            </TouchableOpacity>
            </View>
            )}
          </View>
          {/* <TouchableOpacity
            onPress={handleOpenModal}
            style={{
              position: 'absolute',
              height: 27,
              width: 27,
              bottom: 12,
              right: 20,
            }}>
            <Image
              source={require('../../../assets/Images/plusicon.png')}
              style={styles.plusimg}
            />
          </TouchableOpacity> */}
        </View>
        {isLoading && <Loaderr />}
        <InputText txt={t("Full Name")} value={name} onChangeText={setName} />
        <InputText txt={t("Email")} value={email} onChangeText={setEmail} />
        <InputText
          txt={t("Number")}
          keyboardType="numeric"
          value={mobileNumber.length > 0 ? `+91 ${mobileNumber}` : ''}
          onChangeText={text => {
            if (text.startsWith('+91')) {
              setMobileNumber(text.substring(4));
            } else {
              setMobileNumber(text);
            }
          }}
          length={14}
        />
        <InputText
          txt={t("Alternative Number")}
          keyboardType="numeric"
          value={
            alternateMobileNumber.length > 0
              ? `+91 ${alternateMobileNumber}`
              : ''
          }
          onChangeText={text => {
            if (text.startsWith('+91')) {
              setAlternateMobileNumber(text.substring(4));
            } else {
              setAlternateMobileNumber(text);
            }
          }}
          length={14}
        />

        <View style={styles.GenderView}>
          <CommonText style={styles.gendertxt}>{t('Gender')}</CommonText>
          <View style={{justifyContent: 'center', height: 60}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.Selectg}
                onPress={() => setSelectedGender('male')}>
                {selectedGender === 'male' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={styles.txts}>{t('Male')}</CommonText>
              <TouchableOpacity
                style={[styles.Selectg, {marginLeft: 90}]}
                onPress={() => setSelectedGender('female')}>
                {selectedGender === 'female' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={[styles.txts]}>{t('Female')}</CommonText>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setCalendarVisibility(true)}
          style={styles.inputView}
          activeOpacity={1}>
          <CommonText style={styles.inputtxt}>{t('DOB')}</CommonText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 20,
              width: '100%',
            }}>
            <CommonText style={styles.DOBstyl}>{selectedDate}</CommonText>

            <Image source={require('../../../assets/Images/DOB.png')} />
          </View>

          <Modal
            visible={isCalendarVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setCalendarVisibility(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View
                style={{
                  overflow: 'hidden',
                  width: '95%',
                  backgroundColor: '#fff',
                  borderRadius: 7,
                }}>
                <CalendarPicker
                  maxDate={today}
                  onDateChange={handleDateChange}
                  previousTitleStyle={{color:'black'}}
                  nextTitleStyle={{color:'black'}}
                />
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <InputText
          txt={t("Address")}
          img={require('../../../assets/Images/Address.png')}
          imgstyle={styles.inputimg}
          inputstyl={styles.inputstyl}
          style={styles.inputmainstyl}
          value={address}
          onChangeText={setAddress}
          styletxt={{marginLeft: 9}}
        />

        <OpacityButton
          name={t("NEXT")}
          button={styles.ButtonStyl}
          //  pressButton={()=>{postData()}}
          pressButton={handleNext}
        />
      </ScrollView>
      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalmainview}>
          <View style={styles.modaldataview}>
            <View style={{justifyContent: 'space-between', width: '100%'}}>
              <OpacityButton
                name="Open Gallery"
                button={{width: 150}}
                pressButton={() => pickImage()}
              />
              <OpacityButton
                name="Open Camera"
                button={{width: 150, marginTop: 0}}
                pressButton={() => openCamera()}
              />
            </View>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => setModalOpen(false)}>
              <CommonText>Close</CommonText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  modalmainview: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(2,2,3,0.7)',
  },
  modaldataview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 250,
    width: 250,
    borderRadius: 10,
    alignSelf: 'center',
  },
  profilepicstv: {
    alignSelf: 'center',
    height: 125,
    width: 125,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepicst: {
    alignSelf: 'center',
    height: 123,
    width: 123,
    borderRadius: 60,
  },
  profileimgView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
    height: 130,
  },
  plusimg: {height: 26, width: 26},
  GenderView: {width: '100%', paddingHorizontal: 23, height: 80},
  gendertxt: {fontFamily: 'Montserrat-Bold', fontSize: 14},
  txts: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: Colors.lightbrown,
    marginLeft: 7,
  },
  Selectg: {
    height: 19,
    width: 19,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.lightWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonStyl: {width: '70%', marginVertical: 20},
  Selectedicon: {height: 19, width: 19},
  inputView: {
    backgroundColor: Colors.inputbackground,
    height: 61,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputtxt: {
    color: Colors.black56,
    fontSize: 10,
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 11,
  },
  DOBstyl: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    marginTop: 3,
    marginLeft: 9,
  },
  inputimg: {height: 25, width: 25, marginRight: 4},
  inputstyl: {width: '90%', marginLeft: 5},
  inputmainstyl: {paddingRight: 6},
});
