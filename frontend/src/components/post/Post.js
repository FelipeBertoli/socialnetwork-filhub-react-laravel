import React, { useContext, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import UserImage from '../default/UserImage';
import ReactionsTab from './ReactionsTab';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../utils/contexts/AuthContext';
import PostMenu from './PostMenu';

export default function Post(
  { userId, userName, userPicture, userTitle, courseId, 
    courseName, postDescription, postId, postSendTime, 
    postPage, postMedia, isLiked, likeId, isFavorited,
    favoriteId, onPostDeleted  }) {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedText = postDescription.length > 80 ? `${postDescription.slice(0, 80)}...` : postDescription;
  
  const handleTextToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      {courseName !== '' && postPage !== 'CoursePosts' && (
        <View style={styles.courseHeader}>
          <TouchableOpacity onPress={() => navigation.navigate('CoursePosts', { courseId: courseId, courseName: courseName })}>
            <Text style={styles.course}>▶ {courseName}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.header}>
        {userId === user.id && ( <PostMenu postDescription={postDescription} postCourse={courseId} postId={postId} onPostDeleted={onPostDeleted}/>)}
        <UserImage size={50} source={userPicture}/>
        <View style={styles.textGroup}>
          <TouchableOpacity style={styles.firstRow} onPress={() => navigation.navigate('Profile', { visitorId: user.id, visitedId: userId })}>
            <Text style={styles.username}>{userName}</Text>
          </TouchableOpacity>
          <View style={styles.secondRow}>
            <Text style={styles.title}>{userTitle}</Text>
            <Text>•</Text>
            <Text style={styles.data}>{postSendTime}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleTextToggle}>
        <Text style={styles.description}>
          {isExpanded ? postDescription : truncatedText}
          {!isExpanded && postDescription.length > 80 && (
            <Text style={styles.seeMore}> Veja mais</Text>
          )}
        </Text>
      </TouchableOpacity>
      {postMedia != '' && <Image source={{uri: postMedia}} style={styles.media} />}
      <ReactionsTab postId={postId} 
                    postAuthorId={userId}
                    isLiked={isLiked} 
                    likeId={likeId} 
                    isFavorited={isFavorited}
                    favoriteId={favoriteId}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 0.1,
    borderColor: "black",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  header: {
    alignItems: 'center',
    columnGap: 10,
    flexDirection: 'row',
    paddingTop: 15,
  },
  textGroup: {},
  username: {
    color: '#454242',
    fontSize: 16,
    fontWeight: '700',
  },
  firstRow: {
    alignItems: 'center',
    columnGap: 5,
    flexDirection: 'row',
  },
  secondRow: {
    alignItems: 'center',
    columnGap: 4,
    flexDirection: 'row',
  },
  courseHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 10,
  },
  course: {
    color: "#FF7600",
    fontWeight: 'bold',
  },
  title: {
    fontSize: 13,
  },
  data: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  description: {
    paddingTop: 15,
    paddingBottom:12
  },
  seeMore: {
    color: '#FF7600',
    fontWeight: 'bold',
  },
  media:{ 
    borderRadius:10,
    width: "100%", 
    height: 265,
    marginBottom:10
  }
});
