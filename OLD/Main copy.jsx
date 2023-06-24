import React, { useState } from 'react';
import { View, Button, Image, Slider } from 'react-native';
import { ImageFilter } from 'react-native-gl-image-filters';

const PictureEditor = () => {
  const [imageUri, setImageUri] = useState('');
  const [contrast, setContrast] = useState(1);
  const [colorOverlay, setColorOverlay] = useState('#FFFFFF');

  const applyFilters = () => {
    return (
      <View style={styles.container}>
        <Button title="Select Image" onPress={selectImage} />

        {imageUri && (
          <ImageFilter
            style={styles.image}
            image={imageUri}
            filters={[
              {
                name: 'contrast',
                value: contrast,
              },
              {
                name: 'colorOverlay',
                value: colorOverlay,
              },
            ]}
          />
        )}

        <Slider
          style={styles.slider}
          value={contrast}
          minimumValue={0}
          maximumValue={2}
          step={0.1}
          onValueChange={setContrast}
        />

        <Slider
          style={styles.slider}
          value={colorOverlay}
          minimumValue="#000000"
          maximumValue="#FFFFFF"
          step="#000001"
          onValueChange={setColorOverlay}
        />

        <Button title="Apply Changes" onPress={applyFilters} />
      </View>
    );
  };

  const selectImage = async () => {
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

  return <PictureEditor />;
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    marginBottom: 10,
  },
};

export default PictureEditor;
