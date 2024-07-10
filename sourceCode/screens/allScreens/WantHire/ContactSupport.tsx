import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import {OpacityButton} from '../../../components';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Loaderr from '../StartingScreens/Loaderr';
import {setLoading} from '../../../Redux/reducer';
import Strings from '../../../utils/strings';
import {useNavigation} from '@react-navigation/native';
import apiName, { BASEURL } from '../../../Api/apiName';
import { Show_Toast } from '../../../utils/helper';

const ContactSupport = () => {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  const navigation = useNavigation();

  const isValidEmail = email => {
    return emailRegex.test(email);
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async () => {
    if (!title) {
      Show_Toast('error',Strings.Title)
    } else if (!email) {
      Show_Toast('error',Strings.Contact_Email)
    } else if (!isValidEmail(email.trim())) {
      Show_Toast('error',Strings.Editemail_Valid)
    } else if (!descriptions) {
      Show_Toast('error',Strings.Descriptions_Contact)
    } else {
      dispatch(setLoading(true));
      const token = HeaderToken;
      try {
        const data = {
          title: title,
          email: email,
          description: descriptions,
        };
        const apiUrl = `${BASEURL}${apiName.CONTACT_US}`;
        const response = await axios.post(apiUrl, data, {
          headers: {
            Authorization: token,
          },
        });
      
        Show_Toast('success', 'Thank You For Contacting Us')
      setTimeout(() => {
          navigation.goBack();
        }, 1900);
       
     
        dispatch(setLoading(false));
        console.log(
          'Contact support request submitted successfully:',
          response.data,
        );
      } catch (error) {
        console.error('Error submitting contact support request:', error);
        dispatch(setLoading(false));
      }
    }
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.white, paddingVertical: 25}}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      {isLoading && <Loaderr />}
      <View style={{zIndex:9,position:'absolute',alignSelf:'center'}}>
</View>
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt="Contact Support"
        style={{marginTop:1}}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <ScrollView > */}
        <View style={[styles.input_view, {marginTop: 20}]}>
          <TextInput
            placeholder="Title"
            placeholderTextColor={'#C8C7CC'}
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.input_view}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={'#C8C7CC'}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.des_view}>
          <TextInput
            placeholder="Description"
            placeholderTextColor={'#C8C7CC'}
            style={styles.dec_input}
            // numberOfLines={3}
            multiline
            value={descriptions}
            onChangeText={setDescriptions}
          />
        </View>
        <OpacityButton
          name="SUBMIT"
          button={styles.buttonn}
          pressButton={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactSupport;

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    height: 50,color:Colors.blacktxt
  },
  input_view: {
    borderWidth: 2,
    borderColor: '#EFEFF4',
    // borderColor:'red',
    width: 335,
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    height: 52,
  },
  dec_input: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    minHeight: 30,
    maxHeight: 300,
    color:Colors.blacktxt
    // height:50,
    // borderWidth:1
  },
  des_view: {
    borderWidth: 1,
    borderColor: '#EFEFF4',
    width: 335,
    alignSelf: 'center',
    marginVertical: 10,
    // justifyContent:'center',
    minHeight: 141,
    maxHeight: 500,
    marginBottom: 110,
  },

  buttonn: {
    width: '70%',
    position: 'absolute',
    bottom: 10,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
