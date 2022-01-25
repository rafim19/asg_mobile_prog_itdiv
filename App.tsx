import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import AppNavigation from './src/naviagtion';

const App = () => {
  return (
    <SafeAreaView style={styles.base}>
      <AppNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    flex: 1
  }
});

export default App;
