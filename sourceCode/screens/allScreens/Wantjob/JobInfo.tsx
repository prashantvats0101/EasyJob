import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import HeaderComp from '../../../components/HeaderComp';
import {Colors} from '../../../constant';
import InputText from '../../../components/textInput';
import {CommonText, OpacityButton} from '../../../components';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Loaderr from '../StartingScreens/Loaderr';
import {setLoading} from '../../../Redux/reducer';
import {setJobinfo, setLoginuser} from '../../../Redux/cookiesReducer';
import Strings from '../../../utils/strings';
import apiName, {BASEURL} from '../../../Api/apiName';
import { Show_Toast } from '../../../utils/helper';

const JobInfo = () => {
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentSalary, setCurrentSalary] = useState('');
  const [salaryExpectation, setSalaryExpectation] = useState('');
  const [information, setInformation] = useState('');
  const [openjobtype, setOpenjobtype] = useState(false);
  const [opensubCategory, setopenSubCategory] = useState(false);
  const [subselectedCategory, setSubselectedCategory] = useState('');
  const [selectedjobtype, setSelectedjobtype] = useState({});
  const [openavailablity, setOpenavailablity] = useState(false);
  const [selectedavailablity, setSelectedavailablity] = useState('');
  const [openexperence, setOpenexperence] = useState(false);
  const [selectedexperence, setSelectedexperence] = useState('');
  const [openeducation, setOpeneducation] = useState(false);
  const [selectedeeducation, setSelectededucation] = useState('');
  const [jobOptions, setjobOptions] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  
  const dispatch = useDispatch();

  const handletouchablewithout = () => {
    setOpenjobtype(false);
    setOpenavailablity(false);
    setOpenexperence(false);
    setOpeneducation(false);
    setopenSubCategory(false);
  };
  const handleeducation = () => {
    setOpenexperence(false);
    setOpeneducation(!openeducation);
    setOpenjobtype(false);
    setOpenavailablity(false);
    setopenSubCategory(false);
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
    setopenSubCategory(false);
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
  const handlesubcatagary = () => {
    if (!selectedjobtype.name) {

      Show_Toast('error','Please select a Job type first')

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

  const handleavailablity = () => {
    setOpenavailablity(true);
    setOpenavailablity(!openavailablity);
    setOpenjobtype(false);
    setOpenexperence(false);
    setOpeneducation(false);
    setopenSubCategory(false);
    Keyboard.dismiss();
  };
  const handleselectedavailablity = option => {
    setSelectedavailablity(option);
    setOpenavailablity(false);
  };

  const handleselectsubcat = option => {
    setSubselectedCategory(option);
    setopenSubCategory(false);
  };

  const handleselectedjob = option => {
    console.log(option,"option======>")
    setSelectedjobtype(option);
    setSubselectedCategory('')
    subjobtype(option?._id);
    
    setOpenjobtype(false);
  };
  const navigation = useNavigation();

  const handleAddSkill = () => {
    if (!inputValue || inputValue.trim() === '') {
      Alert.alert('Please add a value');
    } else {
      setSkills([...skills, inputValue]);
      setInputValue('');
      setOpenModal(false);
    }
  };

  const removeSkill = index => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);

  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser?.data?.token,
  );
  // console.log(HeaderToken, 'HeaderToken====>');
  const handleNext = async () => {
    if (!selectedjobtype.name) {
    
      Show_Toast('error',Strings.selectedjobtypee)
    } else if (!subselectedCategory) {
      Show_Toast('error','Please Select Sub Category')
    } else if (!selectedavailablity) {
      Show_Toast('error',Strings.selectedavailablityy)
    } else if (!selectedexperence.trim()) {
      Show_Toast('error',Strings.selectedexperencee)
    } else if (!selectedeeducation.trim()) {
      Show_Toast('error',Strings.selectedeeducationn)
    } else if (skills.length === 0) {    
      Show_Toast('error',Strings.skillslength)
    } else if (!currentSalary.trim()) {
      Show_Toast('error',Strings.currentSalaryy)
    } else if (!salaryExpectation.trim()) {
      Show_Toast('error',Strings.salaryExpectationn)
    } else if (!information.trim()) {
      Show_Toast('error',Strings.informationn)
    } else {
      const data = {
        jobType: selectedjobtype.name,
        availability: selectedavailablity,
        experience: selectedexperence,
        education: selectedeeducation,
        skills: skills,
        currentSalary: currentSalary,
        expectedSalary: salaryExpectation,
        information: information,
        subCategory:subselectedCategory,
      };
      dispatch(setLoading(true));
      // console.log(data, '<<<======== data');
      const url = `${BASEURL}${apiName.JOBSEEKER_JOB_INFO}`;
      try {
        const token = HeaderToken;
        const response = await axios.post(url, data, {
          headers: {
            Authorization: token,
          },
        });
        // console.log(response.data, '================> api response');
        console.log('success====>');
        dispatch(setLoading(false));
        dispatch(setJobinfo(response.data));
        navigation.navigate('TabNavigation');
      } catch (error) {
        dispatch(setLoading(false));
        console.error(error, '=========>');
      }
    }
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTextInputPress = () => {
    setOpenjobtype(false);
    setOpenavailablity(false);
    setOpeneducation(false);
    setOpenexperence(false);
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
      console.log(x,"respoenes=>====>")
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error, 'error=====>>>');
    }
  };

  // console.log(selectedjobtype._id,"jhdjhde")
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

  // codeing Company = 0
  // js Company = heu,hello,Dummy Sub Category3,
  // react Company = 0,
  // labor Company =0 ,
  // Dummy JOb Creation = Dummy Sub Category3,Dummy Sub Category2,Dummy Sub Category
  // IT campany = Software Developer

  return (
    <TouchableWithoutFeedback onPress={handletouchablewithout}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.whitetxt}}>
     
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.whitetxt}
        />
        
        <HeaderComp
          img={require('../../../assets/Images/arrowback.png')}
          txt="Job Information"
          style={{marginBottom: 15}}
        />
       

        {/* <OpacityButton pressButton={subjobtype}/> */}
        <ScrollView
          scrollEnabled={
            !openjobtype &&
            !openavailablity &&
            !openexperence &&
            !openeducation &&
            !opensubCategory
          }
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          style={{paddingTop: 1}}>
          {isLoading && <Loaderr />}

          <View>
            <TouchableOpacity style={styles.inputView} onPress={handlejobtype}>
              <CommonText style={styles.inputtxt}>Job Type</CommonText>
              <View style={styles.dropdownArrow}>
                <Image
                  source={require('../../../assets/Images/Downarrow.png')}
                />
              </View>
              <CommonText style={styles.Selectedop}>
                {selectedjobtype.name}
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
                <Image
                  source={require('../../../assets/Images/Downarrow.png')}
                />
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
                <Image
                  source={require('../../../assets/Images/Downarrow.png')}
                />
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
            <TouchableOpacity
              style={styles.inputView}
              onPress={handleexperence}>
              <CommonText style={styles.inputtxt}>Experiance</CommonText>
              <View style={styles.dropdownArrow}>
                <Image
                  source={require('../../../assets/Images/Downarrow.png')}
                />
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
            <TouchableOpacity
              style={styles.inputView}
              onPress={handleeducation}>
              <CommonText style={styles.inputtxt}>Education</CommonText>
              <View style={styles.dropdownArrow}>
                <Image
                  source={require('../../../assets/Images/Downarrow.png')}
                />
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
            style={[styles.inputView1]}
            onPress={() => setOpenModal(true)}>
            <View style={[styles.textinputview]}>
              <Text style={styles.inputtxt}>Skills</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FlatList
                scrollEnabled
                data={skills}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // numColumns={3}
              />
              <View style={[styles.Plusicons]}>
                <Image source={require('../../../assets/Images/plusimg.png')} />
              </View>
            </View>
          </TouchableOpacity>
          <InputText
            onFocus={handleTextInputPress}
            txt="Current Salary"
            length={10}
            keyboardType="numeric"
            value={currentSalary.length > 0 ? `Rs ${currentSalary}` : ''}
            onChangeText={text => {
              if (text.startsWith('Rs ')) {
                setCurrentSalary(text.substring(3));
              } else {
                setCurrentSalary(text);
              }
            }}
          />
          <InputText
            onFocus={handleTextInputPress}
            txt="Salary Expectation "
            length={10}
            keyboardType="numeric"
            value={
              salaryExpectation.length > 0 ? `Rs ${salaryExpectation}` : ''
            }
            onChangeText={text => {
              if (text.startsWith('Rs ')) {
                // Modified condition to check for 'Rs ' at the beginning
                setSalaryExpectation(text.substring(3)); // Adjusted substring index
              } else {
                setSalaryExpectation(text);
              }
            }}
          />
          <CommonText style={styles.txt_explain_why}>Explain why you are the right person for this job</CommonText>
          <View style={styles.inputView2}>
            <TextInput
              onFocus={handleTextInputPress}
              placeholder="I believe I am the right person for this job because I bring a unique blend of skills, experience, and passion that align perfectly with the role's requirements. With over five years of experience in the industry, I have developed a deep understanding of the key challenges and opportunities. My proven track record of success includes managing complex projects, leading diverse teams, and consistently delivering results that exceed expectations.
              Moreover, my strong communication and interpersonal skills enable me to build effective relationships with clients and colleagues alike, fostering a collaborative and productive work environment. I am highly adaptable, detail-oriented, and committed to continuous learning and improvement, which ensures that I stay ahead of industry trends and can contribute innovative ideas to the team.
              What sets me apart is my dedication to not only achieving my personal goals but also supporting the overall objectives of the organization. I am excited about the prospect of bringing my expertise to your team and am confident that my proactive approach and problem-solving abilities will make a significant positive impact.
              "
              placeholderTextColor="rgba(170, 166, 185, 1)"
              style={styles.info}
              multiline={true}
              value={information}
              onChangeText={setInformation}
            />
          </View>
        
          <OpacityButton
            name="SAVE"
            button={{width: '73%'}}
            pressButton={handleNext}
          />
        </ScrollView>
        <Modal visible={openModal} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(2,2,3,0.7)',
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
                placeholder="Enter Skill"
                value={inputValue}
                onChangeText={text => setInputValue(text)}
                inputstyl={styles.modalinput}
              />
              <OpacityButton name="Add" pressButton={handleAddSkill} />
            </View>
          </View>
        </Modal>                                                      
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default JobInfo;

