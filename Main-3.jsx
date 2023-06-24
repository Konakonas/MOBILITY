import React, { useRef, useState } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import {
  View,
  Text,
  Dimensions,
  Button,
  Alert,
  ToastAndroid,
} from "react-native";
import { Surface } from "gl-react-expo";
import Slider from "@react-native-community/slider";
import { ScrollView, GestureHandlerRootView,
  NativeViewGestureHandler, } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D t;
      uniform float contrast, saturation, brightness;
      const vec3 L = vec3(0.2125, 0.7154, 0.0721);
      void main() {
        vec4 c = texture2D(t, uv);
        vec3 brt = c.rgb * brightness;
        gl_FragColor = vec4(mix(
          vec3(0.5),
          mix(vec3(dot(brt, L)), brt, saturation),
          contrast
        ), c.a);
      }
    `,
  },
});

export const Saturate = ({ contrast, saturation, brightness, children }) => (
  <Node
    shader={shaders.Saturate}
    uniforms={{ contrast, saturation, brightness, t: children }}
  />
);

const Sliders = ({
  contrast,
  setContrast,
  brightness,
  setBrightness,
  saturation,
  setSaturation,
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ textAlign: "center" }}>Contrast {contrast}</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          marginHorizontal: 40,
          marginVertical: 10,
        }}
        minimumValue={1}
        step={1}
        value={contrast}
        maximumValue={10}
        onValueChange={(value) => setContrast(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text style={{ textAlign: "center" }}>Brightness {brightness}</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          marginHorizontal: 40,
          marginVertical: 10,
        }}
        step={1}
        minimumValue={1}
        value={brightness}
        maximumValue={10}
        onValueChange={(value) => setBrightness(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      {/* <Text style={{ textAlign: "center" }}>Saturation {saturation}</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          marginHorizontal: 40,
          marginVertical: 10,
        }}
        minimumValue={1}
        step={1}
        value={saturation}
        maximumValue={10}
        onValueChange={(value) => setSaturation(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      /> */}
    </View>
  );
};

const Home = ({ route }) => {
  const surfaceRef = useRef(null);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [imageUrl, setImage] = useState(null);

  const _downloadImage = async () => {
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView>
        <View>
           <View>
            <Surface
              ref={surfaceRef}
              style={{ width: Dimensions.get("screen").width, height: 500 }}
            >
              <Saturate
                contrast={contrast}
                saturation={saturation}
                brightness={brightness}
              >
                {{ uri: imageUrl }}
              </Saturate>
            </Surface>
          </View>
          <Sliders
            contrast={contrast}
            setContrast={setContrast}
            brightness={brightness}
            setBrightness={setBrightness}
            saturation={saturation}
            setSaturation={setSaturation}
          />
        </View> 
        <View>
          <Button title="Choose Photo" onPress={_downloadImage} />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
