import {
  Image,
  Modal,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../../constant';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import {CommonText} from '../../../components';

const ViewProfile = () => {
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  const datafromredux = useSelector<any>(
    state => state?.cookies?.campanyprofiledata,
  );
  console.log(HeaderToken, '=======');
 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');

  const name = datafromredux?.companyName;
  const informa = datafromredux?.companyInformation;
  const email = datafromredux?.companyEmail;
  const number = datafromredux?.mobileNumber;
  const addresss = datafromredux?.companyAddress;
  const imagee = `${datafromredux?.companyLogo}`;

  const handleImagePress = () => {
    setSelectedImageUri(imagee);
    setIsModalVisible(true);
  };
  const renderIndicator = (currentIndex, allSize) => {
    return null;
  };

  useEffect(()=>{
    requestCameraPermission()
  },[])
  
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


  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white, padding: 10}}>
      <StatusBar backgroundColor={Colors.white} />
      <View style={styles.header_view}>
        <TouchableOpacity
          style={styles.setting_view}
          onPress={() => {
            navigation.navigate('CampanyEditPro');
          }}>
          <Image source={require('../../../assets/Images/editprofilee.png')} 
           resizeMode='contain'
           style={{height:15,width:15}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.setting_view}
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Image source={require('../../../assets/Images/setting_icon.png')} 
              resizeMode='contain'
              style={{height:15,width:15}}/>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            // borderWidth: 1,
            paddingTop: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image
             source={{uri: imagee}}
              resizeMode="cover"
              style={styles.avtarimg}
            />
          </TouchableOpacity>
          <CommonText style={styles.usename_txt}>
            {' '}
            {name}
          </CommonText>
         
         
        </View>
        <View style={[styles.data_view, {marginTop: 10}]}>
          <CommonText style={styles.bold_txt}>Email</CommonText>
          <CommonText style={styles.small_txt}>
            {email}
          </CommonText>
        </View>
        <View style={[styles.data_view, {marginTop: 10}]}>
          <CommonText style={styles.bold_txt}>Phone Number</CommonText>
          <CommonText style={styles.small_txt}>
{number}
          </CommonText>
        </View>
        <View style={[styles.data_view, {marginTop: 10}]}>
          <CommonText style={styles.bold_txt}>Bio</CommonText>
          <CommonText style={styles.small_txt}>
            {informa}
          </CommonText>
        </View>
        <View style={[styles.data_view, {marginTop: 10}]}>
          <CommonText style={styles.bold_txt}>Address</CommonText>
          <CommonText style={styles.small_txt}>
           {addresss}
          </CommonText>
        </View>

 

    
        <TouchableOpacity
          style={{
            borderWidth: 1,
            height: 63,
            width: '90%',
            marginTop: 20,
            marginBottom: 10,
            alignSelf: 'center',
            borderRadius: 10,
            borderColor: '#E8E8E8',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('contactus');
          }}>
          <CommonText>Need Help? Ask Us</CommonText>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={{flex: 1}}>
          <ImageViewer
            renderIndicator={renderIndicator}
            imageUrls={[{url: `${selectedImageUri}`}]}
            enableSwipeDown={true}
            onSwipeDown={() => setIsModalVisible(false)}
            style={{backgroundColor: 'black'}}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  data_view: {marginVertical: 10,paddingLeft:7},
  small_txt: {fontSize: 12, fontWeight: '300', fontFamily: 'Poppins-Medium'},
  bold_txt: {fontSize: 16, fontFamily: 'Poppins-Bold'},
  usename_txt: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    marginVertical: 4,
    marginTop: 15,
  },
  avtarimg: {height: 130, width: 130, borderRadius: 80},
  header_view: {
    height: 40,
    width: '30%',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
  },
  setting_view: {
    height: 32,
    width: 32,
    backgroundColor: Colors.Bluebg,
    // marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
