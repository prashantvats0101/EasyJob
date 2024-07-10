import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  Keyboard,
  Dimensions,
  FlatList,
} from 'react-native';
import {Colors} from '../../../constant';
import {CommonText, OpacityButton} from '../../../components';
import InputText from '../../../components/textInput';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import { setPostjobdata } from '../../../Redux/cookiesReducer';
import Strings from '../../../utils/strings';
import { Show_Toast } from '../../../utils/helper';
import { setLoading } from '../../../Redux/reducer';
import apiName, { BASEURL } from '../../../Api/apiName';
import axios from 'axios';

const PostJob = () => {
  const [openjobtype, setOpenjobtype] = useState(false);
  const [education, setopeneducation] = useState(false);
  const [selectedaducation, setSelectedaducation] = useState('');
  const [selectedjobtype, setSelectedjobtype] = useState('');
  const [jobname, setjobname] = useState('');
  const [address, setaddress] = useState('');
  const [minsalary, setminsalary] = useState('');
  const [maxsalary, setmaxsalary] = useState('');
  const [staff, setstaff] = useState('');
  const [openavailablity, setOpenavailablity] = useState(false);
  const [selectedavailablity, setSelectedavailablity] = useState('');
  const [jobOptions, setjobOptions] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [subselectedCategory, setSubselectedCategory] = useState('');
  const [opensubCategory, setopenSubCategory] = useState(false);


const isFocused = useIsFocused()
const scrollViewRef = useRef(null);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch()
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser?.data?.token,
  );

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

  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity style={{height: 40}} onPress={() => handleselectedjob(item)}>
        <Text style={styles.txtstyl}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem3 = ({item}) => {
    // console.log(item,"hhhhhhhh")
    return (
      <TouchableOpacity style={{height: 40}} onPress={() => handleselectsubcat(item.name)}>
        <Text style={styles.txtstyl}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const handlesubcatagary = () => {
    if (!selectedjobtype.name) {

      Show_Toast('error','Please select a Job type first')

    } else {
      setopenSubCategory(true);
      setopenSubCategory(!opensubCategory);
    }
    setOpenavailablity(false);
    setopeneducation(false);
    setOpenjobtype(false);
    Keyboard.dismiss();
  };

  const handleavailablity = () => {
    setOpenavailablity(true);
    setOpenavailablity(!openavailablity);
    setOpenjobtype(false);
    setopeneducation(false);
    setopenSubCategory(false);
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
    setopenSubCategory(false);
    Keyboard.dismiss();
  };
  const handleselectedjob = option => {
    console.log(option,"option======>")
    setSelectedjobtype(option);
    setSubselectedCategory('')
    subjobtype(option?._id);
    
    setOpenjobtype(false);
  };
  const handleeducation = () => {
    setopeneducation(true);
    setOpenjobtype(false);
    setopeneducation(!education);
    setOpenavailablity(false);
    setopenSubCategory(false);
    Keyboard.dismiss();
  };
  const handleselectededucation = option => {
    setSelectedaducation(option);
    setopeneducation(false);
  };

  const handletouchablewithout = () => {
    setOpenjobtype(false);
    setopeneducation(false);
    setopenSubCategory(false);
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

  const onNext = () => {
    if (!jobname) {
     
      Show_Toast('error',Strings.jobname)
    } else if (!selectedjobtype.name) {
    
      Show_Toast('error',Strings.selectedjobtype)

    } 
    else if (!subselectedCategory.trim()) {
    
      Show_Toast('error','Please Select Sub Category')
    }else if (!selectedaducation.trim()) {
    
      Show_Toast('error',Strings.selectedaducation)
    } else if (!address) {
      
      Show_Toast('error',Strings.address)
    } else if (!minsalary) {
   
      Show_Toast('error',Strings.minsalary)
    } else if (!maxsalary) {
     
      Show_Toast('error',Strings.maxsalary)
    } else if (!staff) {
    
      Show_Toast('error',Strings.staff)
    } else {
      const data = {
        jobname,
        selectedjobtype,
        selectedaducation,
        address,
        minsalary,
        maxsalary,
        staff,
        selectedavailablity,
        subselectedCategory,
      };
      dispatch(setPostjobdata(data))
      navigation.navigate('PostjobSecond');
      
    }
  };
useLayoutEffect(()=>{
  if(!isFocused){
setjobname('')
setSelectedaducation('')
setSelectedavailablity('')
setSelectedjobtype('')
setaddress('')
setminsalary('')
setmaxsalary('')
setstaff('') 
setSubselectedCategory('')
setopenSubCategory(false)
setopeneducation(false)
setOpenavailablity(false)
setOpenjobtype(false)
}else {
  // Scroll to top when screen regains focus
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }
}
},[isFocused])

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
  };

  return (
    <TouchableWithoutFeedback onPress={handletouchablewithout}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.white, paddingHorizontal: 8}}>
        <StatusBar backgroundColor={Colors.white} />
        <View style={styles.HeaderView}>
          <View style={{width: '10%'}} />
          <CommonText style={styles.headertxt}>Post Job</CommonText>
          <CommonText style={styles.headertxt1}>1/3</CommonText>
        </View>
      
        <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
          scrollEnabled={!openjobtype && !openavailablity && !education &&!opensubCategory}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled">
          <InputText
            txt="Job Name"
            value={jobname}
            onChangeText={setjobname}
            onFocus={handleTextInputPress}
          />
          <TouchableOpacity
            style={styles.textinputview}
            onPress={handlejobtype}>
            <CommonText style={styles.inputtxt}>Job Type</CommonText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 15,
              }}>
              <View style={styles.input}>
                <Text style={styles.txtstyl}>{selectedjobtype.name}</Text>
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
                  style={{height: 40}}>
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
                  style={{height: 40}}>
                  <Text style={styles.txtstyl}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <InputText
            txt="Address"
            value={address}
            onChangeText={setaddress}
            onFocus={handleTextInputPress}
          />
          <View style={{paddingHorizontal: 20}}>
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
                  // placeholder="10000"
                  style={styles.selery}
                  keyboardType="numeric"
                  // value={minsalary}
                  // onChangeText={setminsalary}
                  value={
                    minsalary.length > 0 ? `Rs ${minsalary}` : ''
                  }
                  onChangeText={text => {
                    if (text.startsWith('Rs ')) { // Include space after 'Rs' to match the prefix
                      setminsalary(text.substring(3)); // Adjust index to 3 to remove 'Rs ' prefix
                    } else {
                      setminsalary(text);
                    }
                  }}
                  maxLength={12}
                  onFocus={handleTextInputPress}
                />
              </View>
              <CommonText style={styles.tostyl}>To</CommonText>
              <View style={styles.selleryinput}>
                <TextInput
                  // placeholder="10000"
                  style={styles.selery}
                  keyboardType="numeric"
                  // value={maxsalary}
                  // onChangeText={setmaxsalary}
                  value={
                    maxsalary.length > 0 ? `Rs ${maxsalary}` : ''
                  }
                  onChangeText={text => {
                    if (text.startsWith('Rs ')) { // Include space after 'Rs' to match the prefix
                      setmaxsalary(text.substring(3)); // Adjust index to 3 to remove 'Rs ' prefix
                    } else {
                      setmaxsalary(text);
                    }
                  }}
                  maxLength={12}
                  onFocus={handleTextInputPress}
                />
              </View>
            </View>
            <CommonText style={styles.txtstyl2}>No of staff I need</CommonText>
            <View style={styles.needstaff}>
              <TextInput
                // placeholder="3"
                style={styles.selery}
                keyboardType="numeric"
                value={staff}
                onChangeText={setstaff}
                maxLength={3}
                onFocus={handleTextInputPress}
              />
            </View>
          </View>
          <OpacityButton
            name="NEXT"
            button={styles.buttonstyl}
            pressButton={onNext}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PostJob;

