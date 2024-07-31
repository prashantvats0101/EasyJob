import { View, Text } from 'react-native'
import React from 'react'


import SplashScreen from '../screens/onboarding/SplashScreen';
import Language from '../screens/allScreens/StartingScreens/Language';
import GetStarted from '../screens/allScreens/StartingScreens/GetStarted';
import Login from '../screens/authStack/Login';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OTPScreen from '../screens/allScreens/StartingScreens/OTPScreen';
import YouWanted from '../screens/allScreens/StartingScreens/YouWanted';
import PersonalInfo from '../screens/allScreens/Wantjob/PersonalInfo';
import JobInfo from '../screens/allScreens/Wantjob/JobInfo';
import TabNavigator from '../screens/mainStack/TabNavigation/TabNavigator';
import JobDetail from '../screens/allScreens/Wantjob/JobDetail';
import Report from '../screens/allScreens/Wantjob/Report';
import Applynow from '../screens/allScreens/Wantjob/Applynow';
import MyProfile from '../screens/allScreens/Wantjob/MyProfile';
import PersnolDetail from '../screens/allScreens/Wantjob/PersnolDetail'
import Setting from '../screens/allScreens/Wantjob/Setting';
import Messages from '../screens/allScreens/Wantjob/Messages';
import DmMessage from '../screens/allScreens/Wantjob/DMmessage';
import Campanyinfo from '../screens/allScreens/WantHire/Campanyinfo';
import TabHireNav from '../screens/mainStack/TabHireNavi/TabHireNavigation';
import PostJobSecond from '../screens/allScreens/WantHire/PostJobSecond';
import Notification from '../screens/allScreens/Wantjob/Notification';
import ContactSupport from '../screens/allScreens/WantHire/ContactSupport';
import Filter from '../screens/allScreens/Wantjob/Filter';
import ThirdPostJob from '../screens/allScreens/WantHire/ThirdPostJob';
import JobDetailPost from '../screens/allScreens/WantHire/JobDetailPost';
import PdfViewScreen from '../screens/allScreens/Wantjob/pdfscreen';
import UpdateJob from '../screens/allScreens/WantHire/UpdateJob';
import Cvmaking from '../screens/allScreens/Wantjob/Cvinfo';
import EditProfile from '../screens/allScreens/Wantjob/EditProfile';
import EditCampanyProfile from '../screens/allScreens/WantHire/EditCampanyProfile';
import Cvmakesecond from '../screens/allScreens/Wantjob/cvmakesecond';
import Cvmakethird from '../screens/allScreens/Wantjob/cvmakethird';
import Toast from 'react-native-toast-message';
import { RootSiblingParent } from 'react-native-root-siblings';
import SearchScreen from '../screens/allScreens/Wantjob/SearchScreen';
import PopularCategory from '../screens/allScreens/Wantjob/PopularCategory';
import ExploreCategory from '../screens/allScreens/Wantjob/ExploreCategory';




const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
   
    return (
        <RootSiblingParent>
    
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='SpleshScreen'
            // initialRouteName='JobInfo'

        >
            <Stack.Screen name='SpleshScreen' component={SplashScreen} />
            <Stack.Screen name='Language' component={Language} />
            <Stack.Screen name='GetStarted' component={GetStarted} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='OTP' component={OTPScreen} />
            <Stack.Screen name='Youwant' component={YouWanted} />
            <Stack.Screen name='personalinfo' component={PersonalInfo} />
            <Stack.Screen name='JobInfo' component={JobInfo} />
            <Stack.Screen name='TabNavigation' component={TabNavigator} />
            <Stack.Screen name='JobDetail' component={JobDetail} />
            <Stack.Screen name='Report' component={Report} />
            <Stack.Screen name='ApplyNow' component={Applynow} />
            <Stack.Screen name='Pdfview' component={PdfViewScreen}/>
            <Stack.Screen name='MyProfile' component={MyProfile} />
            <Stack.Screen name='ParsnolDetails' component={PersnolDetail} />
            <Stack.Screen name='Setting' component={Setting} />
            <Stack.Screen name='Message' component={Messages} />
            <Stack.Screen name='Dmmessage' component={DmMessage} />
            <Stack.Screen name='campanyinfo' component={Campanyinfo} />
            <Stack.Screen name='TabHireNavi' component={TabHireNav} />
            <Stack.Screen name='PostjobSecond' component={PostJobSecond} />
            <Stack.Screen name='Notification' component={Notification} />
            <Stack.Screen name='contactus' component={ContactSupport} />
            <Stack.Screen name='filter' component={Filter} />
            <Stack.Screen name='JobdeteilPost' component={JobDetailPost} />
            <Stack.Screen name='ThirdPostjob' component={ThirdPostJob} />
            <Stack.Screen name='UpdateJob' component={UpdateJob} />
            <Stack.Screen name='cv' component={Cvmaking} />
            <Stack.Screen name='cvsecond' component={Cvmakesecond} />
            <Stack.Screen name='cvthird' component={Cvmakethird} />
            <Stack.Screen name='EditPro' component={EditProfile} />
            <Stack.Screen name='CampanyEditPro' component={EditCampanyProfile} />
            <Stack.Screen name='SearchScreen' component={SearchScreen} />
            <Stack.Screen name='PopularCategory' component={PopularCategory} />
            <Stack.Screen name='ExploreCategory' component={ExploreCategory} />
            
        </Stack.Navigator>

            <Toast/>
         
            </RootSiblingParent>
    )
}

export default StackNavigation