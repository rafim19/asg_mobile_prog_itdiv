import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from './src/naviagtion';
import { persistor, store } from './src/store';

const App = () => {
  return (
      <SafeAreaView style={styles.base}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppNavigation />
          </PersistGate>
        </Provider>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    display: 'flex',
    flex: 1,
  }
});

export default App;
