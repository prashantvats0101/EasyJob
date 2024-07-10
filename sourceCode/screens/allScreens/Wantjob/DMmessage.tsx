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
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import {CommonText} from '../../../components';
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment';
import apiName, {BASEURL, PDF_UPLOAD} from '../../../Api/apiName';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import FileViewer from 'react-native-file-viewer';
import { setLoading } from '../../../Redux/reducer';
import Loaderr from '../StartingScreens/Loaderr';
import { Show_Toast } from '../../../utils/helper';


const DmMessage = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [messages, setMessages] = useState([]);
const [imagedata, setimagedata] = useState('')
const myid  = useSelector<any>(
  state => state?.cookies?.loginUser.data?.user?._id || 
  state?.cookies?.loginUser.data?.createCompany?._id ||
  state?.cookies?.loginUser.data?.findUserId?._id
);
console.log(myid,"jkdjkbdfsjkfdsjk")

  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser?.data?.token,
  );
  const isLoading = useSelector<any>(state => state?.sliceReducer?.loading);
const dispatch = useDispatch()
const navigation = useNavigation();

useEffect(() => {
  const intervalId = setInterval(() => {
    fetchmessagefromadmin();
  }, 1000); 

  return () => {
    clearInterval(intervalId); 
  };
}, []); 

