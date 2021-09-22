import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import {
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = StyleSheet.create({
    headerLogo: {
      marginTop: 30,
      height: 100,
      width: 100,
      borderRadius: 55,
      position: "absolute",
    },
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    logo: {
      alignItems: "center",
    },
  });

  return (
    <>
      <View style={styles.container}>
        {/* <KeyboardAvoidingView behavior="position" backgroundColor='white'> */}
        <StatusBar backgroundColor="#03498f" barStyle="light-content" />

        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            marginTop: 30,
            color: "#08b8e1",
            // fontFamily: "nunito-bold",
          }}
        >
          Welcome to
        </Text>
        <View>
          <View style={styles.logo}>
            <Image
              style={styles.headerLogo}
              source={require("../assets/logo.png")}
            />
          </View>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              style={{
                marginTop: 150,
                alignSelf: "center",
                height: 30,
                width: "60%",
                fontFamily: "nunito-bold",
              }}
              theme={{ colors: { primary: "#08b8e1" } }}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              style={{
                marginTop: 18,
                alignSelf: "center",
                height: 30,
                width: "60%",
                // fontFamily: "nunito-bold",
              }}
              theme={{ colors: { primary: "#08b8e1" } }}
            />
          </View>
        </TouchableWithoutFeedback>
        <Button
          mode="contained"
          style={{
            marginTop: 38,
            alignSelf: "center",
            height: 30,
            width: "60%",
            backgroundColor: "#08b8e1",
          }}
          //   onPress={() => sendCred(props)}

          onPress={() => props.navigation.navigate("Home")}
        />

        <Text
          style={{
            fontSize: 13,
            //   fontFamily: "nunito-bold",
            color: "#03498f",
          }}
        >
          {/* Login */}
        </Text>
        {/* </Button> */}
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              marginTop: 20,
              //   fontFamily: "nunito-bold",
              color: "#03498f",
              alignSelf: "center",
            }}
            // onPress={() => props.navigation.replace("signup")}
          >
            Forgot password ?
          </Text>
        </TouchableOpacity>

        {/* </KeyboardAvoidingView> */}
      </View>
    </>
  );
};

export default LoginScreen;
