import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React ,{useEffect}from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonText} from '../../../components';
import UploadedJob from '../../allScreens/WantHire/UploadedJobs';
import PostJob from '../../allScreens/WantHire/PostJob';
import ViewProfile from '../../allScreens/WantHire/ViewProfile';
import { useIsFocused } from '@react-navigation/native';
import { Colors } from '../../../constant';


const Tab = createBottomTabNavigator();

const TabHireNav = () => {

 
  return (
    <Tab.Navigator
      initialRouteName="UploadJob"
      screenOptions={{
        activeTintColor: 'rgba(61, 178, 255, 1)',
        inactiveTintColor: 'rgba(164, 158, 181, 1)',
        tabBarStyle: {
          height: 70,
          // marginBottom: 10,
        },
        labelStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen
        name="UploadJob"
        component={UploadedJob}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 23, width: 23, tintColor: color}}
              source={require('../../../assets/Images/Home.png')}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="PostJob"
        component={PostJob}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({color}) => (
          //  <ImageBackground     resizeMode="contain" source={require('../../../assets/Images/Add.png')} style={{height: 200, width: 200, tintColor:Colors.Bluebg}}>
           
          //  </ImageBackground>
          <View style={{backgroundColor:Colors.Bluebg,height:39,width:39,justifyContent:'center',alignItems:'center',borderRadius:40}}>
          <Image resizeMode="contain" source={require('../../../assets/Images/plusss.png')} style={{height: 12, width: 12, tintColor:Colors.white}}>

         </Image>
         </View>
          ),
        }}
      />
    <Tab.Screen
    name="Profile"
    component={ViewProfile}
    options={({route}) => ({
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({color}) => (
        <Image
          style={{height: 24, width: 16, tintColor: color}}
          source={require('../../../assets/Images/profile.png')}
          resizeMode="contain"
        />
      ),
     
    })}
  />
    </Tab.Navigator>
    //
  );
};

export default TabHireNav;

const styles = StyleSheet.create({});
