import { useEffect, useState } from "react";
import { View, StyleSheet} from "react-native";
import { Avatar } from 'react-native-paper';

export default function UserImage({size, source}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
      if (source) {
        setImage({ uri:source});
      } else if (source === null || source === '') {
          const path = require('../../../assets/user.png');
          setImage(path);
    }

  }, [source])

  return (
    <View style={styles.image}>
      <Avatar.Image size={size} source={image} />
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
        flexDirection:'row',
        borderWidth: 2,
        borderRadius:50,
        alignItems:'center',
    },
});
