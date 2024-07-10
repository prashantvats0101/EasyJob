import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  Modal,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonText, OpacityButton} from '../../../components';
import {Colors} from '../../../constant';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';
import {openPicker} from 'react-native-image-crop-picker';
import InputText from '../../../components/textInput';
import axios from 'axios';
import {setLoading} from '../../../Redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginuser, setPostjobdata} from '../../../Redux/cookiesReducer';
import Loaderr from '../StartingScreens/Loaderr';
import apiName, {BASEURL, IMAGE_UPLOAD} from '../../../Api/apiName';
import {launchCamera} from 'react-native-image-picker';
import Strings from '../../../utils/strings';
import { Show_Toast } from '../../../utils/helper';

const ThirdPostJob = () => {
  const [imagedata, setImagedata] = useState<Image | null>(null);
  const [skillss, setskillss] = useState('hhh');
  const [description, setdescription] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]); // suggestedSkills
  const navigation = useNavigation();
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);
  const dataFromRedux = useSelector<any>(state => state?.cookies?.postjobdata);

  // console.log(dataFromRedux,"=====dataffromredux")

  // console.log('hdhhfhhhello===>>>>>', HeaderToken);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const pickImage = () => {
    setModalOpen(false);
    try {
      openPicker({
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        console.log(image);
        setImagedata(image);
        setUploadDisabled(true);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeImage = () => {
    setImagedata(null); // Remove uploaded image
    setUploadDisabled(false); // Enable upload button
  };
  const handleSubmit = () => {
  
    if (skills.length === 0) {
     
      Show_Toast('error',Strings.add_skills)
    } else if (!description) {
   
      Show_Toast('error',Strings.job_discription_add)
    } else if (!imagedata) {
   
      Show_Toast('error',Strings.image_upload)
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
     
        Show_Toast('error',Strings.image_upload)
      }
    }
  };

  const postData = async filename => {
    dispatch(setLoading(true));
    const data = {
      jobName: dataFromRedux?.jobname,
      jobType: dataFromRedux?.selectedjobtype.name,
      subCategory:dataFromRedux?.subselectedCategory,
      education: dataFromRedux?.selectedaducation,
      address: dataFromRedux?.address,
      startingSalary: dataFromRedux?.minsalary,
      maximumSalary: dataFromRedux?.maxsalary,
      totalNumberOfStaff: dataFromRedux?.staff,
      minimumExperience: dataFromRedux?.minExperence,
      maximumExperience: dataFromRedux?.maxExperence,
      genderOfStaffShouldBe: dataFromRedux?.selectedGender,
      candidateSpeakingSkillShouldBe: dataFromRedux?.speakenglish,
      isWorkFromHome: dataFromRedux?.work,
      skills: skillss,
      suggestedSkills: skills,
      jobDescriptions: description,
      image: filename,
      availablity: dataFromRedux?.selectedavailablity,
    };

    console.log(data, '<<<========');
    const n = `${BASEURL}${apiName.POST_JOB}`;
    // console.log(userID,"<-----userid")

    try {
      const token = HeaderToken;
      console.log(token);
      const response = await axios.post(n, data, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data, 'jhdbhjdbvhjdsbvhjd=====>');
      // console.log('success====>');
      dispatch(setLoading(false));
      // navigation.navigate('JobdeteilPost')
  
      Show_Toast('success',Strings.UPLOAD_SUCCESSFULLY)
      setTimeout(() => {
        navigation.navigate('UploadJob');
      }, 1900);
    } catch (error) {
      console.error(error, '=========>');
      dispatch(setLoading(false));
      // Alert.alert('Error', 'Failed to fetch data');
    }
  };

  const removeSkill = index => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    if (!newSkill || newSkill.trim() === '') {
      Alert.alert('Please add a value');
    } else {
      setSkills([...skills, newSkill]);
      setNewSkill(''); // Clear the newSkill state
      setIsModalVisible(false);
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.SkillsViewMain}>
      <View style={[styles.SkilTextstylView]}>
        <Text style={styles.SkilTextstyl}>{item}</Text>
        <TouchableOpacity onPress={() => removeSkill(index)}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/Images/Vector(3).png')}
            style={{height: 13, width: 13, marginLeft: 7}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
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
    requestCameraPermission()
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
    }
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.white, paddingHorizontal: 8}}>
      <StatusBar backgroundColor={Colors.white} />
      {isLoading && <Loaderr />}
     
      <View style={styles.HeaderView}>
        <View style={{width: '10%'}} />
        <CommonText style={styles.headertxt}>Post Job</CommonText>
        <CommonText style={styles.headertxt1}>3/3</CommonText>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 7}}>
          {/* <CommonText style={styles.txtstyl2}>Skills</CommonText>
          <View style={styles.needstaff}>
            <TextInput
              placeholder="Type to search for skills"
              style={styles.selery}
              value={skillss}
              onChangeText={setskillss}
              //   keyboardType="numeric"
            />
          </View> */}
          <CommonText style={styles.txt}>Suggested Skills</CommonText>
          <View style={[styles.suggestedskills]}>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
              <FlatList
                scrollEnabled
                data={skills}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={}
              />
            </View>
          </View>
          <TouchableOpacity onPress={toggleModal} style={[styles.skillssadd]}>
            <Text style={styles.skillstxt}>Add More</Text>
            <Image
              source={require('../../../assets/Images/plusss.png')}
              style={{alignSelf: 'center', marginLeft: 5}}
            />
          </TouchableOpacity>
          <CommonText
            style={[styles.txtstyl2, {marginVertical: 10, marginTop: 30}]}>
            Job Descriptions
          </CommonText>

          <View style={styles.inputView2}>
            <TextInput
              // placeholder="Explain why you are the right person for this job"
              placeholderTextColor="rgba(170, 166, 185, 1)"
              style={styles.info}
              multiline={true}
              value={description}
              onChangeText={setdescription}
            />
          </View>

          {imagedata ? (
            <View
              style={[
                {
                  borderColor: 'grey',
                  borderRadius: 10,
                  marginBottom: 3,
                  alignSelf: 'center',
                },
              ]}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 80,
                }}>
                <TouchableOpacity
                  onPress={removeImage}
                  style={{position: 'absolute', top: 5, zIndex: 9, right: -5}}>
                  <Image
                    resizeMode="contain"
                    style={{height: 23, width: 23}}
                    source={require('../../../assets/Images/remove.png')}
                  />
                </TouchableOpacity>
                <Image
                  resizeMode="cover"
                  style={{
                    height: 153,
                    width: 153,
                    marginLeft: 5,
                    borderRadius: 80,
                    alignSelf: 'center',
                  }}
                  source={{uri: imagedata.path}}
                />
              </View>
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
                onPress={uploadDisabled ? undefined : handleOpenModal}>
                <Image source={require('../../../assets/Images/Icon.png')} />

                <View
                  style={{height: 50, width: 106, justifyContent: 'center'}}>
                  <Text style={styles.uploadcv}>Upload Image</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          )}
          <OpacityButton
            name="SUBMIT"
            button={styles.buttonstyl}
            // pressButton={()=>{navigation.navigate('JobdeteilPost')}}
            pressButton={handleSubmit}
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
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        // style={{backgroundColor: Colors.black56}}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(2,2,3,0.6)',
          }}>
          <View style={styles.ModalContainor}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '80%'}} />
              <TouchableOpacity onPress={handleCloseModal}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/Images/Vector(3).png')}
                  style={{height: 20, width: 20, marginBottom: 5}}
                />
              </TouchableOpacity>
            </View>
            <InputText
              txt="Add Skills"
              value={newSkill}
              onChangeText={text => setNewSkill(text)}
              inputstyl={styles.modalinput}
            />
            <OpacityButton name="Add" pressButton={handleAddSkill} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ThirdPostJob;

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
  SkilTextstyl: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.whitetxt,
    fontSize: 12,
  },
  info: {
    color: Colors.blacktxt,
    marginBottom: 5,
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
  },

  ModalContainor: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.86)',
    height: 240,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  SkillsViewMain: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 2,
    minWidth: 20,
    maxWidth: '95%',
    marginVertical: 3,
    minHeight: 20,
    maxHeight: 100,
  },
  SkilTextstylView: {
    backgroundColor: Colors.Bluebg,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginLeft: 5,
    flexDirection: 'row',
    paddingVertical: 7,
    minWidth: 20,
    maxWidth: '95%',
    marginVertical: 3,
    // minHeight: 20,
    minHeight: 40,
    maxHeight: 100,
    // minHeight: 40,
    // borderWidth:1,
  },
  modalContent: {
    height: 200,
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  suggestedskills: {
    flexDirection: 'row',
    // borderWidth: 1,
    minHeight: 5,
    maxHeight: 600,
  },
  buttonstyl: {width: '80%'},
  uploadcv: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.addcv,
    alignSelf: 'center',
    marginLeft: 7,
  },
  borderimg: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 318,
    alignSelf: 'center',
  },
  inputView2: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
    elevation: 5,
  },
  plusimg: {height: 14, width: 14, marginLeft: 7},
  skillstxt: {color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: 12},
  skillss: {
    backgroundColor: Colors.Bluebg,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    height: 38,
    marginHorizontal: 5,
    maxWidth: 310,
    alignSelf: 'center',
  },
  skillssadd: {
    backgroundColor: Colors.Bluebg,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    // height: 38,
    marginHorizontal: 5,

    alignSelf: 'flex-start',
  },
  txt: {
    color: '#AEAEAE',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    marginVertical: 20,
  },
  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    paddingVertical: 30,
    marginHorizontal: 19,
  },
  headertxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: Colors.blacktxt,
  },
  headertxt1: {fontFamily: 'Poppins-Medium', fontSize: 18, color: '#959595'},
  textinputview: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    height: 61,
    marginVertical: 10,
  },
  txtstyl2: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.txtcolor,
    marginTop: 15,
  },
  needstaff: {
    width: '100%',
    height: 61,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    padding: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  selery: {fontSize: 14, fontFamily: 'Montserrat-Bold'},
  modalinput: {
    width: 250,
  },
});
