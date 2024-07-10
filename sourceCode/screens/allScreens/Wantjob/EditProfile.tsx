import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonText, OpacityButton} from '../../../components';
import InputText from '../../../components/textInput';
import HeaderComp from '../../../components/HeaderComp';
import {Colors} from '../../../constant';
import {openPicker} from 'react-native-image-crop-picker';
import CalendarPicker from 'react-native-calendar-picker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../../Redux/reducer';
import {setProfiledata} from '../../../Redux/cookiesReducer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Strings from '../../../utils/strings';
import apiName, {BASEURL, IMAGE_UPLOAD} from '../../../Api/apiName';
import uploadImageMethod from '../../../utils/uploadimage';
import Loaderr from '../StartingScreens/Loaderr';
import {updateJobSeekerProfile} from '../../../utils/updateprofile';
import {Show_Toast} from '../../../utils/helper';

const EditProfile = () => {
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  // console.log(HeaderToken);
  const dataFromRedux = useSelector<any>(state => state?.cookies?.profiledata);
  // const jobdata = dataFromRedux?.userjobProfile;
  // console.log(jobdata, 'hhhh====');
  const y = dataFromRedux?.getLoginUserProfile;
  const x = dataFromRedux?.getLoginUserProfile?.DOB;

  const oldformatDate = dob => {
    const date = new Date(dob);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthName = monthNames[monthIndex];
    return `${day} ${monthName} ${year}`;
  };
  const formattedDOB = oldformatDate(x);

  const imgg = {path: `${y?.image}`};
  // console.log(imgg, '====imgg');

  const [imagedata, setImagedata] = useState<any>(imgg);
  const [selectedGender, setSelectedGender] = useState(y?.gender);
  const [selectedDate, setSelectedDate] = useState(formattedDOB);
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [name, setName] = useState(y?.name);
  const [email, setEmail] = useState(y?.email);
  const [mobileNumber, setMobileNumber] = useState(y?.mobileNumber);
  const [alternateMobileNumber, setAlternateMobileNumber] = useState(
    y?.alterNateNumber,
  );
  const [address, setAddress] = useState(y?.address);
  const [information, setInformation] = useState(y?.information);
  const [currentSalary, setCurrentSalary] = useState(
   y?.currentSalary,
  );
  const [openjobtype, setOpenjobtype] = useState(false);

  const [openavailablity, setOpenavailablity] = useState(false);
  const [selectedavailablity, setSelectedavailablity] = useState(
    y?.availability,
  );
  const [openexperence, setOpenexperence] = useState(false);
  const [selectedexperence, setSelectedexperence] = useState(
    y?.experience,
  );
  const [openeducation, setOpeneducation] = useState(false);
  const [selectedeeducation, setSelectededucation] = useState(
    y?.education,
  );
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [jobOptions, setjobOptions] = useState([]);
  const [subOptions, setSubOptions] = useState([]);

  const [opensubCategory, setopenSubCategory] = useState(false);
  const [subselectedCategory, setSubselectedCategory] = useState(
    y?.subCategory,
  );
  const [selectedjobtype, setSelectedjobtype] = useState({ name: y?.jobType || '' });
  // console.log(jobdata, 'typeeee==', selectedjobtype);

  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);



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


  const handleeducation = () => {
    setOpenexperence(false);
    setOpeneducation(!openeducation);
    setOpenjobtype(false);
    setOpenavailablity(false);
    Keyboard.dismiss();
  };
  const handleselectededucation = option => {
    setSelectededucation(option);
    setOpeneducation(false);
  };

  const handleexperence = () => {
    setOpenexperence(true);
    setOpenexperence(!openexperence);
    setOpenjobtype(false);
    setOpenavailablity(false);
    setOpeneducation(false);
    Keyboard.dismiss();
  };
  const handleselectedexperence = option => {
    setSelectedexperence(option);
    setOpenexperence(false);
  };

  const handlejobtype = () => {
    setOpenjobtype(true);
    setOpenjobtype(!openjobtype);
    setOpenavailablity(false);
    setOpenexperence(false);
    setOpeneducation(false);
    setopenSubCategory(false);
    Keyboard.dismiss();
  };

  const handleavailablity = () => {
    setOpenavailablity(true);
    setOpenavailablity(!openavailablity);
    setOpenjobtype(false);
    setOpenexperence(false);
    setOpeneducation(false);
    Keyboard.dismiss();
  };
  const handleselectedavailablity = option => {
    setSelectedavailablity(option);
    setOpenavailablity(false);
  };

  const experianceOptions = [
    'Entry Level (0-1 years)',
    'Junior Level (1-3 years)',
    'Mid Level (3-5 years)',
    'Senior Level (5+ years)',
    'Executive Level (10+ years)',
  ];
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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleTextInputPress = () => {
    // setOpenjobtype(false);
    // setOpenavailablity(false);
    // setOpeneducation(false);
    // setOpenexperence(false);
  };
  const isValidEmail = email => {
    return emailRegex.test(email);
  };

  const handleDateChange = date => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setCalendarVisibility(false);
  };

  const formatDate = dob => {
    const date = new Date(dob);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthName = monthNames[monthIndex];
    return `${day} ${monthName} ${year}`;
  };

  const today = new Date();
