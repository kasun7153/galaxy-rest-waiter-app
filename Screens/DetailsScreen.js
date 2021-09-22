import React, { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SecondaryButton } from "../components/Button";
import COLORS from "../src/consts/colors";
import foods from "../src/consts/Foods";
import Toast from "react-native-toast-message";
import HeaderCartIcon from "../shared/headerCartIcon";
import { addToCart } from "../redux/cart/cartActions";

//navigation-> allows to navigate between screen
const DetailsScreen = ({ navigation, route }) => {
  //To hold food details passed by the home screen
  const item = route.params;
  console.log(item);
  const addThisToCart = () => {
    dispatch(addToCart({ ...item, qty }));
    setQuantity(1);
    Toast.show({
      topOffset: 10,
      visibilityTime: 2000,
      position: "top",
      type: "success",
      text1: "Successfully added to the cart",
    });
  };
  const [quantity, setQuantity] = React.useState(1);

  const incQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "black", fontWeight: "700", fontSize: 20 }}>
            {route.params.item.name || "Loading"}
          </Text>
        </View>
      ),
      headerRight: () => <HeaderCartIcon navigation={navigation} />,
    });
  }, [navigation]);
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
        {/* <HeaderCartIcon navigation={navigation} /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image source={item.image} style={{ height: 220, width: 220 }} />
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 25, color: COLORS.white, fontWeight: "bold" }}
            >
              {item.name}
            </Text>
            <View style={{ marginRight: 20, alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: COLORS.white,
                }}
              >
                {quantity}
              </Text>
              <View style={styles.actionBtn}>
                <Icon
                  name="remove"
                  size={25}
                  color={COLORS.primary}
                  onPress={decQuantity}
                ></Icon>
                <Icon
                  name="add"
                  size={25}
                  color={COLORS.primary}
                  onPress={incQuantity}
                ></Icon>
              </View>
            </View>
          </View>
          <Text style={styles.detailsText}>{item.description}</Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton
              title={"Add to Cart"}
              // onPress={() => navigation.navigate("Cart", foods)}
              onPress={addThisToCart}
              disabled={quantity > 0 ? false : true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 220,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default DetailsScreen;
