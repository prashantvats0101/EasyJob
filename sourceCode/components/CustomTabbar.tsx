// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { useNavigation } from '@react-navigation/native'

// const CustomTabbar = ({ ...props }) => {
//     const navigation = useNavigation()
//     return (
//         <View style={{ height: 70, flexDirection: 'row', justifyContent: 'space-between' }}>
//             <TouchableOpacity onPress={() => { navigation.navigate('Search') }}>
//             <Image
//                             style={{ height: 23, width: 23, }}
//                             source={require('../assets/Images/Home.png')}
//                             resizeMode='contain'
//                         />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => { navigation.navigate('Category') }}>
//             <Image
//                            style={{ height: 15, width: 18, }}
//                             source={require('../assets/Images/jobs.png')}
//                             resizeMode='contain'
//                         />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => { navigation.navigate("Jobs") }}>
//             <Image
//                            style={{  height: 17, width: 13, }}
//                             source={require('../assets/Images/Group2.png')}
//                             resizeMode='contain'
//                         />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//             <Image
//                            style={{ height: 15, width: 18, }}
//                             source={require('../assets/Images/.png')}
//                             resizeMode='contain'
//                         />
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default CustomTabbar

// const styles = StyleSheet.create({})