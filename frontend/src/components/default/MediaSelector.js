import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MediaSelector ({ onImageSelected }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center',rowGap:10 }}>
      <Button title="" onPress={pickImage}/>
      {image && <Image source={{ uri: image }} style={{ width: "100%", height: 300}} />}
    </View>
  );
};
