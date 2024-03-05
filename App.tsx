import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <SafeAreaProvider>
            <SafeAreaView style={appStyles.container}>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
            </SafeAreaView>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const appStyles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
