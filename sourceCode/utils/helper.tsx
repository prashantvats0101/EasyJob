import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setItemDetail} from '../Redux/reducer';
import React, { useRef, useState,useEffect } from 'react';
import Toast from 'react-native-toast-message';
export const onclickHandler = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const fun=(value, type)=>{
    if (type === 'Edit') {
        navigation.navigate('UpdateJob');
        dispatch(setItemDetail(value));
      } else if (type === 'Detail') {
        navigation.navigate('JobdeteilPost');
        dispatch(setItemDetail(value));
      }
      // else if(type === 'Delete'){
      //   dispatch(setItemDetail(value));
      //     setModalOpen(true);
      // }
  }
  

  return {fun}
};

export const Show_Toast = (type: string, title: string, msg = '') => {
  if (!['success', 'error', 'info'].includes(type)) {
    throw Error('Invalid Toastr type = ' + type);
  } else {
    // console.log('show toastr');
    Toast.show({
      // topOffset: 100,
      type: type,
      text1: title,
      text2: msg,
      position: 'top',
      visibilityTime:1700,
      text1Style:{height:'auto'},
      text2Style:{height:'auto',width:'100%',padding:5},
      props:{
        text2NumberOfLines:0,
        contentContainerStyle:{height:'auto'}
        
      },
      onPress:Toast.hide,
      
      
   
    },);
   
  }
};