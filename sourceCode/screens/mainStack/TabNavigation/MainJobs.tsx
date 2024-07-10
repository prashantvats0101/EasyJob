import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constant';
import HeaderComp from '../../../components/HeaderComp';
import {CommonText} from '../../../components';
import SavedJob from './SavedJob';
import AppliedJob from './AppliedJob';

const MainJobs = () => {
  const [savedJob, setsavedJob] = useState('Saved');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.whitetxt}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.whitetxt} />
      <HeaderComp style={{marginTop: 40}} txt="Jobs" />
      <View style={styles.buttonsView}>
        <TouchableOpacity
          style={[
            styles.SavedjobView,
            savedJob === 'Applied' && styles.AppliedJobView1,
          ]}
          onPress={() => setsavedJob('Saved')}>
          <CommonText
            style={
              savedJob === 'Saved' ? styles.selectedText : styles.defaultText
            }>
            Saved Job
          </CommonText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.AppliedJobView,
            savedJob === 'Applied' && styles.SavedjobView1,
          ]}
          onPress={() => setsavedJob('Applied')}>
          <CommonText
            style={
              savedJob === 'Applied' ? styles.selectedText : styles.defaultText
            }>
            Applied Job
          </CommonText>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {savedJob === 'Saved' && <SavedJob />}
        {savedJob === 'Applied' && <AppliedJob />}
        {/* {savedJob === 'Saved' && <NoSavedJob />}
                {savedJob === 'Applied' && <NodataFound />} */}
      </View>
    </SafeAreaView>
  );
};

export default MainJobs;

const styles = StyleSheet.create({
  buttonsView: {
    height: 56,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  SavedjobView: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Bluebg,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  SavedjobView1: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Bluebg,
  },
  AppliedJobView: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  AppliedJobView1: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
  },
  selectedText: {color: 'white'},
  defaultText: {},
});
