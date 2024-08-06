/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import React, {useRef, useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {CommonText, OpacityButton} from '../../../components';
import {Colors} from '../../../constant';
import axios from 'axios';
import OTPTextView from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';
import apiName, {BASEURL} from '../../../Api/apiName';
import {useDispatch} from 'react-redux';
import {setLoginuser} from '../../../Redux/cookiesReducer';
import Strings from '../../../utils/strings';
import { Show_Toast } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';
import '../../../components/i18n';
import { LanguageContext } from '../../../language/LanguageContext';

const OTPScreen = ({route, navigation}: any) => {
  const {userId, mobileNumber, ottp} = route?.params;
  const [otpp, setOTPP] = useState(ottp);
  const { t } = useTranslation();

  const { selectedLanguage } = useContext(LanguageContext);
  const dispatch = useDispatch();

  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  const handleVerifyOTP = () => {
    if (otpp.trim() === '') {
      Show_Toast('error', Strings.EnterOTP);
    } else {
      const data = {
        otp: otpp,
      };

      axios
        .post(`${BASEURL}${apiName.VERIFY_OTP}${userId}`, data)
        .then(response => {
          const jobSeeker = response.data?.data?.findUserId?.userType;
          if (jobSeeker === undefined) {
            Show_Toast('success',Strings.Welcome,Strings.OTPVerified)
            setTimeout(()=>{
              navigation.replace('Selection');
            },2000)
          
          } else if (jobSeeker == 'jobSeeker') {
            Show_Toast('success', Strings.Welcome, Strings.OTPVerified);
            setTimeout(() => {
              navigation.navigate('TabNavigation');
            }, 2000);
            dispatch(setLoginuser(response?.data));
          } else if (jobSeeker == 'jobProvider') {
            setTimeout(() => {
              navigation.replace('TabHireNavi');
            }, 2000);
            dispatch(setLoginuser(response?.data));
          }
          Show_Toast('success', Strings.Welcome, Strings.OTPVerified);
        })
        .catch(error => {
          console.error('Error occurred during OTP verification:', error);
          if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            Show_Toast('error', errorMessage);
            console.log(errorMessage, '<======');
          } else {
            Show_Toast('error', 'Failed to verify OTP. Please try again.');
          }
        });
    }
  };

  const handleResendOTP = () => {
    setResendDisabled(true);
    setTimer(30);
    Show_Toast('info', Strings.ResendOtp);

    const data = {
      mobileNumber: mobileNumber,
      deviceId: '123456789',
      deviceToken: '789546asdasjhdghgasjdgbhgagyuqwtygere',
    };

    axios
      .post(`http://43.205.55.71:3000/api`, data)
      .then(response => {
        const newOTTP = response?.data?.data?.otp;
        dispatch(setLoginuser(response?.data));
        setOTPP(newOTTP);
      })
      .catch(error => {
        console.error('Error occurred during OTP resend:', error);
      });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 30;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendDisabled]);

  let otpInput = useRef(null);

  const setText = () => {
    if (otpInput.current) {
      otpInput.current.setValue(otpp);
    }
  };

  useEffect(() => {
    setText();
  }, [otpp]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#fff'} />
      <View style={styles.alltxt}>
        <View style={styles.otptxt}>
          <CommonText style={styles.txt}>{t("Enter")}</CommonText>
          <CommonText style={styles.txt1}> {t("OTP")}</CommonText>
        </View>
        <CommonText style={styles.txt2}>
          {t("A verification codes has been sent to")}(+91) {mobileNumber}
        </CommonText>
      </View>

      <OTPTextView
        inputCount={5}
        containerStyle={{width: '90%', alignSelf: 'center', marginTop: 30}}
        textInputStyle={{borderWidth: 1, borderRadius: 5}}
        tintColor={'grey'}
        handleTextChange={text => setOTPP(text)}
        defaultValue={otpp}
        ref={otpInput}
      />
      <OpacityButton
        btnTextStyle={styles.buttontxtstyl}
        name={t('NEXT')}
        button={styles.Buttonstyl}
        pressButton={handleVerifyOTP}
      />
      <View style={styles.txtView}>
        <CommonText style={styles.txtDidnt}>
          {t("Didn't receive the code?")}{' '}
        </CommonText>
        <TouchableOpacity onPress={handleResendOTP}>
          <CommonText style={styles.txtResend}>{t("Resend OTP")}</CommonText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  alltxt: {marginTop: 150, width: '70%', marginLeft: 20},
  otptxt: {flexDirection: 'row'},
  txt: {fontSize: 28, color: '#000000', fontFamily: 'Poppins-Bold'},
  txt1: {color: Colors.Bluebg, fontSize: 28, fontFamily: 'Poppins-Bold'},
  txt2: {color: 'grey', marginTop: 5},
  OtpView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 55,
    marginTop: 20,
    alignSelf: 'center',
  },
  OtpInput: {
    borderWidth: 0.3,
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    borderColor: Colors.lightbrown,
    width: 55,
    height: 55,
    margin: 5,
    textAlign: 'center',
    elevation: 1,
    borderRadius: 5,
    backgroundColor: Colors.whitetxt,
    color: Colors.blacktxt,
  },
  Buttonstyl: {backgroundColor: Colors.Bluebg, marginTop: 40, width: '40%'},
  buttontxtstyl: {fontSize: 14, color: Colors.whitetxt},
  txtView: {flexDirection: 'row', alignSelf: 'center', marginTop: 17},
  txtDidnt: {color: 'grey', fontFamily: 'Poppins-Medium'},
  txtResend: {color: Colors.Bluebg, fontFamily: 'Poppins-Bold'},
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 20,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
