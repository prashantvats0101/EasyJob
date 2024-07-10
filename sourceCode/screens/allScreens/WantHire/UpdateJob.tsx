import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Keyboard,
  ImageBackground,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Alert, TextInput, PermissionsAndroid
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import InputText from '../../../components/textInput';
import { CommonText, OpacityButton, } from '../../../components';
import { openPicker } from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../../utils/strings';
import { launchCamera } from 'react-native-image-picker';
import apiName, { BASEURL, } from '../../../Api/apiName';
import uploadImageMethod from '../../../utils/uploadimage';
import { setLoading } from '../../../Redux/reducer';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Show_Toast } from '../../../utils/helper';

const UpdateJob = () => {
  const itemDetail = useSelector((store) => store?.sliceReducer?.itemDetail)
  // console.log(itemDetail,"item===itemDetail")
  // console.log(itemDetail?.jobName,"JobName===")
  // const imgg = {
  //   path: `${itemDetail.image}`,
  // };

  const imgg = {path: `${itemDetail.image}`};
  // console.log(imgg, '====imgg=======');

  const [imagedata, setImagedata] = useState<Image | null>(imgg);
  const [selectedGender, setSelectedGender] = useState(itemDetail.genderOfStaffShouldBe);
  const [speakenglish, setspeakenglish] = useState(itemDetail.candidateSpeakingSkillShouldBe);
  const [work, setwork] = useState(itemDetail.isWorkFromHome ? 'true' : 'false');
  const [minExperence, setminExperence] = useState(String(itemDetail.minimumExperience));
  const [maxExperence, setmaxExperence] = useState(String(itemDetail.maximumExperience));
  // const [skillss, setskillss] = useState("hello");
  const [description, setdescription] = useState(itemDetail.jobDescriptions);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState(itemDetail.suggestedSkills); // suggestedSkills
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openjobtype, setOpenjobtype] = useState(false);
  const [education, setopeneducation] = useState(false);
  const [selectedaducation, setSelectedaducation] = useState(itemDetail.education);
  const [selectedjobtype, setSelectedjobtype] = useState(itemDetail.jobType);
  const [jobname, setjobname] = useState(itemDetail.jobName);
  const [address, setaddress] = useState(itemDetail.address);
  const [minsalary, setminsalary] = useState(String(itemDetail.startingSalary));
  const [maxsalary, setmaxsalary] = useState(String(itemDetail.maximumSalary));
  const [staff, setstaff] = useState(String(itemDetail.totalNumberOfStaff));
  const [openavailablity, setOpenavailablity] = useState(false);
  const [selectedavailablity, setSelectedavailablity] = useState(itemDetail.availablity);
  const [modalOpen, setModalOpen] = useState(false)
  const [userData, setUserData] = useState(null);
  const [jobOptions, setjobOptions] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [subselectedCategory, setSubselectedCategory] = useState(itemDetail?.subCategory);
  const [opensubCategory, setopenSubCategory] = useState(false);

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );

  const handleavailablity = () => {
    setOpenavailablity(true);
    setOpenavailablity(!openavailablity);
    setOpenjobtype(false);
    setopeneducation(false);
    setopenSubCategory(false)
    Keyboard.dismiss();
  };
  const handleselectedavailablity = option => {
    setSelectedavailablity(option);
    setOpenavailablity(false);
  };

  const handlejobtype = () => {
    setOpenjobtype(true);
    setopeneducation(false);
    setOpenjobtype(!openjobtype);
    setOpenavailablity(false);
    setopenSubCategory(false)
    Keyboard.dismiss();
  };
  const handleselectedjob = option => {
    console.log(option, "option======>")
    setSelectedjobtype(option);
    setSubselectedCategory('')
    subjobtype(option?._id);

    setOpenjobtype(false);
  };

  const handleselectededucation = option => {
    setSelectedaducation(option);
    setopeneducation(false);
  };


  const EducationOptios = [
    'High School Diploma/GED',
    "Some College/Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    'Doctoral Degree',
    'Professional Degree',
    'Other/Not Specified',
  ];
  const availabilityOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
    'Temporary',
    'Remote',
    'On-site',
    'Project-based',
    'Volunteer',
  ];
  const handleTextInputPress = () => {
    setOpenjobtype(false); // Close the dropdown
    setopeneducation(false);
    setOpenavailablity(false);
    setopenSubCategory(false)
  };
  const removeImage = () => {
    setImagedata(null); // Remove uploaded image
    setUploadDisabled(false); // Enable upload button
  };
 
  const pickImage = async () => {
    setModalOpen(false);
    try {
      openPicker({
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        console.log(image, '-------------->');
        setImagedata(image);
        setUploadDisabled(true);
        // dispatch(setLoading(true));
      });
    } catch (error) {
      console.log(error);
      // dispatch(setLoading(true));
    }
  };


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
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
  const renderItem = ({ item, index }) => (

    <View style={styles.SkillsViewMain}>
      <View style={[styles.SkilTextstylView]}>
        <Text style={styles.SkilTextstyl}>{item}</Text>
        <TouchableOpacity onPress={() => removeSkill(index)}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/Images/Vector(3).png')}
            style={{ height: 13, width: 13, marginLeft: 7 }}
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

        console.log('Camera Image:', image, "-=====");

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

  const handleUpdateJob = () => {
    if (!imagedata) {

      Show_Toast('error', 'Please Add Image')
    }

    else if (!jobname) {

      Show_Toast('error', Strings.empty_jobname)
    }
    else if (!selectedavailablity) {

      Show_Toast('error', Strings.empty_availiblity)
    } else if (!selectedaducation) {

      Show_Toast('error', Strings.empty_education)
    } else if (!address) {

      Show_Toast('error', Strings.empty_address)
    } else if (!minsalary) {

      Show_Toast('error', Strings.empty_minsalary)
    } else if (!maxsalary) {

      Show_Toast('error', Strings.empty_maxsalary)
    } else if (!staff) {

      Show_Toast('error', Strings.empty_staff)
    }
    else if (!minExperence) {

      Show_Toast('error', Strings.empty_minExperence)
    } else if (!maxExperence) {

      Show_Toast('error', Strings.empty_maxExperence)
    }

    else if (skills.length === 0) {

      Show_Toast('error', Strings.empty_suggestSkills)
    } else if (!description) {

      Show_Toast('error', Strings.empty_Description)
    } else {
      // console.log("goback")
      // saveJob()
      if (imagedata.path === imgg.path) { 
        saveJob(); 
      } else {
        uploadImage(); 
      }
    }
  }



  const saveJob = async filename => {
    const n = `${BASEURL}${apiName.JOB_EDIT}${itemDetail?._id}`;
    // console.log(userData, 'imagedata=====>');
    try {
      const token = HeaderToken;
      // console.log(token,"hhhh")
      const data = {
      
        image: filename != null ? filename : itemDetail?.image,
        jobName: jobname,
        jobType: selectedjobtype.name,
        subCategory: subselectedCategory,
        education: selectedaducation,
        address: address,
        startingSalary: minsalary,
        maximumSalary: maxsalary,
        totalNumberOfStaff: staff,
        minimumExperience: minExperence,
        maximumExperience: maxExperence,
        genderOfStaffShouldBe: selectedGender,
        candidateSpeakingSkillShouldBe: speakenglish,
        isWorkFromHome: work,
        skills: 'hhh',
        suggestedSkills: skills,
        availablity: selectedavailablity,
        jobDescriptions: description
      };
      // console.log(data,"dattttttaaa=>>>>>>>")
      const response = await axios.put(n, data, {
        headers: {
          Authorization: token,
        },
      });

      Show_Toast('success', 'Your Job Is Updated')
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
      console.log('JOb_updated_successfully:=====>', response.data);
      dispatch(setLoading(false));
    } catch (error) {

      console.error('error=====>>', error);
      dispatch(setLoading(false));
    }
  };



  const uploadImage = async () => {
   
    // console.log('called upload profile======')
    try {
      dispatch(setLoading(true));
      const filename = await uploadImageMethod(imagedata, setLoading);
     
      saveJob(filename);
     
    } catch (error) {
      uploadImage();
      dispatch(setLoading(false));
      console.error('Image upload error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handlesubcatagary = () => {
    if (!selectedjobtype.name) {

      Show_Toast('error', 'Please select again Job type first')

    } else {
      setopenSubCategory(true);
      setopenSubCategory(!opensubCategory);
    }
    setOpenavailablity(false);
    setopeneducation(false);
    setOpenjobtype(false);
    Keyboard.dismiss();
  };
  const handleeducation = () => {
    setopeneducation(true);
    setOpenjobtype(false);
    setopeneducation(!education);
    setOpenavailablity(false);
    setopenSubCategory(false)
    Keyboard.dismiss();
  };

  useEffect(() => {
    jobtypeoptions();
  }, []);

  const jobtypeoptions = async () => {
    dispatch(setLoading(true));
    const n = `${BASEURL}${apiName.GET_JOB_TYPE}`;
    try {
      const token = HeaderToken;
      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });

      let x = response.data?.data?.jobCategories;
      setjobOptions(x);
      dispatch(setLoading(false));
      // console.log(x,"respoenes=>====>")
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error, 'error=====>>>');
    }
  };
  const subjobtype = async (id) => {
    dispatch(setLoading(true));

    const url = `${BASEURL}${apiName.SUB_CATEGORY_GET}${id}`;
    try {
      const token = HeaderToken;

      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      let y = response.data?.data;
      console.log('subjobetype hit');

      setSubOptions(y);
      dispatch(setLoading(false));
      console.log(y, 'reeeeeeeess');
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const handleselectsubcat = option => {
    setSubselectedCategory(option);
    setopenSubCategory(false);
  };

  const renderItem2 = ({ item }) => {
    return (
      <TouchableOpacity style={{ height: 40 }} onPress={() => handleselectedjob(item)}>
        <Text style={styles.txtstyl}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem3 = ({ item }) => {
    // console.log(item,"hhhhhhhh")
    return (
      <TouchableOpacity style={{ height: 40 }} onPress={() => handleselectsubcat(item.name)}>
        <Text style={styles.txtstyl}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <HeaderComp txt="Update Job" img={require('../../../assets/Images/arrowback.png')} />
      <View style={{ zIndex: 9, position: 'absolute', alignSelf: 'center' }}>

      </View>
      <ScrollView
        scrollEnabled={!openjobtype && !education}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <InputText
          txt="Job Name"
          value={jobname}
          onChangeText={setjobname}
          onFocus={handleTextInputPress}
        />
        <TouchableOpacity style={styles.textinputview} onPress={handlejobtype}>
          <CommonText style={styles.inputtxt}>Job Type</CommonText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 15,
            }}>
            <View style={styles.input}>
              <Text style={styles.txtstyl}> {selectedjobtype.name ? selectedjobtype.name : selectedjobtype}</Text>
            </View>
            <Image
              source={require('../../../assets/Images/Downarrow.png')}
              style={styles.dropdownstyl}
            />
          </View>
        </TouchableOpacity>
        {openjobtype && (
          <View style={styles.dropdowncontanior}>
            <FlatList
              data={jobOptions}
              renderItem={renderItem2}
              keyExtractor={item => item.key}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.textinputview}
          onPress={handlesubcatagary}
        >
          <CommonText style={styles.inputtxt}>Sub Category</CommonText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 15,
            }}>
            <View style={styles.input}>
              <Text style={styles.txtstyl}>{subselectedCategory}</Text>
            </View>
            <Image
              source={require('../../../assets/Images/Downarrow.png')}
              style={styles.dropdownstyl}
            />
          </View>
        </TouchableOpacity>

        {opensubCategory && (

          <View style={styles.dropdowncontanior5}>
            <FlatList
              data={subOptions}
              renderItem={renderItem3}
              keyExtractor={item => item.key}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.textinputview}
          onPress={handleavailablity}>
          <CommonText style={styles.inputtxt}>Availability</CommonText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 15,
            }}>
            <View style={styles.input}>
              <Text style={styles.txtstyl}>{selectedavailablity}</Text>
            </View>
            <Image
              source={require('../../../assets/Images/Downarrow.png')}
              style={styles.dropdownstyl}
            />
          </View>
        </TouchableOpacity>
        {openavailablity && (
          <ScrollView scrollEnabled style={styles.dropdowncontanior3}>
            {availabilityOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleselectedavailablity(option)}
                style={{ height: 40 }}>
                <Text style={styles.txtstyl}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          style={styles.textinputview}
          onPress={handleeducation}>
          <CommonText style={styles.inputtxt}>Education</CommonText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 15,
            }}>
            <View style={styles.input}>
              <Text style={styles.txtstyl}>{selectedaducation}</Text>
            </View>
            <Image
              source={require('../../../assets/Images/Downarrow.png')}
              style={styles.dropdownstyl}
            />
          </View>
        </TouchableOpacity>

        {education && (
          <ScrollView scrollEnabled style={styles.dropdowncontanior4}>
            {EducationOptios.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleselectededucation(option)}
                style={{ height: 40 }}>
                <Text style={styles.txtstyl}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={[styles.inputView]}>
          <View style={[styles.textinputview1]}>
            <CommonText style={[styles.inputtxt1]}>Address </CommonText>
            <TextInput
              style={[styles.input1]}
              value={address}
              onChangeText={setaddress}
              multiline={true}
              onFocus={handleTextInputPress}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <CommonText style={styles.txtstyl2}>
            I will pay A Monthly salary of
          </CommonText>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <View style={styles.selleryinput}>
              <TextInput
                placeholder="RS 10000"
                style={styles.inputtxtt}
                keyboardType="numeric"
                value={minsalary}
                onChangeText={setminsalary}
                maxLength={9}
                onFocus={handleTextInputPress}
              />
            </View>
            <CommonText style={styles.tostyl}>To</CommonText>
            <View style={styles.selleryinput}>
              <TextInput
                placeholder="RS 10000"
                style={styles.inputtxtt}
                keyboardType="numeric"
                value={maxsalary}
                onChangeText={setmaxsalary}
                maxLength={9}
                onFocus={handleTextInputPress}
              />
            </View>
          </View>
          <CommonText style={styles.txtstyl2}>No of staff I need</CommonText>
          <View style={styles.needstaff}>
            <TextInput
              placeholder="3"
              style={styles.inputtxtt}
              keyboardType="numeric"
              value={staff}
              onChangeText={setstaff}
              maxLength={3}
              onFocus={handleTextInputPress}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 17 }}>
          <CommonText style={styles.txtstyl2}>Experience</CommonText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <InputText
              txt="Minimum Experience"
              style={styles.expinput}
              styletxt={{ left: 12 }}
              inputstyl={{ marginLeft: 13 }}
              keyboardType="numeric"
              value={minExperence}
              onChangeText={setminExperence}
              length={2}
              onFocus={handleTextInputPress}
            />
            <InputText
              txt="Maximum Experience"
              style={styles.expinput}
              styletxt={{ left: 12 }}
              inputstyl={{ marginLeft: 13 }}
              keyboardType="numeric"
              value={maxExperence}
              onChangeText={setmaxExperence}
              length={2}
              onFocus={handleTextInputPress}
            />
          </View>
          <CommonText style={styles.txtstyl2}>
            Gender of the staff should be
          </CommonText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              width: '80%',
            }}>
            <TouchableOpacity
              style={styles.Selectg}
              onPress={() => setSelectedGender('Male')}>
              {selectedGender === 'Male' && (
                <Image
                  source={require('../../../assets/Images/selectedicon.png')}
                  style={styles.Selectedicon}
                />
              )}
            </TouchableOpacity>
            <CommonText style={styles.txts}>Male</CommonText>

            <TouchableOpacity
              style={[styles.Selectg, { marginLeft: 30 }]}
              onPress={() => setSelectedGender('Female')}>
              {selectedGender === 'Female' && (
                <Image
                  source={require('../../../assets/Images/selectedicon.png')}
                  style={styles.Selectedicon}
                />
              )}
            </TouchableOpacity>
            <CommonText style={[styles.txts]}>Female</CommonText>
            <TouchableOpacity
              style={[styles.Selectg, { marginLeft: 30 }]}
              onPress={() => setSelectedGender('Both')}>
              {selectedGender === 'Both' && (
                <Image
                  source={require('../../../assets/Images/selectedicon.png')}
                  style={styles.Selectedicon}
                />
              )}
            </TouchableOpacity>
            <CommonText style={[styles.txts]}>Both</CommonText>
          </View>
          <CommonText style={[styles.txtstyl2, { marginTop: 20 }]}>
            Candidate’s English Speaking skill should be
          </CommonText>
          <View
            style={{
              height: 90,
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.Selectg, , { marginRight: 10 }]}
                onPress={() => setspeakenglish('Do not speak English')}>
                {speakenglish === 'Do not speak English' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={[styles.txtsenglish]}>
                Do not speak english
              </CommonText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.Selectg, { marginRight: 10 }]}
                onPress={() => setspeakenglish('Speak Good English')}>
                {speakenglish === 'Speak Good English' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={[styles.txtsenglish]}>Speak Good English</CommonText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.Selectg, { marginRight: 10 }]}
                onPress={() => setspeakenglish('Speak Fluent English')}>
                {speakenglish === 'Speak Fluent English' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={[styles.txtsenglish]}>
                Speak Fluent English
              </CommonText>
            </View>
          </View>
          <CommonText style={[styles.txtstyl2, { marginTop: 20 }]}>
            Is it a work from Home Job ?
          </CommonText>
          <View style={{ justifyContent: 'center', height: 60, width: '70%', }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.Selectg, { marginRight: 10 }]}
                onPress={() => setwork('true')}
              >
                {work === 'true' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={[styles.Selectedicon]}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={styles.txtsenglish}>Yes</CommonText>
              <TouchableOpacity
                style={[styles.Selectg, { marginLeft: 60, marginRight: 10 }]}
                onPress={() => setwork('false')}
              >
                {work === 'false' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={[styles.txtsenglish]}>No</CommonText>
            </View>

          </View>
        </View>
        <View style={{ paddingHorizontal: 7 }}>
        
          <CommonText style={styles.txt}>Suggested Skills</CommonText>
          <View style={[styles.suggestedskills]}>
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
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
              style={{ alignSelf: 'center', marginLeft: 5 }}
            />
          </TouchableOpacity>

          <CommonText
            style={[styles.txtstyl2, { marginVertical: 10, marginTop: 30 }]}>
            Job Descriptions
          </CommonText>
          <View style={[styles.inputView, {
            backgroundColor: '#FFFFFF', elevation: 5, minHeight: 100,
            width: '100%', maxHeight: 400
          }]}>
            <TextInput
              // placeholder="Explain why you are the right person for this job"
              placeholderTextColor="rgba(170, 166, 185, 1)"
              style={styles.info}
              multiline={true}
              value={description}
              onChangeText={setdescription}
              onFocus={handleTextInputPress}
            />
          </View>
          {imagedata ? (

            <View style={[{ borderColor: 'grey', borderRadius: 10, marginBottom: 3, alignSelf: 'center' }]}>
              <View style={{ width: 150, height: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 80, }}>
                <TouchableOpacity onPress={removeImage} style={{ position: 'absolute', top: 5, zIndex: 9, right: -5, }}>
                  <Image resizeMode='contain' style={{ height: 23, width: 23, backgroundColor: 'red', borderRadius: 20 }} source={require('../../../assets/Images/remove.png')} />
                </TouchableOpacity>
                <Image resizeMode='cover' style={{ height: 153, width: 153, marginLeft: 5, borderRadius: 80, alignSelf: 'center' }} source={{ uri: imagedata.path }} />
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

                <View style={{ height: 50, width: 86, justifyContent: 'center' }}>
                  <Text style={styles.uploadcv}>Upload Logo</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          )}
          <OpacityButton
            name="UPDATE"
            button={styles.buttonstyl}
            // pressButton={()=>{navigation.navigate('JobdeteilPost')}}
            pressButton={handleUpdateJob}
          />
        </View>
      </ScrollView>
      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalmainview}>
          <View style={styles.modaldataview}>

            <View style={{ justifyContent: 'space-between', width: "100%", }}>
              <OpacityButton
                name="Open Gallery"
                button={{ width: 150 }}
                pressButton={() => pickImage()}
              />
              <OpacityButton
                name="Open Camera"
                button={{ width: 150, marginTop: 0 }}
                pressButton={() => openCamera()}
              />
            </View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => setModalOpen(false)}>
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
        <View style={{ flex: 1, justifyContent: 'center', }}>
          <View style={styles.ModalContainor}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '80%' }} />
              <TouchableOpacity onPress={handleCloseModal}>
                <Image resizeMode='contain' source={require('../../../assets/Images/Vector(3).png')} style={{ height: 20, width: 20, marginBottom: 5 }} />
              </TouchableOpacity>
            </View>
            <InputText
              txt="Add Skills"
              value={newSkill}
              onChangeText={text => setNewSkill(text)}
              inputstyl={styles.modalinput}
              onFocus={handleTextInputPress}
            />
            <OpacityButton name="Add" pressButton={handleAddSkill} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UpdateJob;

