import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar, Button, Icon } from 'react-native-paper';

const defaultImage = require('../../../assets/user.png');

export default function ImageSelector({ onChange, source }) {
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    if (source) {
      setImage({ uri: source });
    } else {
      setImage(defaultImage);
    }
  }, [source]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const imageUri = result.assets[0].uri;
      setImage({ uri: imageUri });
      onChange(result.assets[0].base64);
    }
  };

  const deleteImage = () => {
    setImage(defaultImage);
    onChange(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foto de Perfil</Text>
      <Avatar.Image size={150} source={image} />
      <Button
        mode="contained"
        style={{ backgroundColor: '#FF7600', borderRadius: 15 }}
        onPress={pickImage}
      >
        Carregar
      </Button>
      <TouchableOpacity style={{ position: 'absolute', top: '20%', right: '5%' }} onPress={deleteImage}>
        <Icon source="trash-can-outline" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: 15,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: "#F0EFEF",
    borderBottomWidth: 1,
    borderColor: "#857870",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  label: {
    fontSize: 12,
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 4,
  },
});