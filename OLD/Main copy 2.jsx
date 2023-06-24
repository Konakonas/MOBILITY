import React, { useState } from 'react';
import { View, Text, Image, Slider, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import rgbHex from 'rgb-hex';


const Main = () => {
  const [image, setImage] = useState(null);
  const [contrast, setContrast] = useState(1);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const applyFilters = async () => {
    console.log(image);
    if (image) {
      console.log('HUI')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Editor</Text>

      <Button title="Choose Photo" onPress={pickImage} />

      {image && (
        <View>
          <Image source={{ uri: image }} style={styles.image} />

          <Text style={styles.sliderLabel}>Contrast: {contrast.toFixed(2)}</Text>
          <Slider
            style={styles.slider}
            value={contrast}
            minimumValue={0}
            maximumValue={2}
            step={0.1}
            onValueChange={value => setContrast(value)}
          />

          <Text style={styles.sliderLabel}>Red: {red.toFixed(2)}</Text>
          <Slider
            style={styles.slider}
            value={red}
            minimumValue={-1}
            maximumValue={1}
            step={0.1}
            onValueChange={value => setRed(value)}
          />

          <Text style={styles.sliderLabel}>Green: {green.toFixed(2)}</Text>
          <Slider
            style={styles.slider}
            value={green}
            minimumValue={-1}
            maximumValue={1}
            step={0.1}
            onValueChange={value => setGreen(value)}
          />

          <Text style={styles.sliderLabel}>Blue: {blue.toFixed(2)}</Text>
          <Slider
            style={styles.slider}
            value={blue}
            minimumValue={-1}
            maximumValue={1}
            step={0.1}
            onValueChange={value => setBlue(value)}
          />

          <Button title="Apply Filters" onPress={applyFilters} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    tintColor: undefined,
    opacity: 0.5,
  },
  slider: {
    width: 200,
    marginBottom: 10,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Main;
