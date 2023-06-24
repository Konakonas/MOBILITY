import React, { useState } from 'react';
import { View, Text, Slider } from 'react-native';

const CustomFilterOptions = ({ imgRef }) => {
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [gray, setGray] = useState(0);

  const handleSliderChange = (value, setter) => {
    setter(value);
    setCustomFilterClass();
  };

  const setCustomFilterClass = () => {
    const style = {
      contrast: contrast / 100,
      brightness: brightness / 100,
      saturate: saturate / 100,
      sepia: sepia / 100,
      grayscale: gray / 100,
    };

    // Apply the style to your image reference (imgRef) here
  };

  return (
    <View>
      <View>
        <Text>Contrast</Text>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={200}
          value={contrast}
          onValueChange={(value) => handleSliderChange(value, setContrast)}
        />
      </View>
      <View>
        <Text>Brightness</Text>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={200}
          value={brightness}
          onValueChange={(value) => handleSliderChange(value, setBrightness)}
        />
      </View>
      <View>
        <Text>Saturation</Text>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={200}
          value={saturate}
          onValueChange={(value) => handleSliderChange(value, setSaturate)}
        />
      </View>
      <View>
        <Text>Sepia</Text>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={100}
          value={sepia}
          onValueChange={(value) => handleSliderChange(value, setSepia)}
        />
      </View>
      <View>
        <Text>Gray Scale</Text>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={100}
          value={gray}
          onValueChange={(value) => handleSliderChange(value, setGray)}
        />
      </View>
    </View>
  );
};

export default CustomFilterOptions;
