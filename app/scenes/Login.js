import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Loading from "../components/Loading";
import AuthContext from "../navigation/AuthProvider";
import { colors } from "../constants/theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { handleLogin, isLoading, loginError } = useContext(AuthContext);

  const handleSubmit = () => {
    validateInputs();
    if (isValid) {
      handleLogin(email, password);
    }
  };

  const unsetError = () => {
    setTimeout(() => {
      setError("");
    }, 1000);
  };

  const validateInputs = () => {
    if (email == "" || password == "") {
      setIsValid(false);
      setError("All fields are required!");
      unsetError();
    } else if (password.length < 8) {
      setIsValid(false);
      setError("Passoword have a minimum of 8 chars!");
      unsetError();
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setIsValid(false);
      setError("Invalid email!");
      unsetError();
    } else {
      unsetError();
      setIsValid(true);
    }
  };

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>SmartSign</Text>
        {error !== null && (
          <View style={{ padding: 10 }}>
            <Text style={{ color: "red" }}>{error}</Text>
          </View>
        )}

        {loginError !== null && (
          <View style={{ padding: 10 }}>
            <Text style={{ color: "red" }}>{loginError}</Text>
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
            keyboardType={"email-address"}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(pass) => setPassword(pass)}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoading ? true : false}
          onPress={handleSubmit}
          style={styles.loginBtn}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: colors.accent,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: colors.secondaryLight,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: colors.accent,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default Login;
