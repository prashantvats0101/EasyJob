import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { Colors } from '../../../constant'
import HeaderComp from '../../../components/HeaderComp'
import { CommonText, OpacityButton } from '../../../components'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import apiName, { BASEURL } from '../../../Api/apiName'


const Category = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false)
    const [bannerimage, setbannerimage] = useState([]);
    const deviceWidth = Dimensions.get('window').width;
    useFocusEffect(
        React.useCallback(() => {

            getBannar();
        }, []),
    );

    const data = [
        {
            id: 1,
            img: require('../../../assets/Images/jobdescription.png'),
            text: 'Job Eligible Test',
            height: 51,
            width: 51
        },
        {
            id: 2,
            img: require('../../../assets/Images/analysis.png'),
            text: 'Personality Eligible ',
            height: 61,
            width: 61,
            text2: 'Test',
        },
        {
            id: 3,
            img: require('../../../assets/Images/cvimg.png'),
            text: 'CV Making',
            height: 54,
            width: 54
        },
        {
            id: 4,
            img: require('../../../assets/Images/hrmanager.png'),
            text: 'HR Calling',
            height: 48,
            width: 48
        },
    ]
    const flatListRef = useRef(null)
    const getBannar = async () => {
        try {
            const response = await axios.get(`${BASEURL}${apiName.GET_BANNER}`);
            // console.log(response.data?.data[0].image,"data==========")
            setbannerimage(response.data?.data);
        } catch (error) {
            console.log(error, '<<===error aagya');
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % bannerimage?.length;
            flatListRef?.current?.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex, flatListRef, bannerimage]);

    const renderIndicator = (index) => (
        <View
            key={index}
            style={{
                width: currentIndex === index ? 19 : 8,
                height: 4,
                borderRadius: 4,
                backgroundColor: currentIndex === index ? Colors.Bluebg : 'rgba(210, 210, 210, 1)',

                marginHorizontal: 2,
            }}
        />
    );

    const navigation = useNavigation()
    const handleItemPress = (itemId) => {
        if (itemId === 4) {
            handleDeleteModal()

        } else if (itemId === 3) {
            console.log('press Cv making')
            navigation.navigate('cv');
        } else if (itemId === 2) {
            console.log('press Personality Eligible')
        } else if (itemId === 1) {
            console.log('pressed Job Eligible Test')
        }
    };


    const renderItem2 = ({ item, index }) => (

        <TouchableOpacity style={styles.render2view} onPress={() => handleItemPress(item.id)} >
            <View style={styles.renderimgv}>
                <View >
                    <Image source={item.img} style={{ height: item.height, width: item.width, marginBottom: 20, }} resizeMode="contain" />
                </View>
                <CommonText style={styles.rendertxt}>{item.text}</CommonText>
                <CommonText style={styles.rendertxt}>{item.text2}</CommonText>
            </View>
        </TouchableOpacity>

    );

    const handleDeleteModal = () => {
        setModalOpen(true);

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", }}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.whitetxt} />
            <HeaderComp
                txt="Category"
                style={{ marginTop: 40 }}
            />
            <View style={styles.textinputstyl}>
                <TextInput placeholder='Search Job'

                    placeholderTextColor={Colors.lightbrown}
                    style={styles.Input}
                />
                <Image source={require('../../../assets/Images/SearchI.png')} style={styles.Searchimg} />
            </View>
            <View style={{ height: '3%' }} />
            <ScrollView >


                <View style={[styles.flatlistmainview, { width: deviceWidth,}]}>
                    <FlatList
                        ref={flatListRef}
                        data={bannerimage}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatlistContentContainer}
                        onScroll={event => {
                            const { contentOffset } = event.nativeEvent;
                            const index = Math.floor(
                                contentOffset.x / event.nativeEvent.layoutMeasurement.width,
                            );
                            setCurrentIndex(index);
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.itemrenderview, { width: deviceWidth }]}>
                                <Image
                                    resizeMode="stretch"
                                    source={{ uri: item.image }}
                                    style={styles.imagee}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.toString()}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                        {bannerimage.map((_, index) => renderIndicator(index))}
                    </View>
                </View>

                <FlatList
                    data={data}
                    renderItem={renderItem2}
                    keyExtractor={(item) => item.key}

                    numColumns={2}
                />
            </ScrollView>
            <Modal
                visible={modalOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalOpen(false)}
            >
                <View style={styles.modalmainview}>
                    <View style={styles.modaldataview}>
                        <Image source={require('../../../assets/Images/calliconn.png')} style={styles.deleteimg} />
                        <Text style={styles.modaltxt}>Mobile Number</Text>
                        <Text style={styles.numbertxtt}>+91 9876543210</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", marginTop: 25 }}>
                            <OpacityButton
                                name="Call"
                                button={styles.YesButton}
                                pressButton={() => setModalOpen(false)}
                            />
                            <OpacityButton
                                name="Cancel"
                                button={styles.NoButton}
                                pressButton={() => setModalOpen(false)}
                            />

                        </View>

                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default Category

const styles = StyleSheet.create({
    textinputstyl: { backgroundColor: Colors.whitetxt, height: 46, width: '95%', alignSelf: 'center', flexDirection: 'row', borderRadius: 10, marginTop: 20, paddingHorizontal: 10, elevation: 9, paddingLeft: 20 },
    Input: { width: '90%', color: Colors.blacktxt, fontSize: 15, fontFamily: 'Montserrat-Bold', },
    Searchimg: { alignSelf: 'center' },
    flatlistmainview: {
        height: 230,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 5,
      },
    flatlistContentContainer: {
        flexGrow: 1,
        marginTop: 10,
      },
      imagee: {width: '100%', height: '100%', alignSelf: 'center'},
    render2view: { flexDirection: 'row', flex: 1, marginTop: 30, alignItems: 'center', justifyContent: 'center' },
    renderimgv: { borderWidth: 1, height: 150, justifyContent: 'center', alignItems: 'center', width: 136, borderRadius: 20, borderColor: "#E8E8E8" },
    rendertxt: { fontFamily: 'OpenSans-Bold', fontSize: 12, color: Colors.rgba96, },
    NoButton: { marginVertical: 1, backgroundColor: "rgba(215, 215, 215, 1)", width: 141, },
    YesButton: { marginVertical: 1, width: 141, },
    modaltxt: { fontSize: 17, fontFamily: 'Montserrat-Bold', alignSelf: 'center', color: "#000000", marginTop: 10 },
    numbertxtt: { fontSize: 15, color: '#6D6D6D', fontFamily: 'OpenSans-Bold', alignSelf: 'center', marginBottom: 25, marginVertical: 10 },
    deleteimg: { height: 125, width: 125, alignSelf: 'center', marginTop: 6 },
    modalmainview: { flex: 1, justifyContent: 'center', alignItems: 'center', width: "90%", alignSelf: 'center', },
    modaldataview: { padding: 10, height: 340, backgroundColor: "rgba(255, 255, 255, 1)", elevation: 5, borderRadius: 10 }
})