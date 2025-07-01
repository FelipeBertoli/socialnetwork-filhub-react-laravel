import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { followCourse, getFollowingCourses, unfollowCourse } from '../../../utils/services/CourseService';
import AuthContext from '../../../utils/contexts/AuthContext';
import { Loading, TextTitle } from '../../../ModuleExports';
import { useNavigation } from '@react-navigation/native';

export default function CoursesScreen() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const courseData = await getFollowingCourses({ user_id: user.id });
        setCourses(courseData);
      } catch (e) {
        console.log(e.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.id]);

  const handleFollowCourse = async (courseId) => {
    try {
      await followCourse({
        user_id: user.id,
        course_id: courseId
      });
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, follow_status: 'Seguido' } : course
        )
      );
    } catch (e) {
      console.log('Erro ao seguir curso: ', e.response);
    }
  };

  const handleUnfollowCourse = async (courseId) => {
    try {
      await unfollowCourse({
        user_id: user.id,
        course_id: courseId
      });
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, follow_status: 'Não seguido' } : course
        )
      );
    } catch (e) {
      console.log('Erro ao desseguir curso: ', e.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>

          <View style={styles.content}>
          <TextTitle text="Cursos" />
            {courses.map((course) => (
              <TouchableOpacity onPress={() => navigation.navigate('CoursePosts', {courseId:course.id, courseName:course.name})} View key={course.id} style={styles.card}>
                
                  <Text style={styles.name}>{course.name}</Text>
                  
                {course.follow_status === 'Seguido' ? (
                  <TouchableOpacity style={[styles.followButton, styles.follow]} onPress={() => handleUnfollowCourse(course.id)}>
                    <Text style={styles.followButtonText}>Seguindo</Text>
                    </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={[styles.followButton, styles.following]} mode="contained" onPress={() => handleFollowCourse(course.id)}>
                    <Text style={styles.followingButtonText}>Seguir</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    rowGap: 15,
    padding: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#F0EFEF',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  name: {
    fontWeight: '500',
    width: '70%',
  },
  followButton: {
    borderWidth: 4,
    borderColor: "#FF7600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  following: {
    backgroundColor: '#FF7600',
  },
  follow: {
    color: 'black',
  },
  followButtonText: {
    color: '#FF7600',
    fontWeight: 'bold',
  },
  followingButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
