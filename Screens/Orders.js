import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, Modal, Dimensions } from "react-native";
import Header from "../Header/Header";
import COLORS from "../src/consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import OrderForm from "./OrderForm";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

export default function Orders({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderItems, setorderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const ListofOrders = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    // fetch("http://10.0.2.2:5000/order")
    fetch(`https://galaxy-rest-be.herokuapp.com/order`)

      .then((res) => res.json())
      .then((results) => {
        setorderItems(results);
        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };
  useEffect(() => {
    ListofOrders();
  }, []);
  const OrderCard = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("OrderDetails", item)}
      >
        <View style={styles.orderCard}>
          <Modal visible={modalVisible} animationType="fade">
            <View style={styles.modalContent}></View>
            <Icon
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalVisible(false)}
            ></Icon>
            <OrderForm />
          </Modal>
          <View style={styles.tableNumCon}>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: COLORS.white }}
            >
              {/* {item.table} */}
              {item.tableNumber}
            </Text>
          </View>
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 10,
              flex: 1,
            }}
          ></View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.state}
            </Text>
          </View>
          <View style={{ marginRight: 20, alignItems: "center" }}></View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Order Details"
        navigation={navigation}
        style={styles.header}
      />

      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          // data={OrdersList}
          numColumns={2}
          data={orderItems}
          renderItem={({ item }) => <OrderCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          keyExtractor={(item, _id) => _id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1, //to center the content
  },
  content: {
    backgroundColor: COLORS.light,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  orderCard: {
    height: 90,
    borderRadius: 10,
    elevation: 15,
    width: 160,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    flex: 1,
    // paddingBottom: 0,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 500,
    height: 500,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  tableNumCon: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
});
