import React, { useEffect } from "react"
import { Image, ImageBackground, SafeAreaView, StatusBar, Text } from "react-native"
import { Colors } from "../../constant"
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux"


const SplashScreen = () => {
    const navigation = useNavigation()
    const login_user = useSelector<any>(state => state?.cookies?.loginUser)
    console.log(login_user)
  
    // useEffect(() => {
    //     setTimeout(() => {
    //         navigation.replace("GetStarted")
    //     }, 2000)
    // }, [])
     useEffect(() => {
        setTimeout(() => {
            
            if (login_user?.data?.token)  {
                if(login_user?.data?.findUserId?.userType === "jobSeeker"){
                    navigation.replace("TabNavigation");
                    
                }else if(login_user?.data?.user?.userType === "jobSeeker"){
                    navigation.replace("TabNavigation");
                }
                
                else{
                   navigation.replace("TabHireNavi");
                }
                
            } else {
                navigation.replace("Language");
                
            }
        }, 3000);
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whitetxt, }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.whitetxt} animated={true} />
            <ImageBackground source={require('../../assets/Images/backgroundimg.png')} style={{ height: '100%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Image source={require('../../assets/Images/Splashimg.png')} style={{ height: 300, width: "100%", alignSelf: 'center', marginBottom: 60 }} resizeMode='contain'/>

            </ImageBackground>
        </SafeAreaView>
    )
}

export default SplashScreen