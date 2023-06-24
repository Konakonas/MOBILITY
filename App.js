import React, { useEffect } from 'react';
import { AppRegistry, BackHandler, Alert, Button, View, StyleSheet } from 'react-native';
import Home from './Main-2';
// import PictureEditor from './Editor'

const App = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Home />
      
      <Button
        onPress={() => BackHandler.exitApp()}
        title="Выход"
        accessibilityLabel="Learn more about this Simple Button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('awesomeproject', () => App); // Замените 'MyApp' на имя вашего приложения

export default App;
