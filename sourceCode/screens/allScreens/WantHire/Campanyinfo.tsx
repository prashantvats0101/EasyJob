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
  Alert,Modal, PermissionsAndroid
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constant';
import {CommonText, OpacityButton} from '../../../components';
import DocumentPicker from 'react-native-document-picker';
import HeaderComp from '../../../components/HeaderComp';
import InputText from '../../../components/textInput';
import {useNavigation} from '@react-navigation/native';
import {openPicker} from 'react-native-image-crop-picker';
import axios from 'axios';
import {setLoginuser} from '../../../Redux/cookiesReducer';
import { setLoading} from '../../../Redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Strings from '../../../utils/strings';
import apiName, { BASEURL, IMAGE_UPLOAD } from '../../../Api/apiName';
import { Show_Toast } from '../../../utils/helper';

const Campanyinfo = () => {
  const [imagedata, setImagedata] = useState<Image | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [information, setinformation] = useState('');
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)

  const navigation = useNavigation();

  // const saveData = () => {
  //   const companyInfo = { name, email, mobileNumber, address };
  //   dispatch(setCompanyInfo(companyInfo));
  // }

  const dispatch = useDispatch();
  const logindata = useSelector<any>(state => state?.sliceReducer?.userId);
  const userID = logindata;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = email => {
    return emailRegex.test(email);
  };
  const pickImage = () => {
    setModalOpen(false)
    try {
      openPicker({
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        console.log(image);
        setImagedata(image);
        setUploadDisabled(true)
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeImage = () => {
    setImagedata(null); // Remove uploaded image
    setUploadDisabled(false); // Enable upload button
  };

  const HandleSave = () => {
    if (!imagedata) {
     
      Show_Toast('error',Strings.Campanyimagedata)
    } else if (!name) {
    
      Show_Toast('error',Strings.Campanyname)
    } else if (!email) {
   
      Show_Toast('error',Strings.Campanyemail)
    } else if (!isValidEmail(email.trim())) {
     
      Show_Toast('error',Strings.CampanyValidEmail)
    } else if (!mobileNumber) {
    
      Show_Toast('error',Strings.CampanymobileNumber)
    } else if (mobileNumber.length < 10) {
    
      Show_Toast('error',Strings.CampanymobileNumberlength)
    } else if (!address) {
 
      Show_Toast('error',Strings.Campanyaddress)
    }else if (!information) {
     
      Show_Toast('error',Strings.Campanyinformation)
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
            // console.log(b, '<======');
            postData(b);
          })
          .catch(uploadError =>
            console.warn('uploadError===>', uploadError.response.data),
          );
      } catch (error) {
      
        Show_Toast('error','Please Upload Profile Photo')
      }
    }
  };
  const postData = async filename => {
    const data = {
      companyName: name,
      companyEmail: email.trim(),
      companyAddress: address,
      companyLogo: filename,
      companyInformation: information,
      mobileNumber:mobileNumber,
      userType: 'jobProvider',
    };

    // console.log(data, '<<<========');
    const n = `${BASEURL}${apiName.CAMPANY_RESITER}${userID}`;
    // console.log(userID,"<-----userid")

    try {
      const response = await axios.post(n, data);
      console.log(response, 'jhdbhjdbvhjdsbvhjd=====>');
      dispatch(setLoginuser(response?.data));
      dispatch(setLoading(false));
      navigation.navigate('TabHireNavi')
      
    } catch (error) {
      console.error(error, '=========>');
      dispatch(setLoading(false));
      Alert.alert('Error', 'Failed to fetch data');                
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
  const openCamera = async () => {
    requestCameraPermission()
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
  
        console.log('Camera Image:', image,"-=====");
  
        setImagedata(image);
       
      } else if (cameraResponse.didCancel) {
        console.log('Camera closed without capturing');
      } else if (cameraResponse.errorCode) {
        console.log('Error occurred:', cameraResponse.errorCode, cameraResponse.errorMessage);
      }
    } catch (error) {
      console.log('Error launching camera:', error);
    
    }
  };
  const handleOpenModal = () => {
    setModalOpen(true);

}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <HeaderComp img={require('../../../assets/Images/arrowback.png')} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CommonText style={styles.textt}>Company Logo</CommonText>
      
        {imagedata ? (
          <View style={[{borderColor:'grey',borderRadius:10,marginBottom:3,alignSelf:'center'}]}>
            <View style={{width:150,height:150,marginTop:30,justifyContent:'center',alignItems:'center',borderRadius:80,}}>
          <TouchableOpacity onPress={removeImage} style={{position:'absolute',top:5,zIndex:9,right:-5,}}>
          <Image resizeMode='contain' style={{height:23,width:23,}} source={require('../../../assets/Images/remove.png')}/>
        </TouchableOpacity>
        <Image resizeMode='cover' style={{ height: 153, width: 153 ,marginLeft:5,borderRadius:80,alignSelf:'center'}} source={{ uri: imagedata.path }} />
        </View>
          </View>
        ):(
          // <View style={{borderWidth:1,width:'100%'}}>
          <ImageBackground
          source={require('../../../assets/Images/border.png')}
          resizeMode='center'
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
            onPress={uploadDisabled ? undefined : handleOpenModal}>
            <Image source={require('../../../assets/Images/Icon.png')} />
           

  <View style={{height:50,width:106,justifyContent:'center'}}>
  <Text style={styles.uploadcv}>Upload Logo</Text>
    </View>
    
          </TouchableOpacity>
        </ImageBackground>
        // </View>
        )
}
        <InputText txt="Company Name" value={name} onChangeText={setName} style={{marginTop:30, width: '90%'}} />
        <InputText txt="Email" value={email.trim()} onChangeText={setEmail} />
        <InputText
          txt="Mobile Number"
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
          txt="Address"
          img={require('../../../assets/Images/Address.png')}
          imgstyle={styles.inputimg}
          inputstyl={styles.inputstyl}
          value={address}
          onChangeText={setAddress}
        />

        <CommonText style={styles.txt}>Information</CommonText>

        <View style={styles.inputView2}>
          <TextInput
          //  placeholder="Explain why you are the right person for                    this job"
           
            style={styles.info}
            multiline={true}
            value={information}
            onChangeText={setinformation}
          />
        </View>
        <OpacityButton
          name="Save"
          button={styles.buttonstyl}
          pressButton={HandleSave}
          //navigation.navigate('TabHireNavi')
        />
      </ScrollView>
      <Modal
                    visible={modalOpen}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalOpen(false)}
                >
                    <View style={styles.modalmainview}>
                        <View style={styles.modaldataview}>
                           
                            <View style={{  justifyContent: 'space-between', width: "100%", }}>
                                <OpacityButton
                                    name="Open Gallery"
                                    button={{width:150}}
                                    pressButton={() => pickImage()}
                                />
                                <OpacityButton
                                    name="Open Camera"
                                    button={{width:150,marginTop:0}}
                                    pressButton={() => openCamera()}
                                />
                            </View>
<TouchableOpacity style={{alignSelf:'center'}} onPress={() =>setModalOpen(false)}>
  <CommonText>Close</CommonText>
</TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    </SafeAreaView>
  );
};

export default Campanyinfo;
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
  },  info: {
    color: Colors.blacktxt, fontFamily: 'Montserrat-Bold', fontSize: 14,
    marginBottom: 5,
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
    width: '100%',
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
    height: 100,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  buttonstyl: {width: '70%', marginTop: 10},
});
