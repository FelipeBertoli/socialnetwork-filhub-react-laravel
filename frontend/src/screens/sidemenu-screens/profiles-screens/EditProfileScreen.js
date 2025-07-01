import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Input, DatePicker, DropList, ImageSelector, FieldInput, genderList, cargoList, BackButton } from "../../../../ModuleExports";
import AuthContext from "../../../../utils/contexts/AuthContext";
import { loadCourses, updateProfile } from "../../../../utils/services/UserService";
import { Button, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [position, setPosition] = useState(user.position);
  const [gender, setGender] = useState(user.gender);
  const [description, setDescription] = useState(user.description);
  const [birthday, setBirthday] = useState(user.birthday);
  const [course_id, setCourse] = useState(user.course ? user.course.id : "");
  const [picture_path, setPicture] = useState(user.picture_path);
  const [title, setTitle] = useState(user.title);
  const [error, setError] = useState({});
  const [showCurso, setShowCurso] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await loadCourses();
        const mappedCourses = response.map(course => ({
          label: course.name,
          value: course.id,
        }));
        setCourses(mappedCourses);
      } catch (error) {
        console.log('Erro ao obter cursos:', error);
      }
    };
    getCourses();
    setNavBar();
  }, []);

  useEffect(() => {
    setShowCurso(
      position === "Aluno" ||
      position === "Professor" ||
      position === "Coordenador"
    );
  }, [position]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateProfile({
        id: user.id,
        name,
        surname,
        title,
        position,
        gender,
        birthday,
        course_id,
        description,
        picture_path
      });
      navigation.navigate('Profile', {
            visitorId: user.id,
            visitedId: user.id,
            userName: `${user.name} +  ${user.surname}`,
            path: 'EditProfile'});
    } catch (e) {
      console.log(e.response);
    } finally {
      setLoading(false);
    }
  };

  const setNavBar = () => {
      navigation.setOptions({
        headerLeft: () => (
            <BackButton route={['Profile', {
            visitorId: user.id,
            visitedId: user.id,
            userName: `${user.name} +  ${user.surname}`,
            path: 'EditScreen'}]}/>
        ),
    
        headerShown: true,
      });
    
  };

  const handleDateChange = (date) => {
    setBirthday(date);
  };

  const handlePictureChange = (picture) => {
    setPicture(picture);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <ImageSelector source={user.picture_path} onChange={handlePictureChange} />
          <Input label="Nome" value={name} onChangeText={setName} />
          <Input label="Sobrenome" value={surname} onChangeText={setSurname} />
          <DatePicker label="Data de Nascimento" defaultValue={birthday} onChange={handleDateChange} />
          <DropList label="Gênero" value={gender} list={genderList} setValue={setGender} size={330}/>
          <Input label="Título" value={title} onChangeText={setTitle} />
          <DropList label="Posição" value={position} list={cargoList} setValue={setPosition} size={330}/>
          {showCurso && <DropList label="Curso" value={course_id} list={courses} setValue={setCourse} size={330}/>}
          <FieldInput label="Sobre" value={description} setValue={setDescription} />
          <Text style={{ color: 'grey', paddingHorizontal: 40 }}>
            <Text style={{ color: 'red', fontWeight: '900' }}>*</Text>
            As alterações podem demorar um pouco para serem refletidas no sistema.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.sticky}>
        <Button onPress={handleUpdate} mode="contained" style={styles.button} disabled={loading}>
          {loading ? (
            <ActivityIndicator animating={true} color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Confirmar alterações</Text>
          )}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    rowGap: 25,
    paddingTop: 20,
    paddingBottom: 110,
    backgroundColor: 'white',
  },
  sticky: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: '100%',
    borderTopWidth: 0.2,
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
