import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import { Input, DatePicker, DropList, ImageSelector, FieldInput, genderList, cargoList, CustomHeader, Loading, PasswordInput, } from "../../../ModuleExports";
import { useNavigation } from "@react-navigation/native";
import { loadCourses, register } from "../../../utils/services/UserService";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [course_id, setCourse] = useState("");
  const [picture_path, setPicture] = useState("");
  const [error, setError] = useState({});
  const [showCurso, setShowCurso] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  
  async function handleRegister() {
    setError({});
    try {
      setLoading(true);
       await register(
        {
          name,
          surname,
          email,
          position,
          gender,
          birthday,
          course_id,
          description,
          password,
          password_confirmation: passwordConfirmation,
          picture_path,
        }
      );
      navigation.navigate("Confirmation");
    } catch (e) {
      setLoading(false);
      if (e.response?.status === 422) {
        setError(e.response.data.errors);
      }
      console.log(e.response);
    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    const getCourses = async () => {
      try {
         await loadCourses().then(response => {
          const mappedCourses = response.map(course => ({
            label: course.name,
            value: course.id,
          }));
          setCourses(mappedCourses);
      })
      } catch (error) {
        console.log('Erro ao obter cursos:', error);
      }
    };

    getCourses(); 
    setShowCurso(
      position === "Aluno" ||
        position === "Professor" ||
        position === "Coordenador"
    );
  }, [position]);

  useEffect(() => {
    navigation.setOptions({

      headerShown: !loading,
    });
  }, [loading, navigation]);

  const handleDateChange = (date) => {
    setBirthday(date);
  };

  const handlePictureChange = (picture) => {
    setPicture(picture);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <View style={styles.formContent}>
          <Input
            label="Nome"
            value={name}
            onChangeText={(value) => setName(value)}
            error={error.name}
          />
        </View>
        <View style={styles.formContent}>
          <Input
            label="Sobrenome"
            value={surname}
            onChangeText={(value) => setSurName(value)}
            error={error.surname}
          />
        </View>
        <View style={styles.formContent}>
          <DatePicker label="Data de Nascimento" onChange={handleDateChange} error={error.birthday}/>
        </View>
        <View style={styles.formContent}>
          <DropList label="Gênero"
            list={genderList}
            value={gender}
            setValue={(value) => {
              setGender(value);
            }}
            error={error.gender}
            size={330}
          />
        </View>
          <View style={styles.formContent}>
            <DropList
              label="Posição"
              list={cargoList}
              value={position}
              setValue={(value) => {
                setPosition(value);
              }}
              error={error.position}
              size={330}
            />
          </View>
          {showCurso && (
            <View style={styles.formContent}>
              <DropList label="Curso" list={courses} value={course_id} setValue={(value) => setCourse(value)} error={error.course} size={330}/>
            </View>
          )}

          <View style={styles.formContent}>
            <ImageSelector onChange={handlePictureChange}/>
          </View>
          <View style={styles.formContent}>
            <FieldInput
              label="Sobre"
              value={description}
              setValue={(value) => setDescription(value)}
              error={error.description}
            />
          </View>
          <View style={styles.formContent}>
            <Input
              label="E-mail"
              value={email}
              autoCapitalize="none"
              onChangeText={(value) => setEmail(value)}
              error={error.email}
            />
          </View>
          <View style={styles.formContent}>
            <PasswordInput
              label="Senha"
              defaultValue={password}
              onChangeText={(value) => setPassword(value)}
              error={error.password}
            />
          </View>
          <View style={styles.formContent}>
          <PasswordInput
              label="Repita sua Senha"
              defaultValue={passwordConfirmation}
              onChangeText={(value) => setPasswordConfirmation(value)}
              error={error.password}
            />
          </View>
          <View style={{paddingBottom:'20%', marginTop:'6%'}}>
          <Button
            onPress={handleRegister}
            mode="contained"
            style={styles.button}
          >
          {loading ? (
            <ActivityIndicator animating={true} color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>Confirmar</Text>
          )}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: "5%", 
    height:'100%', 
    backgroundColor:'white'
  },
  formGroup: {
    gap: 20,
    alignItems: "center",
  },
  formContent: {
    justifyContent: "center",
    alignItems: "left",
  },
  formLabel: {
    fontWeight: "600",
    fontSize: 15,
    paddingLeft: 10,
  },
  button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
    fontWeight: 700,
    width:100
  },
});
