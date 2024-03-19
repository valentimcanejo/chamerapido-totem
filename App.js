import { StatusBar } from "expo-status-bar";
import { NativeModules, Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "./src/components/Button";
import { useState, useEffect } from "react";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import RNPrint from "react-native-print";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      DNA Center
    </h1>
    <span>Ficha: A1</span>
  </body>
</html>
`;

const SilentPrintExample = () => {
  useEffect(() => {
    // Example of silent printing on component mount
    printSilently();
  }, []);

  const printSilently = async () => {
    try {
      console.log(RNPrint);
      if (Platform.OS === "android" && RNPrint) {
        RNPrint.print({
          silent: true, // Enable silent printing
          html,
        });
      }
    } catch (error) {
      console.error("Error printing:", error);
    }
  };

  return <Button title="Print" onPress={printSilently} />;
};

export default function App() {
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <span>Ficha: A1</span>
  </body>
</html>
`;

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printAPI = async () => {
    try {
      const result = await fetch(`http://192.168.2.33:3333/print?html=${html}`);

      const jsonObject = result.json();
      console.log(jsonObject);
    } catch (error) {
      console.log(error);
    }
  };

  const printAPIRomulo = async () => {
    try {
      const result = await fetch(`http://192.168.0.17:3333/print?html=${html}`);

      const jsonObject = result.json();
      console.log(jsonObject);
    } catch (error) {
      console.log(error);
    }
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {/* <Button title="Print" onPress={print} /> */}
        <Text>IP Pedro: {`http://192.168.2.33:3333`}</Text>
        <Text>IP Rômulo: {`http://192.168.0.17:3333`}</Text>
        <View style={styles.spacer} />
        <Button
          title="Print IP Pedro"
          onPress={() => {
            printAPI();
          }}
        />
        <Button
          title="Print IP Rômulo"
          onPress={() => {
            printAPIRomulo();
          }}
        />
        {/* <Button title="Print to PDF file" onPress={printToFile} /> */}
        {/* <SilentPrintExample /> */}
      </View>
      {/* <Button title="Atendimento" /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
