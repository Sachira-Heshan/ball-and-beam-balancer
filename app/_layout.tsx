import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
     <PaperProvider>
        <Stack>
           <Stack.Screen
              name="index"
              options={{
                 title: "Ball and Beam Balance Appratus",
                 headerTitleAlign: "center",
              }}
           />
        </Stack>
     </PaperProvider>
  );
}
