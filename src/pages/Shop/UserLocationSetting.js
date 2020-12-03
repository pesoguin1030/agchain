//EcommerceHome->ProducerScreen->OrderLocationSetting(賣家設定給買家自己可以運送的地址)
import React, { useState, useEffect } from "react";
import storage from "../../utils/storage";
import { Image, View, Dimensions, Alert } from "react-native";
import axios from "axios";
import {
  Layout,
  Text,
  withStyles,
  List,
  ListItem,
  Button,
  Input,
  Select,
} from "@ui-kitten/components";
import Constants from "../../api/constants";
import MapView, {
  AnimatedRegion,
  Animated,
  Marker,
  Callout,
  Polyline,
} from "react-native-maps";

function UserLocationSetting(props) {
  const { navigation, theme } = props;
  const [destinations, setDestinations] = useState([]);
  const [address, setAddress] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 24.8527315,
    longitude: 121.0842217,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  });
  const [county, setCounty] = useState([
    { text: "基隆市" },
    { text: "台北市" },
    { text: "新北市" },
    { text: "桃園市" },
    { text: "新竹市" },
    { text: "新竹縣" },
    { text: "苗栗縣" },
    { text: "台中市" },
    { text: "彰化縣" },
    { text: "南投縣" },
    { text: "雲林縣" },
    { text: "嘉義市" },
    { text: "嘉義縣" },
    { text: "台南市" },
    { text: "高雄市" },
    { text: "屏東縣" },
    { text: "台東縣" },
    { text: "花蓮縣" },
    { text: "宜蘭縣" },
    { text: "澎湖縣" },
    { text: "金門縣" },
    { text: "連江縣" },
  ]);
  useEffect(() => {
    getDestinations();
  }, []);

  function handleSelect(inputPlace) {
    setAddress(inputPlace.address);
    setSelectedLocation(inputPlace);
    setCoordinates({
      latitude: inputPlace.latitude,
      longitude: inputPlace.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.01,
    });
  }

  async function getDestinations() {
    const userToken = storage.getAccessToken();
    try {
      const response = await axios.get(`${Constants.SERVER_URL}/destination/`, {
        params: {
          user: "self",
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const {
        data: { items },
      } = response;
      console.log(items);
      if (items && items.length > 0) {
        var temp = [];
        for (var i = 0; i < items.length; i++) {
          if (!items[i].farm_id) {
            temp.push(items[i]);
          }
        }
        setDestinations(
          temp.map((el) => ({
            ...el,
            text: el.address,
          }))
        );
      }
    } catch (error) {
      alert("無法取得目的地，請稍後再試");
      console.log(error);
      return false;
    }
  }

  async function createDestination() {
    try {
      const userToken = storage.getAccessToken();
      await axios.post(
        `${Constants.SERVER_URL}/destination/`,
        {
          address: selectedCounty.text + address,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Cache-Control": "no-cache, no-store",
          },
        }
      );
      setAddress("");
      Alert.alert(
        "通知",
        "已為您新增地址，請重新整理頁面",
        [{ text: "確認" }],
        {
          cancelable: false,
        }
      );
      return true;
    } catch (err) {
      alert("伺服器發生問題，請稍後再試");
      console.log(err);
      return false;
    }
  }
  function handleAddAddress() {
    if (selectedCounty == "") {
      alert("您未選擇縣市");
      return;
    }
    if (address == "") {
      alert("未輸入目的地名稱");
      return;
    }
    if (!createDestination()) {
      return;
    }
    console.log("新增地址完成");
    if (!getDestinations()) {
      return;
    }
  }

  async function deleteDestination() {
    try {
      if (selectedLocation == null) {
        alert("未選擇目的地");
        return false;
      }
      await axios.put(
        `${Constants.SERVER_URL}/destination/`,
        {
          address: selectedLocation.address,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        {
          headers: {
            "Cache-Control": "no-cache, no-store",
          },
        }
      );
      setAddress("");
      Alert.alert(
        "通知",
        "已為您刪除地址，請重新整理頁面",
        [{ text: "確認" }],
        {
          cancelable: false,
        }
      );
      return true;
    } catch (err) {
      alert("伺服器發生問題，請稍後再試");
      console.log(err);
      return false;
    }
  }

  function handleDeleteAddress() {
    //without any money dealing & deliver fee
    if (!deleteDestination()) {
      return;
    }
    if (!getDestinations()) {
      return;
    }
  }

  function handlePress(location) {
    setCoordinates({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  }

  return (
    <Layout style={{ padding: 16, flex: 6 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
        <Text>自訂目的地清單：</Text>
        <Select
          style={{ flex: 1 }}
          placeholder="請選擇目的地"
          data={destinations}
          selectedOption={selectedLocation}
          disabled={destinations.length === 0}
          onSelect={(selectedOption) => handleSelect(selectedOption)}
        />
      </View>
      <Select
        style={{ marginTop: 16 }}
        placeholder="請選擇縣市"
        selectedOption={selectedCounty}
        data={county.map((el) => ({ ...el }))}
        onSelect={(SelectOption) => setSelectedCounty(SelectOption)}
      />
      <View style={{ flex: 2 }}>
        <Input
          textStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
          value={address}
          placeholder="請輸入地址"
          onChangeText={(value) => setAddress(value)}
        />
        <View style={{ padding: 3 }}>
          <Button status="basic" onPress={handleAddAddress}>
            增加目的地
          </Button>
        </View>
        <View style={{ padding: 3 }}>
          <Button status="basic" onPress={handleDeleteAddress}>
            刪除目的地
          </Button>
        </View>
      </View>
    </Layout>
  );
}

export default UserLocationSetting = withStyles(
  UserLocationSetting,
  (theme) => ({})
);