// console.log(imagedata,"imagedata===")
  const uploadImage = async () => {
   
    // console.log('called upload profile======')
    try {
      dispatch(setLoading(true));
      const filename = await uploadImageMethod(imagedata, setLoading);
     
      saveProfile(filename);
     
    } catch (error) {
      uploadImage();
      dispatch(setLoading(false));
      console.error('Image upload error:', error);
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
        console.log(image, '-------------->');
        setImagedata(image);
        // dispatch(setLoading(true));
      });
    } catch (error) {
      console.log(error);
      // dispatch(setLoading(true));
    }
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlesavee = () => {
    if (!name) {
      Show_Toast('error', Strings.Editname);
    } else if (!email) {
      Show_Toast('error', Strings.Editemail);
    } else if (!isValidEmail(email.trim())) {
      Show_Toast('error', Strings.Editemail_Valid);
    } else if (!mobileNumber) {
      Show_Toast('error', Strings.EditmobileNumber);
    } else if (mobileNumber.length < 10) {
      Show_Toast('error', Strings.EditmobileNumberLength);
    } else if (!alternateMobileNumber) {
      Show_Toast('error', Strings.EditalternateMobileNumber);
    } else if (mobileNumber === alternateMobileNumber) {
      Show_Toast('error', Strings.Edit_Same_Mobile_or_Alternate);
    } else if (alternateMobileNumber.length < 10) {
      Show_Toast('error', Strings.EditalternateMobileNumberLength);
    } else if (!selectedGender) {
      Show_Toast('error', Strings.EditselectedGender);
    } else if(!selectedjobtype.name){
      Show_Toast('error',Strings.selectedjobtypee)
    } else if (!subselectedCategory) {
      Show_Toast('error', 'Please Select Sub Category');
    } else if (!selectedavailablity) {
      Show_Toast('error',Strings.selectedavailablityy)
    } else if (!selectedexperence) {
      Show_Toast('error',Strings.selectedexperencee)
    } else if (!selectedeeducation) {
      Show_Toast('error',Strings.selectedeeducationn)
    } else if (!selectedDate) {
      Show_Toast('error', Strings.EditselectedDate);
    } else if (!address) {
      Show_Toast('error', Strings.Editaddress);
    } else if (!currentSalary) {
      Show_Toast('error', 'Please Enter Current Salary');
    } else if (!information) {
      Show_Toast('error', 'Please Enter Your Information');
    } else {
      // saveProfile();
      if (imagedata.path === imgg.path) { 
        saveProfile(); 
      } else {
        uploadImage(); 
      }
    }
  };
  // console.log(y?.image,"hellooooo===")
  const saveProfile = async filename => {
    dispatch(setLoading(true))
  //  console.log('called save profile======')
    const n = `${BASEURL}${apiName.EDIT_PROFILE_JobSEEKER}`;
    try {
      const token = HeaderToken;
      const data = {
        name: name,
        email: email,
        gender: selectedGender,
        DOB: selectedDate,
        address: address,
        alterNateNumber: alternateMobileNumber,
        image: filename != null ? filename : y?.image,
        currentSalary: currentSalary,
        information: information,
        jobType: selectedjobtype.name,
        experience: selectedexperence,
        education: selectedeeducation,
        availability: selectedavailablity,
        subCategory: subselectedCategory,
      };
      console.log(data, 'data======>');
      const response = await axios.put(n, data, {
        headers: {
          Authorization: token,
        },
      });
      fetchData();
      Show_Toast('success', 'Your Profile is Updated Successfully');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
      console.log('Profile updated successfully:ajay', response.data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error('Error updating profile:', error);
      dispatch(setLoading(false));
    }
  };

  ////////////////////////

  const fetchData = async () => {
    const n = `${BASEURL}${apiName.JOBSEEKER_PROFILE_DATA}`;
    try {
      const token = HeaderToken;
      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });
      let x = response?.data?.data;
      dispatch(setProfiledata(x));
    } catch (error) {
      console.error('Error fetching data:', error);
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
    requestCameraPermission();
  };
  const handleselectsubcat = option => {
    setSubselectedCategory(option);
    setopenSubCategory(false);
  };
  const handlesubcatagary = () => {
    if (!selectedjobtype.name) {
      Show_Toast('error', 'Please select a job type first');
    } else {
      setopenSubCategory(true);
      setopenSubCategory(!opensubCategory);
    }
    setOpenavailablity(false);
    setOpenexperence(false);
    setOpeneducation(false);
    setOpenjobtype(false);
    Keyboard.dismiss();
  };

  const handleselectedjob = option => {
    // console.log(option,"option======>")
    setSelectedjobtype(option);
    setSubselectedCategory('');
    subjobtype(option?._id);

    setOpenjobtype(false);
  };
  useEffect(() => {
    jobtypeoptions();
    requestCameraPermission();
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
      console.log(x,"respoenes=>====>")
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error, 'error=====>>>');
    }
  };

  // console.log(selectedjobtype.name,"jhdjhde")
  const subjobtype = async id => {
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

  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleselectedjob(item)}>
        <Text style={styles.txtstyl}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem3 = ({item}) => {
    // console.log(item,"hhhhhhhh")
    return (
      <TouchableOpacity onPress={() => handleselectsubcat(item.name)}>
        <Text style={styles.txtstyl}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.whitetxt}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.whitetxt} />
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt="Edit Profile"
      />

      <ScrollView
        scrollEnabled={!openjobtype && !openavailablity && !openexperence}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        style={{paddingTop: 1}}>
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
        {isLoading && <Loaderr />}

        <View style={[styles.inputViewname]}>
          <View style={[styles.textinputview]}>
            <CommonText style={[styles.inputtxtname]}>Name </CommonText>
            <TextInput
              style={[styles.input]}
              value={name}
              onChangeText={setName}
              onFocus={handleTextInputPress}
              multiline={true}
            />
          </View>
        </View>
        <InputText
          txt="Email"
          value={email.trim()}
          onChangeText={setEmail}
          onFocus={handleTextInputPress}
        />
        <InputText
          onFocus={handleTextInputPress}
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
          onFocus={handleTextInputPress}
          txt="Alternate Mobile Number"
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
          <CommonText style={styles.gendertxt}>Gender</CommonText>
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
              <CommonText style={styles.txts}>Male</CommonText>
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
              <CommonText style={[styles.txts]}>Female</CommonText>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.inputView} onPress={handlejobtype}>
            <CommonText style={styles.inputtxt}>Job Type</CommonText>
            <View style={styles.dropdownArrow}>
              <Image source={require('../../../assets/Images/Downarrow.png')} />
            </View>
            <CommonText style={styles.Selectedop}>
              {selectedjobtype.name ? selectedjobtype.name : selectedjobtype}
            </CommonText>
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
            style={styles.inputView}
            onPress={handlesubcatagary}>
            <CommonText style={styles.inputtxt}>Sub Category</CommonText>
            <View style={styles.dropdownArrow}>
              <Image source={require('../../../assets/Images/Downarrow.png')} />
            </View>
            <CommonText style={styles.Selectedop}>
              {subselectedCategory}
            </CommonText>
          </TouchableOpacity>
          {opensubCategory && (
            <View style={styles.dropdowncontanior1}>
              <FlatList
                data={subOptions}
                renderItem={renderItem3}
                keyExtractor={item => item.key}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.inputView}
            onPress={handleavailablity}>
            <CommonText style={styles.inputtxt}>Availability</CommonText>
            <View style={styles.dropdownArrow}>
              <Image source={require('../../../assets/Images/Downarrow.png')} />
            </View>
            <CommonText style={styles.Selectedop}>
              {selectedavailablity}
            </CommonText>
          </TouchableOpacity>
          {openavailablity && (
            <ScrollView scrollEnabled style={styles.dropdowncontanior2}>
              {availabilityOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleselectedavailablity(option)}
                  style={{height: 40}}>
                  <Text style={styles.txtstyl}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <TouchableOpacity style={styles.inputView} onPress={handleexperence}>
            <CommonText style={styles.inputtxt}>Experiance</CommonText>
            <View style={styles.dropdownArrow}>
              <Image source={require('../../../assets/Images/Downarrow.png')} />
            </View>
            <CommonText style={styles.Selectedop}>
              {selectedexperence}
            </CommonText>
          </TouchableOpacity>
          {openexperence && (
            <ScrollView scrollEnabled style={styles.dropdowncontanior3}>
              {experianceOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleselectedexperence(option)}
                  style={{height: 40}}>
                  <Text style={styles.txtstyl}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <TouchableOpacity style={styles.inputView} onPress={handleeducation}>
            <CommonText style={styles.inputtxt}>Education</CommonText>
            <View style={styles.dropdownArrow}>
              <Image source={require('../../../assets/Images/Downarrow.png')} />
            </View>
            <CommonText style={styles.Selectedop}>
              {selectedeeducation}
            </CommonText>
          </TouchableOpacity>
          {openeducation && (
            <ScrollView scrollEnabled style={styles.dropdowncontanior4}>
              {EducationOptios.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleselectededucation(option)}
                  style={{height: 40}}>
                  <Text style={styles.txtstyl}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        <TouchableOpacity
          onPress={() => setCalendarVisibility(true)}
          style={styles.inputView}
          activeOpacity={1}>
          <CommonText style={styles.inputtxt}>DOB</CommonText>
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

        <View style={[styles.inputViewname]}>
          <View style={[styles.textinputview]}>
            <CommonText style={[styles.inputtxtname]}>Address </CommonText>
            <TextInput
              style={[styles.input]}
              value={address}
              onChangeText={setAddress}
              onFocus={handleTextInputPress}
              multiline={true}
            />
          </View>
        </View>
        <InputText
          onFocus={handleTextInputPress}
          txt="Current Salary"
          length={10}
          keyboardType="numeric"
          // value={currentSalary.length > 0 ? `Rs ${currentSalary}` : ''}
          value={currentSalary}
          onChangeText={text => {
            if (text.startsWith('Rs ')) {
              setCurrentSalary(text.substring(3));
            } else {
              setCurrentSalary(text);
            }
          }}
        />
        <CommonText style={styles.txt}>Information</CommonText>
        <View style={styles.inputView2}>
          <TextInput
            onFocus={handleTextInputPress}
            // placeholder="Explain why you are the right person for this job"
            placeholderTextColor="rgba(170, 166, 185, 1)"
            style={styles.info}
            multiline={true}
            value={information}
            onChangeText={setInformation}
          />
        </View>

        <OpacityButton
          name="Update"
          button={styles.ButtonStyl}
          pressButton={() => {
            handlesavee();
          }}
          // pressButton={handleNext}
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

export default EditProfile;

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
  inputtxtname: {
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
  textinputview: {width: '90%', alignSelf: 'center', marginLeft: 15},

  inputViewname: {
    backgroundColor: Colors.inputbackground,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  txtstyl: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.blacktxt,
    fontSize: 14,   
    marginLeft: 4,
 marginVertical:10
  },
  dropdowncontanior2: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    zIndex: 9,
    position: 'absolute',
    top: 220,
    backgroundColor: Colors.white,
    elevation: 5,
    height: 220,
  },
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
  },
  dropdowncontanior4: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    zIndex: 9,
    position: 'absolute',
    top: 388,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  dropdowncontanior1: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    zIndex: 9,
    position: 'absolute',
    backgroundColor: Colors.white,
    top: 140,
    elevation: 5,
    minHeight: 50,
    maxHeight: 200,
  },
  Selectedop: {
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 9,
    marginTop: 5,
  },
  dropdownArrow: {
    position: 'absolute',
    top: 28,
    right: 19,
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
    marginLeft: 9,
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
  info: {
    color: Colors.blacktxt,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    marginBottom: 5,
  },
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
  txt: {fontFamily: 'Montserrat-Bold', marginLeft: 20},
  dropdowncontanior: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    zIndex: 9,
    position: 'absolute',
    marginTop: 60,
    backgroundColor: Colors.white,
    elevation: 5,
    minHeight: 50,
    maxHeight: 200,
  },
});
