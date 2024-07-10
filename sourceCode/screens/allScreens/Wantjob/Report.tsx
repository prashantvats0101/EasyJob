import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {CommonText, OpacityButton} from '../../../components';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import InputText from '../../../components/textInput';
import Strings from '../../../utils/strings';
import {setLoading} from '../../../Redux/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import apiName, {BASEURL} from '../../../Api/apiName';
import axios from 'axios';
import {Show_Toast} from '../../../utils/helper';

const Report = ({route}) => {
  const {jobId} = route.params;
  // console.log('Job ID:', jobId);

  const [title, setTitle] = useState('');
  const [reasons, setreasons] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );

  const handleSubmit = async () => {
    if (!title) {
      Show_Toast('error', Strings.Title);
    } else if (!reasons) {
      Show_Toast('error', Strings.Report_Reason);
    } else {
      dispatch(setLoading(true));
      const token = HeaderToken;
      try {
        const data = {
          title: title,
          reportReason: reasons,
        };
        const apiUrl = `${BASEURL}${apiName.REPORT_JOB}${jobId}`;
        const response = await axios.post(apiUrl, data, {
          headers: {
            Authorization: token,
          },
        });
        dispatch(setLoading(false));

        Show_Toast('success', Strings.Submit_Report);
        setTimeout(() => {
          navigation.goBack();
        }, 1900);

        console.log('Report request submitted successfully:', response.data);
      } catch (error) {
        console.error('Error submitting Report request:', error);
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white, padding: 10}}>
      <StatusBar backgroundColor={Colors.white} />
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt="Report"
      />
      <View
        style={{position: 'absolute', zIndex: 9, alignSelf: 'center'}}></View>
      <InputText
                txt="TITLE"
                value={title}
                onChangeText={setTitle}
            />
      {/* <View style={styles.inputView1}>
        <CommonText
          style={{
            color: Colors.black56,
            fontSize: 10,
            marginTop: 8,
            fontFamily: 'Montserrat-Bold',
            marginLeft: 6,
          }}>
          TITLE{' '}
        </CommonText>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={{
            marginBottom: 10,
            color: Colors.blacktxt,
            fontFamily: 'Montserrat-Bold',
            fontSize: 14,
            // borderWidth:1,
            height:45,
          }}
        />
      </View> */}
      <View style={styles.inputView2}>
        <CommonText
          style={{
            color: Colors.black56,
            fontSize: 10,
            marginTop: 8,
            fontFamily: 'Montserrat-Bold',
            marginLeft: 7.5,
          }}>
          Report Reasons
        </CommonText>
        <TextInput
          value={reasons}
          onChangeText={setreasons}
          style={{
            marginBottom: 5,
            color: Colors.blacktxt,
            fontFamily: 'Montserrat-Bold',
            fontSize: 14,
            // minHeight: 10,
            maxHeight: 230,
            marginLeft:7,
            // borderWidth:1
          }}
          multiline={true}
        />
      </View>
      <OpacityButton
        name="SUBMIT"
        button={styles.buttonstyl}
        pressButton={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  InputReport: {
    height: 118,
  },
  txtt: {},
  inputviewstyl: {height: 113, width: '100%', marginLeft: 38},
  inputstyll: {width: '100%'},
  buttonstyl: {bottom: 20, position: 'absolute'},
  inputView2: {
    backgroundColor: Colors.inputbackground,
    minHeight: 90,
    maxHeight: 240,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  inputView1: {
    backgroundColor: Colors.inputbackground,
    height: 70,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
});
