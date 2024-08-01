/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ActivityIndicator, Modal} from 'react-native';
import React from 'react';
import {Colors} from '../../../constant';
import { useTranslation } from 'react-i18next';
import '../../../components/i18n';

const Loaderr = () => {
  const { t } = useTranslation();
  return (
   
      <Modal transparent >
       <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center',flex:1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            height: 150,
            width: 150,
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <ActivityIndicator
            size="large"
            style={{alignSelf: 'center'}}
            color={Colors.Bluebg}
          />
          <View
            style={{
              width: 100,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{fontSize: 17, fontWeight: 'bold', color: Colors.white}}>
              {t('Loading...')}
            </Text>
          </View>
        </View>
        </View>
      </Modal>
     
  );
};

export default Loaderr;

const styles = StyleSheet.create({});
