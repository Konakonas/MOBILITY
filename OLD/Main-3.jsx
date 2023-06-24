import React, { useRef, useState } from 'react';
import { View, Text, Image, Button, StyleSheet,ImageBackground, AppRegistry, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-expo";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import ScrollView from 'react-native-gesture-handler';

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
      contrast), c.a);
  }`,
  },
});

const Saturate = ({
  contrast,
  saturation,
  brightness,
  children,
}) => (
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
        //   onSlidingComplete={(value) => setContrast(value)}
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
      <Text style={{ textAlign: "center" }}>Saturation {saturation}</Text>
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
      />
    </View>
  );
};

const Main = () => {

  const [image, setImage] = useState(null);

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


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Editor</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Choose Photo" onPress={pickImage} />
      
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
  darkness: {
    backgroundColor: 'rgba(255,0,0,0.5)',
    width: '100%',
    height: 200,
  },
});

// AppRegistry.registerComponent('Main', () => Main);

// class Home extends React.Component {
const Home = () => {
  const [image, setImage] = useState(null);
  // state = {
  //   contrast: 1,
  //   saturation: 1,
  //   brightness: 1,
  // };
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);

  // setSaturation = (value) => {
  //   this.setState({
  //     saturation: value,
  //   });
  // };
  // setBrightness = (value) => {
  //   this.setState({
  //     brightness: value,
  //   });
  // };

  pickImage = async () => {
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

  // const { imageUrl } = this.props.route.params;

  // const { saturation, brightness, contrast } = this.state;
  // const { setBrightness, setContrast, setSaturation } = this;
  return (
    <View style={styles.container}>
        <ScrollView>
          <View>
            <Surface
              ref={(ref) => (this.surfaceRef = ref)}
              style={{ width: Dimensions.get("screen").width, height: 500 }}
            >
              <Saturate
                {...{
                  contrast: contrast,
                  saturation: saturation,
                  brightness: brightness,
                }}
              >
                {{
                  uri: image,
                }}
              </Saturate>
            </Surface>
          </View>
          <Sliders
            {...{
              saturation,
              setSaturation,
              contrast,
              setContrast,
              brightness,
              setBrightness,
            }}
          />
          <View >
            {/* <Button    onPress={_downloadImage} title="Download" /> */}
            <Button title="Choose Photo" onPress={pickImage} />
          </View>
        </ScrollView>
        </View>
    );
}

export default Home;

// export default Main;


// interface SaturationProps {
//   contrast: number;
//   brightness: number;
//   saturation: number;
//   children: React.ReactNode;
// }
// export const Saturate = ({
//   contrast,
//   saturation,
//   brightness,
//   children,
// }: SaturationProps) => (
//   <Node
//     shader={shaders.Saturate}
//     uniforms={{ contrast, saturation, brightness, t: children }}
//   />
// );

// interface SlidersProps {
//   contrast: number;
//   setContrast: (value: number) => void;
//   brightness: number;
//   setBrightness: (value: number) => void;
//   saturation: number;
//   setSaturation: (value: number) => void;
// }
// const Sliders = ({
//   contrast,
//   setContrast,
//   brightness,
//   setBrightness,
//   saturation,
//   setSaturation,
// }: SlidersProps) => {
//   return (
//     <View style={{ marginTop: 10 }}>
//       <Text style={{ textAlign: "center" }}>Contrast {contrast}</Text>
//       <Slider
//         style={{
//           width: 300,
//           height: 40,
//           marginHorizontal: 40,
//           marginVertical: 10,
//         }}
//         minimumValue={1}
//         step={1}
//         value={contrast}
//         maximumValue={10}
//         onValueChange={(value) => setContrast(value)}
//         //   onSlidingComplete={(value) => setContrast(value)}
//         minimumTrackTintColor="#FFFFFF"
//         maximumTrackTintColor="#000000"
//       />
//       <Text style={{ textAlign: "center" }}>Brightness {brightness}</Text>
//       <Slider
//         style={{
//           width: 300,
//           height: 40,
//           marginHorizontal: 40,
//           marginVertical: 10,
//         }}
//         step={1}
//         minimumValue={1}
//         value={brightness}
//         maximumValue={10}
//         onValueChange={(value) => setBrightness(value)}
//         minimumTrackTintColor="#FFFFFF"
//         maximumTrackTintColor="#000000"
//       />
//       <Text style={{ textAlign: "center" }}>Saturation {saturation}</Text>
//       <Slider
//         style={{
//           width: 300,
//           height: 40,
//           marginHorizontal: 40,
//           marginVertical: 10,
//         }}
//         minimumValue={1}
//         step={1}
//         value={saturation}
//         maximumValue={10}
//         onValueChange={(value) => setSaturation(value)}
//         minimumTrackTintColor="#FFFFFF"
//         maximumTrackTintColor="#000000"
//       />
//     </View>
//   );
// };

// class Home extends React.Component {
//   state = {
//     contrast: 1,
//     saturation: 1,
//     brightness: 1,
//   };
//   setContrast = (value: number) => {
//     this.setState({
//       contrast: value,
//     });
//   };

//   setSaturation = (value: number) => {
//     this.setState({
//       saturation: value,
//     });
//   };
//   setBrightness = (value: number) => {
//     this.setState({
//       brightness: value,
//     });
//   };

//   _downloadImage = async () => {
//     const result = await this.surfaceRef.glView.capture();
//     const asset = await MediaLibrary.createAssetAsync(result.uri);
//     await MediaLibrary.createAlbumAsync("Experiment", asset);
//     ToastAndroid.showWithGravity('Image Saved to the storage', ToastAndroid.SHORT, ToastAndroid.CENTER)
//   };
//   render() {
//     const { imageUrl } = this.props.route.params;

//     const { saturation, brightness, contrast } = this.state;
//     const { setBrightness, setContrast, setSaturation, _downloadImage } = this;
//     return (
//       <>
//         <ScrollView>
//           <View>
//             <Surface
//               ref={(ref) => (this.surfaceRef = ref)}
//               style={{ width: Dimensions.get("screen").width, height: 500 }}
//             >
//               <Saturate
//                 {...{
//                   contrast: contrast,
//                   saturation: saturation,
//                   brightness: brightness,
//                 }}
//               >
//                 {{
//                   uri: imageUrl,
//                 }}
//               </Saturate>
//             </Surface>
//           </View>
//           <Sliders
//             {...{
//               saturation,
//               setSaturation,
//               contrast,
//               setContrast,
//               brightness,
//               setBrightness,
//             }}
//           />
//           <View >
//             <Button    onPress={_downloadImage} title="Download" />
//           </View>
//         </ScrollView>
//       </>
//     );
//   }
// }

// export default Home;
