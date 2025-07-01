import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Share, Image, TouchableOpacity } from "react-native";
import AuthContext from "../../../../utils/contexts/AuthContext";
import { ActivityIndicator, Button, Icon, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { DropList, IconButton, MediaSelector } from "../../../../ModuleExports";
import { loadCourses } from "../../../../utils/services/UserService";
import { FontAwesome5 } from "@expo/vector-icons";
import { createPost } from "../../../../utils/services/PostService";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export default function NewPostScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };


  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        await loadCourses().then(response => {
          const mappedCourses = response.map(course => ({
            label: course.name,
            value: course.id,
          }));
          setCourses([{ label: "Selecione um curso", value: "" }, ...mappedCourses]);
        });
      } catch (error) {
        console.log('Erro ao obter cursos:', error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  async function handleCreate() {
    setLoading(true);
    const formData = new FormData();
    formData.append('description', text);
    formData.append('author_id', user.id);
    formData.append('course_id', course);

    if (image) {
      formData.append('media_path', {
        uri: image,
        name: 'upload.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await createPost(formData);
      navigation.navigate('Início');
    } catch (e) {
      console.log("Erro ao realizar publicação: ", e.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const deleteImage = () => {
    setImage(null);
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        <TextInput
          label="O que você quer compartilhar?..."
          value={text}
          onChangeText={text => setText(text)}
          multiline={true}
          style={styles.input}
        />
        <View style={styles.content}>
          <View style={styles.item}>
            <View style={styles.label}>
              <FontAwesome5 name="tag" size={17} color="#FF7600" />
              <Text style={styles.courseText}>Adicionar curso</Text>
            </View>
          </View>
          <DropList label="" value={course} list={courses} setValue={setCourse} size={360} />

          <View style={[styles.item, { paddingTop: 40 }]}>
            <View style={styles.label}>
              <FontAwesome5 name="images" size={17} color="#FF7600" />
              <Text style={styles.courseText}>Adicionar foto</Text>
            </View>
            <IconButton type="angle-right" size={25} scheme={() => pickImage()} />
          </View>
          {image && <View>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity style={styles.thrash} onPress={deleteImage}>
              <Icon source="trash-can-outline" size={25} color="white" />
            </TouchableOpacity>
          </View>
          }
        </View>
      </ScrollView>
      <View style={styles.sticky}>
        <Button onPress={handleCreate} mode="contained" style={styles.button} disabled={loading}>
          {loading ? (
            <ActivityIndicator animating={true} color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Publicar</Text>
          )}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  content: {
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  input: {
    backgroundColor: '#F0EFEF',
    height: 100,
    paddingVertical: 10,
    width: '100%',
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  label: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  courseText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sticky: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 0.2,
    bottom: 10,
    height: 80,
    left: 0,
    justifyContent: 'center',
    paddingTop: 10,
    position: 'absolute',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    fontSize: 100,
    height: 50,
    justifyContent: 'center',
    width: "80%"
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    textTransform: 'uppercase',
    fontWeight: '700',
    width: 200,
    textAlign: 'center',
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: 300,
  },
  thrash: {
    backgroundColor: 'red',
    borderRadius: 20,
    position: 'absolute',
    top: '5%',
    right: '5%',
    padding: 6
  }
});