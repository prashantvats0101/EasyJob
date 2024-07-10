import React from 'react';
import { View, Text } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewScreen = ({ route }) => {
  const { uri } = route.params;

  console.log(uri);

  if (!uri) {
    return (
      <View>
        <Text>Error: No PDF source provided!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={{ uri }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PdfViewScreen;
