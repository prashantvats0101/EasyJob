import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Button,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constant';
import {CommonText, OpacityButton} from '../../../components';
import DocumentPicker from 'react-native-document-picker';
import HeaderComp from '../../../components/HeaderComp';
import InputText from '../../../components/textInput';
import {useNavigation} from '@react-navigation/native';
import {openPicker} from 'react-native-image-crop-picker';
import axios from 'axios';
import {
  setLoginuser,
  setcampanyProfiledata,
} from '../../../Redux/cookiesReducer';
import {setLoading} from '../../../Redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import Loaderr from '../StartingScreens/Loaderr';
import Strings from '../../../utils/strings';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import apiName, {BASEURL, IMAGE_UPLOAD, } from '../../../Api/apiName';
import uploadImageMethod from '../../../utils/uploadimage';
import { Show_Toast } from '../../../utils/helper';

const EditCampanyProfile = () => {
  const Datafromredux = useSelector<any>(
    state => state?.cookies?.campanyprofiledata,
  );
  // console.log(Datafromredux,"datafrom===")

  const imgg = {
    path: `${Datafromredux?.companyLogo}`,
  };
  // console.log(imgg)

  const [imagedata, setImagedata] = useState<any>(imgg);
  const [userData, setUserData] = useState(null);

  const [name, setName] = useState(Datafromredux?.companyName);
  const [email, setEmail] = useState(Datafromredux?.companyEmail);
  const [mobileNumber, setMobileNumber] = useState(Datafromredux?.mobileNumber);
  const [address, setAddress] = useState(Datafromredux?.companyAddress);
  const [information, setinformation] = useState(
    Datafromredux?.companyInformation,
  );

  const [modalOpen, setModalOpen] = useState(false);

  const navigation = useNavigation();

  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);

  const dispatch = useDispatch();
  const logindata = useSelector<any>(state => state?.sliceReducer?.userId);
  const userID = logindata;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = email => {
    return emailRegex.test(email);
  };
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  // useEffect(() => {
  //   if (imagedata) {
  //     uploadImage();
  //   }
  // }, [imagedata]);

  const uploadImage = async () => {
    try {
      dispatch(setLoading(true));
      const filename = await uploadImageMethod(imagedata, setLoading);
      // setUserData(filename);
      saveProfile(filename);
      console.log('Uploaded filename:', filename);
    } catch (error) {
      uploadImage();
      console.error('Image upload error:', error);
      dispatch(setLoading(false));
     
    } finally {
      dispatch(setLoading(false));
    }
  };

  const pickImage = async () => {
    setModalOpen(false);
    try {
      openPicker({
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        console.log('======', image, '-------------->');
        setImagedata(image);

       
      });
    } catch (error) {
      console.log(error);
      
    }
  };

  const handlesavee = () => {
    if (!name) {
    
      Show_Toast('error',Strings.editComapanyName)
    } else if (!email) {
     
      Show_Toast('error',Strings.editcompanyEamil)
    } else if (!isValidEmail(email.trim())) {
     
      Show_Toast('error',Strings.editValidemailAddress)
    } else if (!mobileNumber) {
      
      Show_Toast('error',Strings.editMobileNumber)
    } else if (mobileNumber.length < 10) {
     
      Show_Toast('error',Strings.editMobileNumberlength)
    } else if (!address) {
      
      Show_Toast('error',Strings.editCompanyAddress)
    } else if (!information) {
    
      Show_Toast('error',Strings.editCompanyinformation)
    } else {
      // dispatch(setLoading(true));
    // uploadImage()
    if (imagedata.path === imgg.path) { 
      saveProfile(); 
    } else {
      uploadImage(); 
    }
    }
  };

  const saveProfile = async (filename) => {
    const n = `${BASEURL}${apiName.EDIT_CAMPANY_PROFILE}`;
    console.log(userData, 'imagedata=====>');
    try {
      const token = HeaderToken;
      const data = {
        companyName: name,
        companyInformation: information,
        companyAddress: address.trim(),
        companyEmail: email.trim(),
        mobileNumber: mobileNumber,
        companyLogo: filename != null ? filename : Datafromredux?.companyLogo,
      };
      const response = await axios.put(n, data, {
        headers: {
          Authorization: token,
        },
      });
      fetchprofile();

  
  Show_Toast('success','Your Profile is Updated Successfully')
    setTimeout(() => {
        navigation.goBack();
      }, 1900);
      console.log('Profile updated successfully:', response.data);
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error updating profile:', error);
      dispatch(setLoading(false));
    }
  };

  const fetchprofile = async () => {
    dispatch(setLoading(true));
    const n = `${BASEURL}${apiName.GET_PROFILE_DATA}`;
    try {
      const token = HeaderToken;
      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });
      let x = response?.data?.data?.getCompanyProviderProfile;
      //  console.log(x,"respones campany")
      dispatch(setcampanyProfiledata(x));

      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(setLoading(false));
    }
  };

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
useEffect(()=>{
  requestCameraPermission();
},[])
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
      dispatch(setLoading(true));
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt="Edit Profile"
      />

      {isLoading && <Loaderr />}
     
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <CommonText style={styles.textt}>Company Logo</CommonText>
        <View style={styles.profileimgView}>
          <View style={styles.profilepicstv}>
            {imagedata ? (
              <Image
                source={{uri: imagedata.path}}
                style={styles.profilepicst}
              />
            ) : (
              <Image source={{uri: imgg}} style={styles.profilepicst} />
            )}
          </View>

          <TouchableOpacity
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
          </TouchableOpacity>
        </View>

      
        {/* <InputText txt="Company Name" value={name} onChangeText={setName} 
        /> */}
        <View style={[styles.inputView]}>
          <View style={[styles.textinputview]}>
            <CommonText style={[styles.inputtxt]}>Company Name </CommonText>
            <TextInput
              style={[styles.input]}
              value={name}
              onChangeText={setName}
              multiline={true}
            />
          </View>
        </View>
        <InputText txt="Email" value={email.trim()} onChangeText={setEmail} />
        <InputText
          txt="Mobile Number"
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={text => {
            if (text.startsWith('+91')) {
              setMobileNumber(text.substring(4));
            } else {
              setMobileNumber(text);
            }
          }}
          length={10}
        />

        <View style={[styles.inputView]}>
          <View style={[styles.textinputview]}>
            <CommonText style={[styles.inputtxt]}>Address </CommonText>
            <TextInput
              style={[styles.input]}
              value={address}
              onChangeText={setAddress}
              multiline={true}
            />
          </View>
        </View>

        <CommonText style={styles.txt}>Information</CommonText>

        <View style={styles.inputView2}>
          <TextInput
            placeholderTextColor="rgba(170, 166, 185, 1)"
            style={styles.info}
            multiline={true}
            value={information}
            onChangeText={setinformation}
          />
        </View>
        <OpacityButton
          name="Save"
          button={styles.buttonstyl}
          pressButton={handlesavee}
        />
      </ScrollView>
      <Modal
        visible={modalOpen}
        // animationType="slide"
        transparent
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

