import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import AppNavigation from './src/naviagtion';
import { store } from './src/store';

const App = () => {
  return (
      <SafeAreaView style={styles.base}>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
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
