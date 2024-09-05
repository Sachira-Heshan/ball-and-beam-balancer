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

   const [response, setResponse] = useState<string>("");
   const [error, setError] = useState<string>("");

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
            .then((res) => {
               console.log("Set point Data: ", res.data);
               setResponse(res.data + ": " + res.request.responseURL);
            })
            .catch((e) => {
               console.log(e);
               setError(e.message);
            });
      }
   };

   type PIDValues = {
      pValue: number;
      iValue: number;
      dValue: number;
   };

   const handlePIDChange = ({ pValue, iValue, dValue }: PIDValues) => {
      console.log("PID Change");
      const url = `http://${ipAddress}/pid`;
      console.log(url);
      if (ipAddress) {
         axios
            .get(url, {
               params: {
                  kp: pValue,
                  ki: iValue,
                  kd: dValue,
               },
            })
            .then((res) => {
               console.log("PID: ", res);
               setResponse(res.data + ": " + res.request.responseURL);
            })
            .catch((e) => {
               console.log(e);
               setError(e.message);
            });
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
         <Text style={{ color: black, fontSize: 24 }}>PID Controller</Text>
         <Text style={{ color: black, marginTop: 16 }}>IP Address: {ipAddress}</Text>
         <Text style={{ color: black, marginTop: 16 }}>Response: {response}</Text>
         <Text style={{ color: black, marginVertical: 16 }}>Error: {error}</Text>
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
                  <Text style={{ marginLeft: 12, color: black }}>{ballPosition}</Text>
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
                        handlePIDChange({
                           pValue: parseFloat(value.toFixed(2)),
                           iValue: ki,
                           dValue: kd,
                        });
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
                        handlePIDChange({
                           pValue: kp,
                           iValue: parseFloat(value.toFixed(2)),
                           dValue: kd,
                        });
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
                        handlePIDChange({
                           pValue: kp,
                           iValue: ki,
                           dValue: parseFloat(value.toFixed(2)),
                        });
                     }}
                  />
                  <Text style={{ marginLeft: 12 }}>{kd}</Text>
               </View>
            </View>
         </View>
      </View>
   );
}
