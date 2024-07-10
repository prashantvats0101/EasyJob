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
} from 'react-native';
import React, {useState} from 'react';
import {CommonText, OpacityButton} from '../../../components';
import {Colors} from '../../../constant';
import InputText from '../../../components/textInput';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { setPostjobdata } from '../../../Redux/cookiesReducer';
import Strings from '../../../utils/strings';
import { Show_Toast } from '../../../utils/helper';

const PostJobSecond = () => {
    const [selectedGender, setSelectedGender] = useState(null);
  const [speakenglish, setspeakenglish] = useState(null);
  const [work, setwork] = useState(null);
  const [minExperence, setminExperence] = useState('');
  const [maxExperence, setmaxExperence] = useState('');

  const navigation = useNavigation();
const dispatch = useDispatch()

const data = {
  minExperence,
  maxExperence,
  selectedGender,
  speakenglish,
  work,
 
};
dispatch(setPostjobdata(data))
  const onNext = () => {
    if (!minExperence) {
     
      Show_Toast('error',Strings.minExperence)
    } else if (!maxExperence) {
     
      Show_Toast('error',Strings.maxExperence)
    } else if (!selectedGender) {
    
      Show_Toast('error',Strings.selectedGender)
    } else if (!speakenglish) {
   
      Show_Toast('error',Strings.speakenglish)
    } else if (!work) {
    
      Show_Toast('error',Strings.work)
    } else {
      
      navigation.navigate('ThirdPostjob');
    }
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.white, paddingHorizontal: 8}}>
      <StatusBar backgroundColor={Colors.white} />
      <View style={styles.HeaderView}>
        <View style={{width: '10%'}} />
        <CommonText style={styles.headertxt}>Post Job</CommonText>
        <CommonText style={styles.headertxt1}>2/3</CommonText>
      </View>
    
      <ScrollView>
        <View style={{paddingHorizontal: 7}}>
          <CommonText style={styles.txtstyl2}>Experience</CommonText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <InputText
              txt="Minimum Experience"
              style={styles.expinput}
              styletxt={{left: 12}}
              inputstyl={{marginLeft: 13}}
              keyboardType="numeric"
              value={minExperence}
              onChangeText={setminExperence}
              length={2}
            />
            <InputText
              txt="Maximum Experience"
              style={styles.expinput}
              styletxt={{left: 12,}}
              inputstyl={{marginLeft: 13,}}
              keyboardType="numeric"
              value={maxExperence}
              onChangeText={setmaxExperence}
              length={2}
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
              style={[styles.Selectg, {marginLeft: 30}]}
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
              style={[styles.Selectg, {marginLeft: 30}]}
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
          <CommonText style={[styles.txtstyl2, {marginTop: 20}]}>
            Candidate’s English Speaking skill should be
          </CommonText>
          <View
            style={{
              height: 90,
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.Selectg, , {marginRight: 10}]}
                onPress={() => setspeakenglish('Do not speak English')}>
                {speakenglish === 'Do not speak English' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={[styles.txts]}>
                Do not speak english
              </CommonText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.Selectg, {marginRight: 10}]}
                onPress={() => setspeakenglish('Speak Good English')}>
                {speakenglish === 'Speak Good English' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={[styles.txts]}>Speak Good English</CommonText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.Selectg, {marginRight: 10}]}
                onPress={() => setspeakenglish('Speak Fluent English')}>
                {speakenglish === 'Speak Fluent English' && (
                  <Image
                    source={require('../../../assets/Images/selectedicon.png')}
                    style={styles.Selectedicon}
                  />
                )}
              </TouchableOpacity>
              <CommonText style={[styles.txts]}>
                Speak Fluent English
              </CommonText>
            </View>
          </View>
          <CommonText style={[styles.txtstyl2, {marginTop: 20}]}>
            Is it a work from Home Job ?
          </CommonText>
        </View>

        <View
          style={{
            justifyContent: 'center',
            height: 60,
            width: '70%',
            paddingHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.Selectg, {marginRight: 10}]}
              onPress={() => setwork('true')}>
              {work === 'true' && (
                <Image
                  source={require('../../../assets/Images/selectedicon.png')}
                  style={styles.Selectedicon}
                />
              )}
            </TouchableOpacity>
            <CommonText style={styles.txts}>Yes</CommonText>
            <TouchableOpacity
              style={[styles.Selectg, {marginLeft: 60, marginRight: 10}]}
              onPress={() => setwork('false')}>
              {work === 'false' && (
                <Image
                  source={require('../../../assets/Images/selectedicon.png')}
                  style={styles.Selectedicon}
                />
              )}
            </TouchableOpacity>
            <CommonText style={[styles.txts]}>No</CommonText>
          </View>
        </View>
        <OpacityButton
          name="NEXT"
          button={styles.ButtonStyl}
          pressButton={onNext}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostJobSecond;

const styles = StyleSheet.create({
  txtstyl2: {
    fontFamily: 'Montserrat-Bold',
    color: Colors.txtcolor,
    marginTop: 15,
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
  expinput: {width:"45%",},
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
  txts: {fontFamily: 'Montserrat-Bold', fontSize: 14, color: Colors.lightbrown},
  ButtonStyl: {width: '70%', marginTop: 90},
});