const styles = StyleSheet.create({
  input1: {
    width: '100%', // Adjusted width
    fontSize: 14,
    color: Colors.blacktxt,
    marginTop: 14,
    fontFamily: 'Montserrat-Bold',
    minHeight: 42,
    maxHeight: 400,
  },
  inputtxt1: {
    color: Colors.black56,
    fontSize: 10,
    marginLeft: 3.8,
    position: 'absolute',
    top: 9,
    fontFamily: 'Montserrat-Bold',
    width: '100%',
  },
  textinputview1: { width: '90%', alignSelf: 'center', marginLeft: 10 },

  inputView: {
    backgroundColor: Colors.inputbackground,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  modalmainview: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, width: '100%',
    backgroundColor: 'rgba(2,2,3,0.7)'
  },
  modaldataview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 250,
    width: 250,
    borderRadius: 10,
    alignSelf: 'center',
  }, needstaff: {
    width: '100%',
    height: 61,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    padding: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  // selery: {fontSize: 14, fontFamily: 'Montserrat-Bold'},
  tostyl: { fontFamily: 'Montserrat-Bold', marginHorizontal: 10 },
  selleryinput: {
    width: 130,
    height: 61,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    alignItems: 'center',
    paddingVertical: 30,
    marginHorizontal: 19,
  },
  headertxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: Colors.blacktxt,
  },
  headertxt1: { fontFamily: 'Poppins-Medium', fontSize: 18, color: '#959595' },
  textinputview: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    height: 61,
    marginVertical: 10,
  },
  inputtxt: {
    color: 'background: rgba(0, 0, 0, 0.56)',
    fontSize: 10,
    marginLeft: 15,
    position: 'absolute',
    top: 9,
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    height: 39.8,
    width: 260,
    fontSize: 14,
    color: Colors.blacktxt,
    marginTop: 14,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 8,
    // borderWidth:1,
    justifyContent: 'center',
  },
  dropdownstyl: { alignSelf: 'center', marginTop: 7 },
  dropdowncontanior: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    zIndex: 9,
    position: 'absolute',
    marginTop: 145,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  txtstyl: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.blacktxt,
    fontSize: 14,
    marginLeft: 7,
    marginTop: 6,
  },
  txtstyl2: { fontFamily: 'Montserrat-Bold', color: Colors.txtcolor },
  dropdowncontanior3: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    zIndex: 9,
    position: 'absolute',
    top: 305,
    backgroundColor: Colors.white,
    elevation: 5,
    height: 250,
  },
  dropdowncontanior4: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    zIndex: 9,
    position: 'absolute',
    top: 385,
    backgroundColor: Colors.white,
    elevation: 5,
    height: 250,
  },
  dropdowncontanior5: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    zIndex: 9,
    position: 'absolute',
    marginTop: 225,
    backgroundColor: Colors.white,
    elevation: 5,
    // height: 250,
  },
  expinput: { width: 150 },
  Selectg: {
    height: 19,
    width: 19,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.lightWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Selectedicon: { height: 19, width: 19 },
  txts: { fontFamily: 'Montserrat-Bold', fontSize: 14, color: Colors.lightbrown, marginLeft: 10 },
  ButtonStyl: { width: '70%', marginTop: 90 },
  /////////
  SkilTextstyl: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.whitetxt,
    fontSize: 12,
  },
  info: {
    color: Colors.blacktxt,
    marginBottom: 5,
    fontFamily: 'DMSans-Medium',
    fontSize: 12, alignSelf: 'flex-start',
    minHeight: 50, maxHeight: 300, width: '100%'
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
  buttonstyl: { width: '80%' },
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
  plusimg: { height: 14, width: 14, marginLeft: 7 },
  skillstxt: { color: '#FFFFFF', fontFamily: 'Montserrat-Medium', fontSize: 12 },
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


  typeskills: {
    width: '100%',
    height: 61,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    // padding: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  selery: { fontSize: 14, fontFamily: 'Montserrat-Bold', },
  modalinput: {
    width: 250,
  },
  ////

  txtsenglish: {
    fontFamily: 'Montserrat-Bold', fontSize: 14, color: Colors.lightbrown
  },
  inputtxtt: { fontSize: 14, fontFamily: 'Montserrat-Bold', color: Colors.blacktxt },



});

