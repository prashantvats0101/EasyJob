import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {CommonText} from '../../../components';
import {useFocusEffect} from '@react-navigation/native';

const PopularCategory = ({navigation}:any) => {
  const HeaderToken = useSelector<any>(
    state => state?.cookies?.loginUser.data?.token,
  );
  const [category, setcategory] = useState('');
  const renderItem = ({item}: any) => {
    // console.log(item,"asdfghjk=========")
    return (
      <TouchableOpacity
      onPress={()=>{navigation.navigate('ExploreCategory',{
        itemId: item._id,
        itemName: item.name,
      })}}>
      <View style={styles.popular_card}>
        <View style={styles.image_background}>
          <Image
            resizeMode="contain"
            style={{height: 23, width: 23}}
            source={{uri: `${item.icons}`}}
          />
        </View>
        <CommonText style={{fontSize: 14, fontFamily: 'Poppins-Medium'}}>
          {item.name}
        </CommonText>
      </View>
      </TouchableOpacity>
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchPopularCategory();
    }, []),
  );
  const fetchPopularCategory = async () => {
    //  dispatch(setLoading(true));
    const n = `http://43.205.55.71:3000/api/job/get-popular-jobs`;
    try {
      const token = HeaderToken;

      const response = await axios.get(n, {
        headers: {
          Authorization: token,
        },
      });
      // let x = [0];

      // console.log(x,"asdfghj=====")
      setcategory(response?.data?.data);
      //  dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, padding: 13, backgroundColor: Colors.white}}>
      <HeaderComp
        img={require('../../../assets/Images/arrowback.png')}
        txt="Popular Category"
       
        style={{ marginTop: 1,paddingHorizontal:0 }}
      />
      <FlatList
        data={category}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default PopularCategory;

const styles = StyleSheet.create({
  popular_card: {
    flexDirection: 'row',
    height: 43,
    marginVertical: '2%',
    alignItems: 'center',
  },
  image_background: {
    backgroundColor: '#6377631A',
    height: 43,
    width: 43,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%',
  },
});