const styles = StyleSheet.create({
  buttonstyl: {width: '70%', marginBottom: 50},
  needstaff: {
    width: '100%',
    height: 61,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    padding: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  selery: {fontSize: 14, fontFamily: 'Montserrat-Bold',color:Colors.blacktxt},
  tostyl: {fontFamily: 'Montserrat-Bold', marginHorizontal: 10},
  selleryinput: {
    width: 135,
    height: 61,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    padding: 10,
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
  headertxt1: {fontFamily: 'Poppins-Medium', fontSize: 18, color: '#959595'},
  textinputview: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    height: 61,
    marginVertical: 10,
  },
  inputtxt: {
    color: 'rgba(0, 0, 0, 0.56)',
    fontSize: 10,
    marginLeft: 18,
    position: 'absolute',
    top: 9,
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    minHeight: 39.8,
maxHeight:60,
    width: 260,
    fontSize: 14,
    color: Colors.blacktxt,
    marginTop: 14,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 12,
    // borderWidth:1,
    justifyContent: 'center',
  },
  dropdownstyl: {alignSelf: 'center', marginTop: 7},
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
  txtstyl2: {fontFamily: 'Montserrat-Bold', color: Colors.txtcolor},
  dropdowncontanior3: {
    width: '89%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    zIndex: 9,
    position: 'absolute',
    top: 295,
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
});
