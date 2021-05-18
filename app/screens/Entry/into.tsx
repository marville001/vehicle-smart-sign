import Slider from "@react-native-community/slider";
import { Camera } from "expo-camera";
import React, { useEffect, useReducer, useRef, useState } from "react";
import {  StatusBar, Text, View } from "react-native";
import IconButton from "../../components/IconButton";
import { withNavigationFocus } from "react-navigation";
import { useIsFocused } from '@react-navigation/native';


const initialState = {
  whbalance: "auto",
  cameraType: "back",
  flash: "off",
  zoomValue: 0,
};

function reducer(state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case "@type/WH_BALANCE":
      return { ...state, whbalance: action.payload };
    case "@type/CAMERA_BACK":
      return { ...state, cameraType: action.payload };
    case "@type/CAMERA_FRONT":
      return { ...state, cameraType: action.payload };
    case "@type/FLASH":
      return { ...state, flash: action.payload };
    case "@type/ZOOM":
      return {
        ...state,
        zoomValue: action.payload,
      };
    default:
      return { ...state };
  }
}

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [url, setUrl] = useState("");

  const isFocused = useIsFocused();

  const action = "Entry";
  // Use Reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cameraType, whbalance, flash, zoomValue } = state;

  const cam = useRef<Camera | null>();

  const _takePicture = async () => {
    if (cam.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      let photo = await cam.current.takePictureAsync(options);

      //console.log(cam.current.getSupportedRatiosAsync());

      const source = photo.uri;
      setUrl(source);
      setConfirm(true);
      console.log("Photo source: ", source);

      cam.current.pausePreview();
      // await handleSave(source);
      // cam.current.resumePreview();
    }
  };

  const _handleCameraToggle = () => {
    if (cameraType === "back") {
      dispatch({
        type: "@type/CAMERA_FRONT",
        payload: "front",
      });
    } else {
      dispatch({
        type: "@type/CAMERA_BACK",
        payload: "back",
      });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const _toggleFlash = () => {
    if (flash === "off") {
      dispatch({
        type: "@type/FLASH",
        payload: "on",
      });
    } else {
      dispatch({
        type: "@type/FLASH",
        payload: "off",
      });
    }
  };

  const _zoomEffect = (value: number) => {
    dispatch({
      type: "@type/ZOOM",
      payload: value,
    });
  };

  const _confirm = () => {
    if (cam.current) {
      cam.current.resumePreview();
    }

    navigation.navigate("Confirm", { photoUrl: url });
    setConfirm(false);
  };

  //console.log(cam.current);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      {isFocused && (
        <Camera
          zoom={zoomValue}
          flashMode={flash}
          ref={cam}
          style={{ flex: 1 }}
          type={cameraType}
        >
          {/* Action Text */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 40, opacity: 0.6 }}>
              {action}
            </Text>
          </View>

          {/* Slider */}
          <View
            style={{
              transform: [{ rotate: "-90deg" }],
              flex: 0.6,
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <Slider
              onValueChange={_zoomEffect}
              style={{
                width: 300,
                height: 80,
              }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          </View>

          {/* Buttons */}
          <View
            style={{
              position: "absolute",
              bottom: 40,
              left: 20,
              right: 20,
              paddingHorizontal: 30,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              icon="refresh-cw"
              size={28}
              onPress={_handleCameraToggle}
            />
            {confirm ? (
              <IconButton icon="check" size={50} onPress={_confirm} />
            ) : (
              <IconButton icon="camera" size={50} onPress={_takePicture} />
            )}
            <IconButton
              icon={flash === "on" ? "zap" : "zap-off"}
              size={30}
              onPress={_toggleFlash}
            />
          </View>
        </Camera>
      )}
    </View>
  );
};

export default withNavigationFocus(CameraScreen);