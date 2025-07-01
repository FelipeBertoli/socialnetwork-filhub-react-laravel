import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { BackButton, UserImage } from "../../../../ModuleExports";
import AuthContext from "../../../../utils/contexts/AuthContext";
import { getFollowed, getFollowers, followUser, unfollowUser, removeFollower } from "../../../../utils/services/RelationshipService";
import { useNavigation } from "@react-navigation/native";

export default function UserFollowershipScreen({ route }) {
  const { user } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [followed, setFolloweds] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const navigation = useNavigation();
  const { tab = 'Followers', userId, userName } = route.params || {};

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.header}>
          <BackButton route={['Profile', {
            visitorId: user.id,
            visitedId: userId,
            userName: `${user.name} ${user.surname}`,
            path: 'UserFollowership'
          }]}/>
          <Text style={styles.headerText}>{userName}</Text>
        </View>
      ),
      headerShown: true,
    });
  }, [navigation, user.id, userId, userName]);
  

  useEffect(() => {
    const getFollowershipData = async () => {
      try {
        const followersResponse = await getFollowers(userId);
        setFollowers(followersResponse);
        const followedResponse = await getFollowed(userId);
        setFolloweds(followedResponse);
        setFollowedUsers(followedResponse.map(user => user.id));
      } catch (error) {
        console.log('Erro ao obter dados de seguimento', error);
      }
    };
    getFollowershipData();
  }, [userId]);

  const handleTabChange = (newTab) => {
    navigation.setParams({ tab: newTab });
  };

  const handleFollow = async (followedId) => {
    try {
      await followUser({
        follower_id: user.id,
        followed_id: followedId
      });
      setFollowedUsers([...followedUsers, followedId]);
    } catch (e) {
      console.log('Erro ao seguir usuário:', e);
    }
  };

  const handleUnfollow = async (followedId) => {
    try {
      await unfollowUser({
        follower_id: user.id,
        followed_id: followedId
      });
      setFollowedUsers(followedUsers.filter(id => id !== followedId));
    } catch (e) {
      console.log('Erro ao deixar de seguir usuário:', e);
    }
  };

  const handleRemoveFollower = async (followerId) => {
    try {
      await removeFollower({
        follower_id: followerId,
        followed_id: user.id
      });
      setFollowers(followers.filter(follower => follower.id !== followerId));
    } catch (e) {
      console.log('Erro ao remover seguidor:', e);
    }
  };

  const isFollowed = (userId) => followedUsers.includes(userId);

  const renderUserList = (users, isFollowerList) => {
    return users.map(related => (
      <View key={related.id} style={styles.userContent}>
        <TouchableOpacity 
          style={styles.clickable} 
          onPress={() => navigation.navigate('Profile', {
            tab: tab,
            visitorId: user.id,
            visitedId: related.id,
            userName: userName,
            path: 'UserFollowership'
          })}
        >
          <UserImage size={55} source={related.picture_path} />
          <View style={styles.textGroup}>
            <Text style={styles.username}>{related.name} {related.surname}</Text>
            <Text style={styles.title}>{related.title}</Text>
          </View>
        </TouchableOpacity>
        {isFollowerList ? ( userId === user.id && (
          related.id !== user.id && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFollower(related.id)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          )
        )

        ) : (
          related.id !== user.id && (
          <TouchableOpacity
            style={[styles.followButton, isFollowed(related.id) ? styles.following : styles.follow]}
            onPress={() => isFollowed(related.id) ? handleUnfollow(related.id) : handleFollow(related.id)}
          >
            <Text style={isFollowed(related.id) ? styles.followingButtonText : styles.followButtonText}>
              {isFollowed(related.id) ? 'Seguindo' : 'Seguir'}
            </Text>
          </TouchableOpacity>
          )
        )}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.option} onPress={() => handleTabChange('Followers')}>
          <Text style={[styles.optionText, tab === 'Followers' && styles.selectedOptionText]}>Seguidores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleTabChange('Followed')}>
          <Text style={[styles.optionText, tab === 'Followed' && styles.selectedOptionText]}>Seguindo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {tab === 'Followers' ? renderUserList(followers, true) : renderUserList(followed, false)}
      </View>
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
  headerText: {
    fontSize: 20,
    fontWeight: '500'
  },
  container: {
    backgroundColor: 'white',
    height: "100%",
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: "4%"
  },
  content: {
    paddingHorizontal: "3%",
    paddingVertical: "10%"
  },
  optionText: {
    color: 'grey',
    fontSize: 15,
    fontWeight: '900',
  },
  selectedOptionText: {
    color: '#1271FF',
    borderBottomWidth: 3,
    borderBottomColor: '#1271FF',
  },
  userGroup: {
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 25,
    backgroundColor: "white",
    rowGap: 5,
    marginBottom: 15,
    borderBottomWidth: 0.2
  },
  userContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingBottom: 15,
    width: 'auto'
  },
  clickable: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    width: 280,
    overflow:'hidden'
  },
  username: {
    fontSize: 17,
    fontWeight: "900",
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: 'grey'
  },
  followButton: {
    borderWidth: 4,
    borderColor: "#FF7600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight:10
  },
  following: {
    backgroundColor: '#FF7600',
    marginRight:10
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
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});