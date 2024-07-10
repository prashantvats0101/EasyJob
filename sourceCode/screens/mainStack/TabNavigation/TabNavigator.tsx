import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import JobSearch from './JobSearch'
import Category from './Category'
import MainJobs from './MainJobs'
import Profile from './Profile'
import MyProfile from '../../allScreens/Wantjob/MyProfile'

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    return (


        <Tab.Navigator initialRouteName='Search'
            screenOptions={{
                activeTintColor: 'rgba(61, 178, 255, 1)',
                inactiveTintColor: 'rgba(164, 158, 181, 1)',
                tabBarStyle: {
                    height: 70,
                    // marginBottom: 10,
                },
                labelStyle: {
                    display: 'none'
                }
            }}
        >
            <Tab.Screen name='Search' component={JobSearch}

                options={{

                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={{ height: 23, width: 23, tintColor: color }}
                            source={require('../../../assets/Images/Home.png')}
                            resizeMode='contain'
                        />
                    ),
                }}
            />
            <Tab.Screen name='Category' component={Category}
                options={{

                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image style={{ height: 15, width: 18, tintColor: color }}
                            source={require('../../../assets/Images/jobs.png')} resizeMode='contain' />
                    ),
                }}
            />
            <Tab.Screen name='Jobs' component={MainJobs}
                options={{

                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={{ height: 17, width: 13, tintColor: color }}
                            source={require('../../../assets/Images/Group2.png')}
                            resizeMode='contain'
                        />
                    ),
                }}
            />
            <Tab.Screen name='MyProfile' component={MyProfile}
                options={{

                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image
                            style={{ height: 24, width: 16, tintColor: color }}
                            source={require('../../../assets/Images/profile.png')}
                            resizeMode='contain'
                        />
                    ),
                }}
            />
        </Tab.Navigator>


    )
}

export default TabNavigator

const styles = StyleSheet.create({})



// import { StyleSheet, Text, View, Image } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import JobSearch from './JobSearch'
// import Category from './Category'
// import MainJobs from './MainJobs'
// import Profile from './Profile'
// import CustomTabbar from '../../../components/CustomTabbar'

// const TabNavigator = () => {
//     const Tab = createBottomTabNavigator()
//     return (


//         <Tab.Navigator


//             initialRouteName='Search'
//             screenOptions={{
//                 activeTintColor: 'rgba(61, 178, 255, 1)',
//                 inactiveTintColor: 'rgba(164, 158, 181, 1)',
//                 tabBarStyle: {
//                     height: 70,
//                     // marginBottom: 10,
//                 },
//                 labelStyle: {
//                     display: 'none'
//                 }
//             }}
//             tabBar={(props) => <CustomTabbar {...props} />}
//         >
//             <Tab.Screen name='Search' component={JobSearch}

//                 options={{

//                     tabBarShowLabel: false,
//                     headerShown: false,
//                     tabBarIcon: ({ color }) => (
//                         <Image
//                             style={{ height: 23, width: 23, tintColor: color }}
//                             source={require('../../../assets/Images/Home.png')}
//                             resizeMode='contain'
//                         />
//                     ),
//                 }}
//             />
//             <Tab.Screen name='Category' component={Category}
//                 options={{

//                     tabBarShowLabel: false,
//                     headerShown: false,
//                     tabBarIcon: ({ color }) => (
//                         <Image style={{ height: 15, width: 18, tintColor: color }}
//                             source={require('../../../assets/Images/jobs.png')} resizeMode='contain' />
//                     ),
//                 }}
//             />
//             <Tab.Screen name='Jobs' component={MainJobs}
//                 options={{

//                     tabBarShowLabel: false,
//                     headerShown: false,
//                     tabBarIcon: ({ color }) => (
//                         <Image
//                             style={{ height: 17, width: 13, tintColor: color }}
//                             source={require('../../../assets/Images/Group2.png')}
//                             resizeMode='contain'
//                         />
//                     ),
//                 }}



//             />
//         </Tab.Navigator>


//     )
// }

// export default TabNavigator

// const styles = StyleSheet.create({})