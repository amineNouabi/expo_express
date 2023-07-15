/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Icon name="rocket" size={100} color="#900" />
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
// });

export default App;