// console.log(myid,"hellllllllllLLooo")
const fetchmessagefromadmin =async()=>{

const url= `${BASEURL}${apiName.Get_message}663b1f04d277345f997eea62${myid}`
try {
  const response = await axios.get(url,{
    headers:{
      Authorization:HeaderToken
    }
  })
  const data =response?.data?.data?.reverse()
  setMessages(data)
  // console.log(response?.data?.data,'getdata===')
} catch (error) {
  console.log('fetchmessagefromadmin === error ==>>', error)
}
}


  const PostMessage = async () => {
    const trimmedMessage = textInputValue.trim();
    const url = `${BASEURL}${apiName.POST_MESSAGE}`;
    const data = {
      message: trimmedMessage,
      type: 'text',
      reciverId: '663b1f04d277345f997eea62',
    };
    try {
      const token = HeaderToken;
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(response.data?.data, 'reee======>>>>');
      
 
      fetchmessagefromadmin()
      setTextInputValue('');

    } catch (error) {
      console.log(error, 'error===');
    }
  };

  
  const handleMediaPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      if (!res) return; // Check if res is valid

      const newMessage = {
        id: messages.length + 1,
        pdf: res[0].uri,
        filename: res[0].name,
        sender: 'self',
        time: moment().format('HH:mm'),
      };
      // console.log('=====>', res[0].name);

      // console.log(res[0].name,"hhhhh===jj")
      setimagedata(res[0]?.uri)
      pdffupload(res[0]?.uri);
      // const data = [...messages, newMessage].reverse();
      // setMessages(data);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        Alert.alert('Error', 'Failed to pick PDF file');
      }
    }
  };

  const pdffupload = async (data) => {
    dispatch(setLoading(true))
    try {
      const formData = new FormData();
      formData.append('pdf', {
        uri: data,
        type: 'application/pdf',
        name: 'document.pdf',
      });

      const uploadResponse = await axios.post(`${PDF_UPLOAD}`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

     
      let b = uploadResponse.data.filename;
      dispatch(setLoading(false))
      POSTPDF(b);
      console.log(b, 'pdffffff===');
    } catch (error) {
      dispatch(setLoading(false))
      console.error('Error uploading PDF:', error,"pdf uploading api error ");
    }
  };

  const POSTPDF = async pdfnamee => {
    // console.log(pdfnamee,"pdfffffnameeeeee======>>>>")
    dispatch(setLoading(true))
    const trimmedMessage = textInputValue.trim();

    const newMessage = {
      id: messages.length + 1,
      message: trimmedMessage,
      sender: 'self',
      time: moment().format('hh:mm a'),
    };

    const url = `${BASEURL}${apiName.POST_MESSAGE}`;
    const data = {
      message: pdfnamee,
      type: 'pdf',
      reciverId: '663b1f04d277345f997eea62',
    };
    try {
      const token = HeaderToken;
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response, 'reeepo');
      dispatch(setLoading(false))
      fetchmessagefromadmin()
      setTextInputValue('');
    } catch (error) {
      Show_Toast('error','Failed To Send PDF')
      console.log(error, 'error=== Post Pdf message api Error');
      dispatch(setLoading(false))
    }
  };



  const openPdfWithThirdPartyApp = async contentUri => {
    try {
      await FileViewer.open(contentUri, {showOpenWithDialog: true});
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  const renderChatMessage = ({item}) => {
    // console.log(item.filename,"itemmmm")
    return (
      <View style={{paddingHorizontal: 17, marginVertical: 5}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: item.senderId === myid? 'flex-end' : 'flex-start',
          }}>
          {item.senderId !== myid && (
            <Image
              source={require('../../../assets/Images/Splashimg.png')}
              style={{width: 40, height: 40, borderRadius: 20, marginRight: 8}}
            />
          )}
          <View
            style={{
              backgroundColor: item.senderId === myid ? '#3DB2FF' : '#00000040',
              padding: 13,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: item.senderId != myid ? 10 : 0,
              borderBottomLeftRadius: item.senderId === myid ? 10 : 0,
              borderWidth: item.senderId === myid ? 0 : 0,
              borderColor: item.senderId === myid ? '#00000040' : null,
              maxWidth: 190,
            }}>
            {item.type == 'pdf' ? (
              <TouchableOpacity
                onPress={() => {
                  openPdfWithThirdPartyApp(imagedata);
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/Images/PDF.png')}
                    style={{width: 20, height: 20, marginRight: 5}}
                  />
                  <Text
                    style={[
                      {
                        color:
                        item.senderId === myid ? Colors.white : '#524B6B',
                      },
                    ]}
                    numberOfLines={3}>
                    {'PDF'}
                  </Text>
                  <Image
                    source={require('../../../assets/Images/Options.png')}
                    style={{width: 20, height: 20, marginRight: 5}}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <Text
                style={[
                  styles.messagestyl,
                  {color: item.senderId === myid ? Colors.white : '#524B6B'},
                ]}
                numberOfLines={0}
                ellipsizeMode="tail">
                {item.message}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: item.senderId === myid ? 'flex-end' : 'flex-start',
            marginTop: 4,
          }}>
          <Text
            style={{
              color: '#AAA6B9',
              fontSize: 10,
              fontFamily: 'DMSans-Medium',
              marginLeft: item.senderId === myid ? 48 : null,
            }}>
            {item.time}
          </Text>
          {item.senderId === myid ? (
            <Image
              source={require('../../../assets/Images/doublecheck.png')}
              style={{height: 10, width: 13, marginLeft: 3}}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar backgroundColor={Colors.white} />
      <HeaderComp
        img={require('../../../assets/Images/Back.png')}
        // img2={require('../../../assets/Images/Options.png')}
        style={{paddingHorizontal: 15, marginTop: 30}}
      />
        {isLoading && <Loaderr />}
      <View style={styles.userview}>
        <Image
          source={require('../../../assets/Images/Splashimg.png')}
          resizeMode="contain"
          style={{height: 50, width: 50}}
        />
        <CommonText style={styles.usernametxt}>Easy Jobs's Admin</CommonText>
      </View>
      <View style={{flex: 1,}}>
        <Text style={styles.today}>Today</Text>
        <FlatList
          data={messages}
          renderItem={renderChatMessage}
          keyExtractor={item => item?.id?.toString()}
          style={{marginBottom:'20%'}}
          
          inverted
        />
       
      </View>
      <View
          style={{
            flexDirection: 'row',
            bottom: 13,
            position: 'absolute',
            alignSelf: 'center',
            alignItems: 'center',
            width: '85%',
            paddingHorizontal: 10,
            minHeight: 50,
            maxHeight: 80,
          }}>
          <TouchableOpacity onPress={handleMediaPress}>
            <Image
              source={require('../../../assets/Images/Attachment.png')}
              style={{height: 24, width: 24}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TextInput
            style={{marginLeft: 10, width: '77%',color:Colors.blacktxt}}
            value={textInputValue}
            onChangeText={setTextInputValue}
            placeholder="Write your massage"
            multiline={true}
            placeholderTextColor={Colors.blacktxt}
          />
          {/* <TouchableOpacity onPress={fetchmessagefromadmin}> */}
          <TouchableOpacity onPress={PostMessage}>
            <Image
              source={require('../../../assets/Images/Send.png')}
              style={{height: 50, width: 50}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default DmMessage;

const styles = StyleSheet.create({
  userview: {
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#99ABC62E',
  },
  usernametxt: {
    marginLeft: 10,
   
    color: '#101828',
    fontFamily: 'DMSans-Medium',
  },
  messagestyl: {fontSize: 13, fontFamily: 'DMSans-Medium'},
  timee: {color: '#AAA6B9', fontSize: 10, fontFamily: 'DMSans-Medium'},
  today: {
    color: '#AAA6B9',
    fontSize: 10,
    fontFamily: 'DMSans-Medium',
    alignSelf: 'center',
    fontSize: 12,
    marginTop: 7,
  },
});
