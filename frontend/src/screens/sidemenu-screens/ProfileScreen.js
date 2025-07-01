import { useCallback, useContext, useState } from "react";
import { View, StyleSheet, Text, Share, ScrollView, TouchableOpacity } from "react-native";
import AuthContext from "../../../utils/contexts/AuthContext";
import { IconButton, UserImage, Loading, Post, BackButton } from "../../../ModuleExports";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { followUser, getFollowedCount, getFollowersCount, unfollowUser, verifyFollowership, removeFollower } from "../../../utils/services/RelationshipService";
import { getProfilePosts } from "../../../utils/services/PostService";
import { getUserById } from "../../../utils/services/UserService";
import { Button } from "react-native-paper";

export default function ProfileScreen({ route }) {
  const { visitorId, visitedId } = route.params;
  const loggedUser = useContext(AuthContext);
  const navigation = useNavigation();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [followerCount, setFollowerCount] = useState('0');
  const [followedCount, setFollowedCount] = useState('0');
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [description, setDescription] = useState(false);
  const [posts, setPosts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
      fetchPosts();
    }, [visitedId])
  );

  const fetchProfile = async () => {
    try {
      const userData = await getUserById(visitedId);
      setUser(userData);
      setIsLoggedUser(userData.id === loggedUser.user.id);
      if (userData.description) setDescription(true);

      const [followerData, followedData] = await Promise.all([
        getFollowersCount(visitedId),
        getFollowedCount(visitedId),
      ]);
      setFollowerCount(followerData);
      setFollowedCount(followedData);
      if (userData.id !== loggedUser.user.id) {
        verifyUser(visitorId, visitedId, 'follower');
        verifyUser(visitedId, visitorId, 'followed');
      }

      setNavBar(userData);
    } catch (error) {
      console.log('Erro ao buscar perfil', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const postData = await getProfilePosts(visitedId);
      setPosts(postData);
    } catch (error) {
      console.log('Erro ao buscar posts', error);
    } 
  };

  const verifyUser = async (follower_id, followed_id, type) => {

    try {
      const response = await verifyFollowership({ follower_id, followed_id });
      if (type == "follower") {
        if (response.message === "Usuário é seguido") {
          setIsFollower(true);
        } else if (response.message === "Usuário não é seguido") {
          setIsFollower(false);
        }
      } else if (type == "followed") {
        if (response.message === "Usuário é seguido") {
          setIsFollowed(true);
        } else if (response.message === "Usuário não é seguido") {
          setIsFollowed(false);
        }
      }

    } catch (error) {
      console.log('Erro ao verificar followership', error.response);
    }
  };

  const setNavBar = (userData) => {
    if (userData) {
      navigation.setOptions({
        headerLeft: () => (
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.headerText}>{userData.name} {userData.surname}</Text>
          </View>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
          {userData.id == loggedUser.user.id &&
              (<IconButton type="edit" size={25} scheme={goToEditScreen} />) 
   
            }
          </View>
        ),
        headerShown: true,
      });
    }
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Confira o perfil de ${user.name} ${user.surname} no Filhub: [link do perfil]`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFollow = async () => {
    try {
      await followUser({ follower_id: visitorId, followed_id: visitedId });
      setIsFollower(true);
      setFollowerCount((prev) => (parseInt(prev) + 1).toString());
    } catch (e) {
      console.log('Erro ao seguir usuário:', e.response?.data);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser({ follower_id: visitorId, followed_id: visitedId });
      setIsFollower(false);
      setFollowerCount((prev) => (parseInt(prev) - 1).toString());
    } catch (e) {
      console.log('Erro ao deixar de seguir usuário:', e.response);
    }
  };

  const handleRemoveFollower = async () => {
    try {
      await removeFollower({ follower_id: visitedId, followed_id: visitorId });
      setIsFollowed(false);
      setFollowedCount((prev) => (parseInt(prev) - 1).toString());
    } catch (e) {
      console.log('Erro ao remover seguidor:', e.response);
    }
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
  };
  
  const goToEditScreen = () => {
    navigation.navigate("EditProfile");
  };

  if (loadingProfile) return <Loading />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContent}>
        <View style={styles.infoGroup}>
          <UserImage size={80} source={user.picture_path} />
          <View style={styles.textGroup}>
            <Text style={styles.username}>{user.name} {user.surname}</Text>
            <Text>{user.title}</Text>
            <View style={styles.rowGroup}>
              <TouchableOpacity onPress={() => navigation.navigate('UserFollowership', { tab: 'Followers', userId: user.id, userName: `${user.name} ${user.surname}` })}>
                <Text style={styles.rowText}>{followerCount} Seguidores</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('UserFollowership', { tab: 'Followed', userId: user.id, userName: `${user.name} ${user.surname}` })}>
                <Text style={styles.rowText}>{followedCount} Seguindo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {!isLoggedUser && (
          <View style={styles.buttonGroup}>
            {isFollower ? (
              <Button icon="account-minus" mode="contained" onPress={handleUnfollow} style={{ width: 150, height: 35, justifyContent: 'center'}} labelStyle={{ fontSize: 13, height:20}}>Deixar de Seguir</Button>
            ) : (
              <Button icon="account-plus" mode="contained" onPress={handleFollow} style={{ width: 95, height: 35, justifyContent: 'center'}} labelStyle={{ fontSize: 13, height:20}}>Seguir</Button>
            )}
            {isFollowed && (
              <Button icon="window-close" mode="contained" onPress={handleRemoveFollower} style={{ width: 160, height: 35, justifyContent: 'center'}} labelStyle={{ fontSize: 13, height:20}} >Remover seguidor</Button>
            )}
          </View>
        )}

        {description && (
          <View style={styles.aboutContent}>
            <View style={styles.line}></View>
            <Text style={styles.aboutText}>Sobre</Text>
            <Text style={styles.position}>{user.position}</Text>
            <View style={styles.aboutField}>
              <Text>{user.description}</Text>
            </View>
          </View>
        )}
      </View>

      {posts && posts.length > 0 ? (
      <View style={styles.postContainer}>
            {
              posts.map((post) => <Post key={post.id}                  
              postId={post.id}
              userName={`${user.name} ${user.surname}`}
              userTitle={user.title}
              userId={user.id}
              userPicture={user.picture_path  || ''}
              courseId={post.course ? post.course.id : ''}
              courseName={post.course ? post.course.name : ''}
              postDescription={post.description}
              postSendTime={post.formatted_send_time}
              postMedia={post.media_path || ''}
              isLiked={post.isLiked}
              likeId={post.likeId || ''}
              isFavorited={post.isFavorited}
              favoriteId={post.favoriteId || ''}
              onPostDeleted={handlePostDeleted}
              />)
            }
      </View>
      ) : (
      <View style={styles.noPostContainer}>
        <Text style={styles.noPostsText}>Nenhuma publicação até o momento.</Text>
      </View>

      )}
        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    display: 'flex',
    flexDirection: 'row',
    columnGap: 16
  },
  headerRight: {
    paddingRight: 10,
    flexDirection: 'row',
    columnGap: 25,
    marginRight: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500'
  },
  container: {
    height: "100%",
  },
  profileContent: {
    backgroundColor: "white",
    height: "auto",
    padding: 20,
    borderBottomWidth: 0.2,
    borderColor: "black",
  },
  infoGroup: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    paddingBottom: 15,
    width: 'auto'
  },
  username: {
    fontSize: 17,
    fontWeight: "900",
  },
  rowGroup: {
    flexDirection: "row",
    gap: 5
  },
  rowText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: 'grey'
  },
  buttonGroup: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },

  buttonMore: {
    borderColor: "#FF7600",
    borderRadius: 30,
    borderWidth: 2,
    padding: 5
  },
  aboutContent: {
    backgroundColor: "white",
    height: "auto",
  },
  position: {
    color: 'grey',
    fontWeight: '800'
  },
  aboutField: {
    marginTop: 5,
  },
  aboutText: {
    fontWeight: '700',
    fontSize: 20,
  },
  line: {
    borderWidth: 0.2,
    marginVertical: 10,
    marginHorizontal: 10
  },
  blueText: {
    fontStyle: "italic",
    color: "#1271FF",
    fontWeight: '700'
  },
  postContainer: {
    paddingVertical: 15,
    rowGap: 15,
    marginTop:10,
  },
  noPostContainer: {
    alignItems:'center',
    justifyContent:'center',
    marginTop: 50,
  },  
  noPostsText: {

    fontWeight:'bold',
    fontSize:18,
  }
});
