import {  View, StyleSheet } from "react-native";
import { ActivityIndicator } from 'react-native-paper';

export default function Loading() {
  return (
    <View style={styles.container}>
        <ActivityIndicator animating={true} color={'#FF7600'} size={50}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0EFEF",
    height:"100%"
  },
});
