import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import ImgButton from '../../../components/ImgButton';
import { useNavigation } from '@react-navigation/native';
import { CommonText } from '../../../components';


const Notification = () => {
  // const data = [
  //   {
  //     id: 1,
  //     img: require('../../../assets/Images/google.png'),
  //     title: 'Application sent',
  //     notification:
  //       'Applications for Google companies have entered for company review',
  //     time: '25 minutes ago',
  //     delete: 'Delete',
  //   },
  //   {
  //     id: 2,
  //     img: require('../../../assets/Images/Dribbble.png'),
  //     title: 'Application sent',
  //     notification:
  //       'Applications for Dribbble companies have entered for company review',
  //     time: '45 minutes ago',
  //     delete: 'Delete',
  //   },
  //   {
  //     id: 3,
  //     img: require('../../../assets/Images/Twitterlogo.png'),
  //     title: 'Application sent',
  //     notification: 'Applications for Twitter companies have entered for company review',
  //     time: '5 Hours ago',
  //     delete: 'Delete',
  //   },
  //   {
  //     id: 4,
  //     img: require('../../../assets/Images/Logoapple.png'),
  //     title: 'Application sent',
  //     notification:
  //       'Applications for Apple companies have entered for company review',
  //     time: '1 Day ago',
  //     delete: 'Delete',
  //   },
  //   {
  //     id: 5,
  //     img: require('../../../assets/Images/facebook.png'),
  //     title: 'Application sent',
  //     notification:
  //       'Applications for Facebook companies have entered for company review',
  //     time: '12 February 2022',
  //     delete: 'Delete',
  //   },
  //   {
  //       id: 6,
  //       img: require('../../../assets/Images/facebook.png'),
  //       title: 'Application sent',
  //       notification:
  //         'Applications for Facebook companies have entered for company review',
  //       time: '12 February 2022',
  //       delete: 'Delete',
  //     },
  //     {
  //       id: 7,
  //       img: require('../../../assets/Images/facebook.png'),
  //       title: 'Application sent',
  //       notification:
  //         'Applications for Facebook companies have entered for company review',
  //       time: '12 February 2022',
  //       delete: 'Delete',
  //     },
  // ];

  const data = [

  ]
const navigation = useNavigation()

  const renderItem = ({item, index}) => {
  let backgroundColor = index === 0 ? '#7551FF' : '#FFFFFF'; // Check if index is 0
  // Or if you want to check based on item id: 
  // let backgroundColor = item.id === 1 ? '#7551FF' : '#FFFFFF';

  return (
    <View style={[styles.main_render_view, {backgroundColor}]}>
      <View style={styles.render_view}>
        <Image source={item.img} resizeMode='contain' style={{height:40,width:40}}/>
        <View style={{width:'86%',height:97,marginLeft:4}}>
          <Text style={styles.titlestyl}> {item.title}</Text>
          <Text style={styles.notificationstyl}>{item.notification}</Text>
          <View style={{flexDirection: 'row',justifyContent:'space-between',marginTop:25}}>
            <Text style={styles.timestyl}>{item.time}</Text>
            <TouchableOpacity style={{width:50}}>
              <Text style={styles.deletestyl}>{item.delete}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const list_empty =()=>{
  return(
    <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
     flex:1,height:650,width:'100%',
    }}>
    <Image
      source={require('../../../assets/Images/Illustrasi.png')}
      resizeMode="contain"
      style={{height: 177, width: 157}}
    />
    <CommonText
      style={{
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
        color: '#1D1D1D',
        marginTop: 30,
      }}>
      No Notification found
    </CommonText>
  </View>
  )
}

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        // paddingHorizontal: 10,
        paddingVertical: 7,
      }}>
      <StatusBar backgroundColor={Colors.white} />
   
      <View style={styles.HeaderView}>
      <TouchableOpacity style={{height: 24, width: 24}}
        onPress={()=>{navigation.goBack()}}
        >
          <Image
            source={require('../../../assets/Images/Back.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <CommonText style={styles.Txtstyl}>Notification</CommonText>
        <TouchableOpacity>
        <Text style={styles.Headertxt}>Read all</Text>
        </TouchableOpacity>
      </View>
     
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
ListEmptyComponent={
  list_empty
}
/>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  Txtstyl: { fontFamily: 'Montserrat-Bold', fontSize: 20 },
    render_view:{flexDirection: 'row',paddingHorizontal:5,width:'100%'},
  main_render_view: {
    borderWidth: 1,
    height: 121,
    marginVertical: 7,
    borderRadius: 20,
    padding:10,
    backgroundColor:'#FFFFFF',
    elevation:6,
    width:335,
    // borderWidth:1,
    alignSelf:'center'
  },
  titlestyl:{
    fontFamily:'DMSans-Bold',
    color:'#150B3D',fontSize:14
  },
  timestyl:{
    fontSize:11,
    color:'#AAA6B9',
    fontFamily:'DMSans-Medium',

  },
  deletestyl:{
    color:'#FF4B4B',
    fontSize:12,
    fontFamily:'DMSans-Medium',

  },
  notificationstyl:{
    fontFamily:'DMSans-Medium',
    color:'#524B6B',
    fontSize:12,
    marginTop:5
  },
  HeaderView: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
    // borderWidth: 1,
    height: 30,
    alignItems: 'center',
  },
  Headertxt: {
    fontSize: 12,
    fontFamily: 'DMSans-Medium',
    color: Colors.Bluebg,
  },
});


