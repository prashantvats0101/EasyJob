import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
  StatusBar,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { CommonText, OpacityButton } from '../../components';
import { Colors } from '../../constant';
import axios from 'axios';
import apiName, { BASEURLLOGIN } from '../../Api/apiName';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, setLogindata, setUserId } from '../../Redux/reducer';
import Loaderr from '../allScreens/StartingScreens/Loaderr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../../utils/strings';
import { Show_Toast } from '../../utils/helper';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../language/LanguageContext';


const Login = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(LanguageContext);
  // const isLoading = useSelector(state => state.loading)
  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);
  // console.log(isLoading, '<========');
  const handleLoginPress = () => {

    if (textInputValue.trim() === '') {
    Show_Toast('error', 'Please Enter Your Mobile Number')
    } else {
      const data = {
        mobileNumber: textInputValue,
        deviceId: '123456789',
        deviceToken: '789546asdasjhdghgasjdgbhgagyuqwtygere',
      };
      console.log(data, "data========>")
      dispatch(setLoading(true));
      axios
        .post(`http://13.48.210.251:3000/api`, data)
        .then(response => {
          dispatch(setLoading(false));
          console.log('Login Successful', response.data);
          const userId = response.data.data._id;
          dispatch(setUserId(userId));
          const ottp = response.data.data.otp;
          dispatch(setLogindata(response.data.data));
          const data = {
            userId,
            mobileNumber: textInputValue,
            ottp,
          };
          setTextInputValue('')
          // console.log(response.data.data,"<<=====login")
          // console.log(userId,"<<=====+++login")
          navigation.navigate('OTP', data);
        })
        .catch(error => {
          dispatch(setLoading(false));
          console.error('Error occurred during login:', error);
          if (error.response && error.response.status === 400) {

            Show_Toast('error', Strings.alreadyreg)
          } 
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };
return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <ImageBackground
        source={require('../../assets/Images/backgroundimg.png')}
        style={styles.backgroundimg}>
        <ScrollView>
          <View style={styles.imgView}>
            <Image
              source={require('../../assets/Images/Splashimg.png')}
              style={styles.imgstyl}
            />

          </View>
          <View style={styles.LoginView}>
            <View style={styles.TxtView}>
              <CommonText style={styles.txt}>{t('Login')}</CommonText>
              <CommonText style={styles.txt1}>
                {t('Please sign in to continue.')}
              </CommonText>
            </View>
            <View style={styles.inputView}>
              <View style={styles.inputimgView}>
                <Image
                  source={require('../../assets/Images/flagg.png')}
                  style={{ height: 20, width: 30, alignSelf: 'center' }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textinputview}>
                <CommonText style={styles.inputtxt}>{t('Phone Number')}</CommonText>
                <TextInput
                  // placeholder="556363  55555"
                  style={styles.input}
                  maxLength={14}
                  keyboardType="numeric"
                  value={
                    textInputValue.length > 0 ? `+91 ${textInputValue}` : ''
                  }
                  onChangeText={text => {
                    if (text.startsWith('+91')) {
                      setTextInputValue(text.substring(4));
                    } else {
                      setTextInputValue(text);
                    }
                  }}
                />

              </View>
            </View>

            <OpacityButton
              btnTextStyle={styles.buttontxtstyl}
              name={t('LOGIN')}
              button={styles.Buttonstyl}
              pressButton={handleLoginPress}
            />
            {isLoading && <Loaderr />}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundimg: { height: '100%', width: '100%' },
  imgView: { width: '100%', height: 328, alignItems: 'center' },
  imgstyl: { width: '100%', height: 308, resizeMode: 'contain' },
  LoginView: {
    height: 495,
    // flex:1,
    backgroundColor: Colors.Bluebg,
    // width: '100%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    // borderWidth:1
  },
  TxtView: { marginTop: 40, marginLeft: 20 },
  txt: { color: Colors.whitetxt, fontSize: 24, fontFamily: 'Montserrat-Bold' },
  txt1: {
    color: Colors.whitetxt,
    fontFamily: 'Montserrat-Medium',
    marginTop: 10,
  },
  input: {
    height: 39.8,
    width: 200,
    fontSize: 14,
    color: Colors.blacktxt,
    marginTop: 14,
    fontFamily: 'Montserrat-Bold',
  },
  inputView: {
    backgroundColor: Colors.whitetxt,
    height: 61,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 30,
  },
  inputtxt: {
    color: 'background: rgba(0, 0, 0, 0.56)',
    fontSize: 10,
    marginLeft: 5,
    position: 'absolute',
    top: 9,
    fontFamily: 'Montserrat-Bold',
  },
  inputimgView: {
    width: 35,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: 3,
  },
  textinputview: { width: '80%', alignSelf: 'center' },
  Buttonstyl: { backgroundColor: Colors.whitetxt, marginTop: 80, width: '40%' },
  buttontxtstyl: {
    fontSize: 14,
    color: Colors.blacktxt,
    fontFamily: 'Montserrat-Bold',
  },
});
