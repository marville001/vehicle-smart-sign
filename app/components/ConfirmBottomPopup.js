import React, { Component, useState } from "react";
import { Modal, View, Text, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

const deviceHeight = Dimensions.get("window").height;
export default class ConfirmBottomPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  show = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  renderOutsideTouchable(onTouch) {
    const view = (
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor:"green"
        }}
      />
    );
    if (!onTouch) return view;
    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "red",
        }}
      >
        {view}
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { open } = this.state;
    const { onTouchOutside } = this.props;

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={open}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000AA",
            justifyContent: "flex-end",
          }}
        >
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              width: "100%",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingHorizontal: 10,
              maxHeight: deviceHeight * 0.4,
              minHeight: deviceHeight * 0.3,
            }}
          >
            <View>
              <Text
                style={{
                  color: "red",
                  fontSize: 20,
                }}
              >
                <ActivityIndicator size={40}/>
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
