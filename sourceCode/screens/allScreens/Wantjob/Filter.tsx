import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import {CommonText, OpacityButton} from '../../../components';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation } from '@react-navigation/native';

const Filter = () => {
  const [update, setupdate] = useState(false);
  const [selectupdate, setselectupdate] = useState(null);
  const [workplace, setworkplace] = useState(false);
  const [selectworkplace, setselectworkplace] = useState(null);
  const [jobtype, setjobtype] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [experience, setexperience] = useState(false);
  const [selectexperience, setselectexperience] = useState(null);
  const [specialization, setSpecialization] = useState(false);
  const [selectspecialization, setselectspecialization] = useState(null);
  const [selery, setselery] = useState(false);
  const [values, setValues] = useState([10, 20]);

const navigation = useNavigation()

  const sliderValuesChange = newValues => {
    setValues(newValues);
  };

  const handleOptionPress = option => {
    setSelectedOption(option);
  };

  const handleselery = () => {
    setselery(true);
    setselery(!selery);
  };

  const handlespecialization = () => {
    setSpecialization(true);
    setSpecialization(!specialization);
  };
  const handleexperience = () => {
    setexperience(true);
    setexperience(!experience);
  };
  const handleupdate = () => {
    setupdate(true);
    setupdate(!update);
  };

  const handleworkplace = () => {
    setworkplace(true);
    setworkplace(!workplace);
  };

  const handlejobtype = () => {
    setjobtype(true);
    setjobtype(!jobtype);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />

      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt="Filter"
        style={{marginBottom: 15}}
      />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity style={styles.touchable_op} onPress={handleupdate}>
            <CommonText style={{fontFamily: 'Montserrat-Bold'}}>
              Last update
            </CommonText>
            <Image
              source={
                update
                  ? require('../../../assets/Images/uparrow.png')
                  : require('../../../assets/Images/downicon.png')
              }
              style={{height: update ? 10 : 17, width: update ? 12 : 17}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {!update && (
            <View style={styles.updatedropdown}>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectupdate('yes')}>
                  {selectupdate === 'yes' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={styles.txts}>Recent</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectupdate('no')}>
                  {selectupdate === 'no' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}>Last week</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectupdate('lmonth')}>
                  {selectupdate === 'lmonth' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={styles.txts}>Last month</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectupdate('anytime')}>
                  {selectupdate === 'anytime' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}>Any time</CommonText>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.touchable_op}
            onPress={handleworkplace}>
            <CommonText style={{fontFamily: 'Montserrat-Bold'}}>
              Type of workplace
            </CommonText>
            <Image
              source={
                workplace
                  ? require('../../../assets/Images/uparrow.png')
                  : require('../../../assets/Images/downicon.png')
              }
              style={{height: workplace ? 10 : 17, width: workplace ? 12 : 17}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {!workplace && (
            <View style={styles.updatedropdown}>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectworkplace('office')}>
                  {selectworkplace === 'office' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={styles.txts}>Work form office</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectworkplace('home')}>
                  {selectworkplace === 'home' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={styles.txts}>Work form Home</CommonText>
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.touchable_op} onPress={handlejobtype}>
            <CommonText style={{fontFamily: 'Montserrat-Bold'}}>
              Job type
            </CommonText>
            <Image
              source={
                jobtype
                  ? require('../../../assets/Images/uparrow.png')
                  : require('../../../assets/Images/downicon.png')
              }
              style={{height: jobtype ? 10 : 17, width: jobtype ? 12 : 17}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {!jobtype && (
            <View
              style={{
                borderBottomWidth: 1,
                paddingBottom: 20,
                borderColor: '#DEE1E7',
                paddingTop: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOption === 'Apprenticeship' &&
                      styles.selectedOption,
                  ]}
                  onPress={() => handleOptionPress('Apprenticeship')}>
                  <CommonText >Apprenticeship</CommonText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOption === 'Part-time' && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionPress('Part-time')}>
                  <CommonText>Part-time</CommonText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOption === 'Full time' && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionPress('Full time')}>
                  <CommonText>Full time</CommonText>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    {marginRight: 20, width: 82},
                    selectedOption === 'Contract' && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionPress('Contract')}>
                  <CommonText>Contract</CommonText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOption === 'Project-based' && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionPress('Project-based')}>
                  <CommonText>Project-based</CommonText>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.touchable_op} onPress={handleselery}>
            <CommonText style={{fontFamily: 'Montserrat-Bold'}}>
            Salary
            </CommonText>
            <Image
              source={
                selery
                  ? require('../../../assets/Images/uparrow.png')
                  : require('../../../assets/Images/downicon.png')
              }
              style={{height: selery ? 10 : 17, width: selery ? 12 : 17}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {!selery && (
            <View>
              <MultiSlider
                values={values}
                sliderLength={315}
                onValuesChange={sliderValuesChange}
                min={10}
                max={50}
                step={0.01}
                allowOverlap={false}
                snapped
                selectedStyle={{
                  backgroundColor: Colors.Bluebg,
                }}
                unselectedStyle={{
                  backgroundColor: 'gray',
                }}
                markerStyle={{
                  backgroundColor: Colors.Bluebg,
                  borderColor: Colors.Bluebg,
                }}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               
                <Text style={styles.minmax}> ₹{Math.round(values[0])}k</Text>
                <Text style={styles.minmax}> ₹{Math.round(values[1])}k</Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.touchable_op}
            onPress={handleexperience}>
            <CommonText style={{fontFamily: 'Montserrat-Bold'}}>
            Experience
            </CommonText>
            <Image
              source={
                experience
                  ? require('../../../assets/Images/uparrow.png')
                  : require('../../../assets/Images/downicon.png')
              }
              style={{
                height: experience ? 10 : 17,
                width: experience ? 12 : 17,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {!experience && (
            <View style={styles.updatedropdown}>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectexperience('no')}>
                  {selectexperience === 'no' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={styles.txts}>No experience</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectexperience('less')}>
                  {selectexperience === 'less' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}>Less than a year</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectexperience('oneyear')}>
                  {selectexperience === 'oneyear' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={styles.txts}>1-3 years</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectexperience('threeyear')}>
                  {selectexperience === 'threeyear' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}> 3-5 years</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectexperience('fiveyear')}>
                  {selectexperience === 'fiveyear' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}> 5-10 years</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Selectg, {marginRight: 10}]}
                  onPress={() => setselectexperience('more')}>
                  {selectexperience === 'more' && (
                    <Image
                      source={require('../../../assets/Images/selectedicon.png')}
                      style={styles.Selectedicon}
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}>
                  More than 10 years
                </CommonText>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.touchable_op}
            onPress={handlespecialization}>
            <CommonText style={{fontFamily: 'Montserrat-Bold'}}>
              Specialization
            </CommonText>
            <Image
              source={
                specialization
                  ? require('../../../assets/Images/uparrow.png')
                  : require('../../../assets/Images/downicon.png')
              }
              style={{
                height: specialization ? 10 : 17,
                width: specialization ? 12 : 17,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {!specialization && (
            <View style={styles.updatedropdown}>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Select, {marginRight: 10}]}
                  onPress={() => setselectspecialization('design')}>
                  {selectspecialization === 'design' && (
                    <Image
                      source={require('../../../assets/Images/right.png')}
                      style={styles.Selectedi}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={styles.txts}>Design</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Select, {marginRight: 10}]}
                  onPress={() => setselectspecialization('finance')}>
                  {selectspecialization === 'finance' && (
                    <Image
                      source={require('../../../assets/Images/right.png')}
                      style={styles.Selectedi}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}>Finance</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Select, {marginRight: 10}]}
                  onPress={() => setselectspecialization('Education')}>
                  {selectspecialization === 'Education' && (
                    <Image
                      source={require('../../../assets/Images/right.png')}
                      style={styles.Selectedi}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={styles.txts}>Education</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Select, {marginRight: 10}]}
                  onPress={() => setselectspecialization('Health')}>
                  {selectspecialization === 'Health' && (
                    <Image
                      source={require('../../../assets/Images/right.png')}
                      style={styles.Selectedi}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}> Health</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Select, {marginRight: 10}]}
                  onPress={() => setselectspecialization('Restuarant')}>
                  {selectspecialization === 'Restuarant' && (
                    <Image
                      source={require('../../../assets/Images/right.png')}
                      style={styles.Selectedi}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}> Restuarant</CommonText>
              </View>
              <View style={styles.dropview}>
                <TouchableOpacity
                  style={[styles.Select, {marginRight: 10}]}
                  onPress={() => setselectspecialization('Programmer')}>
                  {selectspecialization === 'Programmer' && (
                    <Image
                      source={require('../../../assets/Images/right.png')}
                      style={styles.Selectedi}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
                <CommonText style={[styles.txts]}>Programmer</CommonText>
              </View>
            </View>
          )}
        </View>
        <View style={styles.buttonview}>
          <TouchableOpacity style={styles.resetbutton}>
            <Text style={styles.resetxt}>Reset</Text>
          </TouchableOpacity>
          <OpacityButton name="APPLY NOW" button={styles.ButtonStyl} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  resetxt: {fontFamily: 'OpenSans-Medium', fontSize: 16, color: Colors.Bluebg},
  resetbutton: {
    height: 50,
    width: 75,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 35,
  },
  buttonview: {
    backgroundColor: '#ACC8D333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  ButtonStyl: {
    marginVertical: 17,
    width: 230,
  },
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#CBC9D4',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: Colors.Bluebg,
  },

  appre_: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#CBC9D4',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txt_: {fontFamily: 'Montserrat-Medium', fontSize: 12, color: '#524B6B'},
  touchable_op: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    alignItems: 'center',
  },
  updatedropdown: {
    borderBottomWidth: 1,
    borderColor: '#DEE1E7',
    marginVertical: 5,
    paddingBottom: 15,
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
  Selectedicon: {height: 19, width: 19},
  dropview: {flexDirection: 'row', marginVertical: 5},
  txts: {fontSize: 12, color: '#524B6B'},
  Select: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Selectedi: {height: 17, width: 12},
  minmax:{
    fontFamily:'Montserrat-Bold',
    fontSize:12,
    color:'#150B3D'
  }
});
