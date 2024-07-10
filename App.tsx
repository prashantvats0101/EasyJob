
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './sourceCode/navigation/StackNavigation';
import {Provider} from 'react-redux';
import Store, {persistor} from './sourceCode/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging'




const App = () => {
  useEffect(()=>{
    getdeviceToken()
    },[])

const getdeviceToken =async ()=>{
  let token = await messaging().getToken()
  console.log(token,"========Tokennn====>")
}


  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};

export default App;
