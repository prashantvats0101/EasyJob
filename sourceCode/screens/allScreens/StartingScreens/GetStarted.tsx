import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React,{useContext} from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'
import Colors from '../../../constant/Colors'
import { CommonText, OpacityButton } from '../../../components'
import { LanguageContext } from '../../../language/LanguageContext';
const GetStarted = () => {
    const navigation = useNavigation()
    const { t } = useTranslation();
    const { selectedLanguage } = useContext(LanguageContext);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'#fff'} />
            <ImageBackground source={require('../../../assets/Images/backgroundimg.png')} style={styles.backgroundimg}>
                <View style={styles.txtview}>
                    <CommonText style={styles.txtstyl}>{t('Find Your ')}</CommonText>
                    <CommonText style={styles.txtstyl2}>{t('Dream Job')}</CommonText>
                    <CommonText style={styles.txtstyl}>{t('Here!')}</CommonText>
                    <CommonText style={styles.txtstyl3}>{t('Explore all the most exciting job roles based on your interest and study major.')}</CommonText>

                </View>
                <View style={styles.imgView}>
                    <View style={{ width: '13%' }} />
                    <Image resizeMode='contain' source={require('../../../assets/Images/getstartedimg.png')} style={styles.imgg} />
                </View>
                <OpacityButton
                    btnTextStyle={{ fontSize: 14, }}
                    name={t('GET STARTED')}
                    button={{ marginTop: 40, width: '70%', }}
                    pressButton={() => { navigation.replace('Login') }}
                />
            </ImageBackground>
        </SafeAreaView>

    )
}

export default GetStarted

const styles = StyleSheet.create({
    backgroundimg: { height: '100%', width: '100%' },
    txtview: { paddingHorizontal: 29, paddingTop: 40, },
    txtstyl: { fontSize: 33, color: '#000000' ,fontFamily:'Montserrat-Bold'},
    txtstyl2: { fontSize: 33, color: Colors.Bluebg, textDecorationLine: 'underline', fontFamily:'Montserrat-Bold'},
    txtstyl3: { fontSize: 14,  color: '#524B6B', marginTop: 5 ,fontFamily:'Montserrat-Light'},
    imgg: { height: 370, width: 363, resizeMode: 'center' },
    imgView: { justifyContent: 'space-between', flexDirection: 'row', height: 370, width: '100%', marginTop: 50 }
})