const styles = StyleSheet.create({
  modalbuton: {
    width: '30%',
    marginBottom: 4,
    backgroundColor: 'red',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  inputView3: {
    backgroundColor: Colors.inputbackground,
    height: 61,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  inputView1: {
    backgroundColor: Colors.inputbackground,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    minHeight: 70,
    maxHeight: 1800,
    paddingRight: 20,
  },
  textinputview: {width: '20%'},
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
    minHeight: 20,
    maxHeight: 100,
  },
  ModalContainor: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.86)',
    height: 250,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  Plusicons: {position: 'absolute', top: 3, right: -7},
  // txt: {fontFamily: 'Montserrat-Bold', marginLeft: 20},
  txt_explain_why:{fontFamily: 'Montserrat-Bold', marginLeft: 20,fontSize:12,marginTop:10},
  SkilTextstyl: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.whitetxt,
    fontSize: 12,
  },
  MicIconstyl: {alignSelf: 'flex-end', marginRight: 20, height: 47, width: 42},
  inputView: {
    backgroundColor: Colors.inputbackground,
    height: 61,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    // borderStartColor: 'red',
  },
  inputtxt: {
    color: Colors.black56,
    fontSize: 10,
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 8,
  },
  info: {
    color: Colors.blacktxt, fontFamily: 'Montserrat-Bold', fontSize: 14,
    marginBottom: 5,minHeight:60,maxHeight:100
  },

  dropdownArrow: {
    position: 'absolute',
    top: 28,
    right: 19,
  },
  Selectedop: {
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 9,
    marginTop: 5,
  },
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
    // height: 320,
  },
  txtstyl: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.blacktxt,
    fontSize: 14,
    marginLeft: 4,
    marginTop: 6,
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
    // height: 300,
    paddingBottom: 20,
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
  modalinput: {
    width: 250,
  },
});
