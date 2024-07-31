import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { CommonText } from '../../../components'
import { Colors } from '../../../constant'
import { useTranslation } from 'react-i18next'
import { LanguageContext } from '../../../language/LanguageContext'

const YouWanted = () => {
    const navigation = useNavigation()
    const {t}=useTranslation();
    const {selectedLanguage}=useContext(LanguageContext);
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
            <View style={styles.wantjobView}>
                <Image source={require('../../../assets/Images/wantjob.png')} style={styles.ImgStyl} />
                <View style={styles.TxtView}>
                    <CommonText style={styles.txt1}>{t('I WANT A JOB')}</CommonText>
                    <TouchableOpacity onPress={() => { navigation.navigate('personalinfo') }}>
        
                        <Image source={require('../../../assets/Images/bluearrow.png')} style={styles.arrowstyl} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.wantHireView}>
                <Image source={require('../../../assets/Images/wantHire.png')} style={styles.ImgStyl2} />
                <View style={styles.TxtView}>
                    <CommonText style={styles.txt2}>{t('I WANT TO HIRE')}</CommonText>
                    <TouchableOpacity onPress={()=>navigation.navigate("campanyinfo")}>
                        <Image source={require('../../../assets/Images/whitearrow.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default YouWanted

const styles = StyleSheet.create({
    wantjobView: { height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' },
    wantHireView: { height: '50%', backgroundColor: Colors.Bluebg, width: '100%', justifyContent: 'center', alignItems: 'center' },
    TxtView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 33 },
    ImgStyl: { height: 180, width: 260 },
    ImgStyl2: { height: 220, width: 245 },
    arrowstyl: { height: 43, width: 43 },
    txt1: { fontFamily: 'Montserrat-Bold', marginRight: 15, fontSize: 24 },
    txt2: { fontFamily: 'Montserrat-Bold', marginRight: 15, fontSize: 24, color: Colors.whitetxt }
})