export default EditCampanyProfile;
const styles = StyleSheet.create({
  modalmainview: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,width:'100%',
    backgroundColor:'rgba(2,2,3,0.7)'
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
  inputView: {
    backgroundColor: Colors.inputbackground,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textinputview: {width: '90%', alignSelf: 'center', marginLeft: 15},
  inputtxt: {
    color: Colors.black56,
    fontSize: 10,
    marginLeft: 4.5,
    position: 'absolute',
    top: 9,
    fontFamily: 'Montserrat-Bold',
    width: '100%',
  },
  input: {
    width: '100%', // Adjusted width
    fontSize: 14,
    color: Colors.blacktxt,
    marginTop: 14,
    fontFamily: 'Montserrat-Bold',
    minHeight: 42,
    maxHeight: 400,
  },

  profilepicst: {
    alignSelf: 'center',
    height: 123,
    width: 123,
    borderRadius: 60,
  },
  profilepicstv: {
    alignSelf: 'center',
    height: 125,
    width: 125,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileimgView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
    height: 130,
  },
  info: {
    color: Colors.blacktxt,
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  
  textt: {
    alignSelf: 'flex-start',
    fontFamily: 'Montserrat-Bold',
    color: '#150B3D',
    marginTop: 20,
    marginLeft: 20,
  },
  borderimg: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 318,
    alignSelf: 'center',
  },
  uploadcv: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.addcv,
    alignSelf: 'center',
    marginLeft: 7,
  },
  txt: {
    fontFamily: 'Montserrat-Bold',
    marginLeft: 20,
    alignSelf: 'flex-start',
    marginVertical: 5,
    color: '#150B3D',
  },

  inputimg: {height: 25, width: 25, marginRight: 4},
  inputstyl: {width: '100%'},
  inputView2: {
    backgroundColor: Colors.inputbackground,
    // height: 100,
    minHeight: 100,
    maxHeight: 500,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  buttonstyl: {width: '70%', marginTop: 10},
});
