import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Share } from "react-native";
import AuthContext from "../../../../utils/contexts/AuthContext";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { DropList, IconButton } from "../../../../ModuleExports";
import { loadCourses } from "../../../../utils/services/UserService";
import { FontAwesome5 } from "@expo/vector-icons";
import { createPost, updatePost } from "../../../../utils/services/PostService";
import { useNavigation } from "@react-navigation/native";

export default function EditPostScreen({route}) {
  const { postCourse, postDescription, postId } = route.params;
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [text, setText] = useState(postDescription);
  const [course, setCourse] = useState(postCourse ? postCourse : "");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleUpdate = async() => {
    try {
      await updatePost({
        id: postId,
        course_id: course,
        description: text
      });
      navigation.navigate('Profile', {
        visitorId: user.id,
        visitedId: user.id,
        userName: `${user.name} +  ${user.surname}`,
        path: 'Início'})
    } catch (e) {
      
      console.log("Erro ao realizar publicação", e.response.data.message);
    }
  }

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
              <FontAwesome5 name="tag" size={20} color="#FF7600" />
              <Text style={styles.courseText}>Adicionar curso</Text>
            </View>
          </View>
          <DropList label="" value={course} list={courses} setValue={setCourse} size={360}/>

        </View>
      </ScrollView>
      <View style={styles.sticky}>
        <Button onPress={handleUpdate} mode="contained" style={styles.button} disabled={loading}>
          {loading ? (
            <ActivityIndicator animating={true} color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Editar</Text>
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
    alignItems:'center',
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
    paddingTop:10,
    position: 'absolute',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    fontSize: 100,
    height: 50,
    justifyContent: 'center',
    width:"80%"
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    textTransform: 'uppercase',
    fontWeight: '700',
    width: 200,
    textAlign: 'center',
  },
});
