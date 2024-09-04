import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import Slider from "@react-native-community/slider";
import axios from "axios";

export default function Index() {
   const [ipAddress, setIPAddress] = useState<string>("");

   const [ballPosition, setBallPosition] = useState<number>(0);

   const [kp, setKp] = useState<number>(0);
   const [ki, setKi] = useState<number>(0);
   const [kd, setKd] = useState<number>(0);

   const bgColor = "#dbdbdb";
   const lightGray = "#666666";
   const black = "#000000";
   const white = "#ffffff";
   const lightPurple = "#b882ff";

   const handlePositionChange = (positionValue: number) => {
      console.log("Position Change");
      const url = `http://${ipAddress}/setpoint?value=${positionValue}`;
      console.log(url);
      if (ipAddress) {
         axios
            .get(url)
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
      }
   };

   const handlePIDChange = () => {
      console.log("PID Change");
      const url = `http://${ipAddress}/pid`;
      console.log(url)
      if (ipAddress) {
         axios
            .get(url, {
               params: {
                  kp,
                  ki,
                  kd,
               },
            })
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
      }
   };

   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: bgColor,
            padding: 16,
         }}
      >
         <TextInput
            label="IP Address"
            value={ipAddress}
            onChangeText={(text) => setIPAddress(text)}
            mode="outlined"
            style={{ width: "100%", backgroundColor: white }}
            textColor={black}
            outlineColor={lightGray}
            activeOutlineColor={black}
         />
         <View
            style={{
               width: "100%",
            }}
         >
            <View
               style={{
                  width: "100%",
               }}
            >
               <Text style={{ color: black, marginTop: 16 }}>
                  Ball Position
               </Text>
               <View
                  style={{
                     flex: 1,
                     flexDirection: "row",
                     alignItems: "center",
                  }}
               >
                  <Slider
                     style={{ height: 40, flex: 1 }}
                     minimumValue={1}
                     maximumValue={40}
                     step={1}
                     minimumTrackTintColor={lightPurple}
                     maximumTrackTintColor={black}
                     thumbTintColor={lightPurple}
                     value={ballPosition}
                     onValueChange={(value) => {
                        setBallPosition(value);
                        handlePositionChange(value);
                     }}
                  />
                  <Text style={{ marginLeft: 12 }}>{ballPosition}</Text>
               </View>
            </View>
         </View>
         <View
            style={{
               width: "100%",
               marginTop: 24,
            }}
         >
            <View
               style={{
                  width: "100%",
               }}
            >
               <Text style={{ color: black, marginTop: 16 }}>Kp Value</Text>
               <View
                  style={{
                     flex: 1,
                     flexDirection: "row",
                     alignItems: "center",
                  }}
               >
                  <Slider
                     style={{ height: 40, flex: 1 }}
                     minimumValue={0.1}
                     maximumValue={10}
                     step={0.1}
                     minimumTrackTintColor={lightPurple}
                     maximumTrackTintColor={black}
                     thumbTintColor={lightPurple}
                     value={kp}
                     onValueChange={(value) => {
                        setKp(parseFloat(value.toFixed(2)));
                        handlePIDChange();
                     }}
                  />
                  <Text style={{ marginLeft: 12 }}>{kp}</Text>
               </View>
            </View>
            <View
               style={{
                  width: "100%",
               }}
            >
               <Text style={{ color: black, marginTop: 16 }}>Ki Value</Text>
               <View
                  style={{
                     flex: 1,
                     flexDirection: "row",
                     alignItems: "center",
                  }}
               >
                  <Slider
                     style={{ height: 40, flex: 1 }}
                     minimumValue={0.1}
                     maximumValue={10}
                     step={0.1}
                     minimumTrackTintColor={lightPurple}
                     maximumTrackTintColor={black}
                     thumbTintColor={lightPurple}
                     value={ki}
                     onValueChange={(value) => {
                        setKi(parseFloat(value.toFixed(2)));
                        handlePIDChange();
                     }}
                  />
                  <Text style={{ marginLeft: 12 }}>{ki}</Text>
               </View>
            </View>
            <View
               style={{
                  width: "100%",
               }}
            >
               <Text style={{ color: black, marginTop: 16 }}>Kd Value</Text>
               <View
                  style={{
                     flex: 1,
                     flexDirection: "row",
                     alignItems: "center",
                  }}
               >
                  <Slider
                     style={{ height: 40, flex: 1 }}
                     minimumValue={0.1}
                     maximumValue={10}
                     step={0.1}
                     minimumTrackTintColor={lightPurple}
                     maximumTrackTintColor={black}
                     thumbTintColor={lightPurple}
                     value={kd}
                     onValueChange={(value) => {
                        setKd(parseFloat(value.toFixed(2)));
                        handlePIDChange();
                     }}
                  />
                  <Text style={{ marginLeft: 12 }}>{kd}</Text>
               </View>
            </View>
         </View>
      </View>
   );
}
