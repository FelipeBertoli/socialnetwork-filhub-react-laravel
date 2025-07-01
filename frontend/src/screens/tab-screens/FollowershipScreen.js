import { useContext, useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { IconButton, TextTitle, UserImage } from '../../../ModuleExports';
import { followUser, getPendentFollowers, getSuggestUsers, searchUsers, unfollowUser } from '../../../utils/services/RelationshipService';
import AuthContext from '../../../utils/contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

export default function FollowershipScreen() {
  const { user: loggedUser } = useContext(AuthContext);
  const [suggestUsers, setSuggestUsers] = useState([]);
  const [pendentFollowers, setPendentFollowers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSuggest, setIsLoadingSuggest] = useState(false);
  const [isLoadingPendent, setIsLoadingPendent] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, [loggedUser.id]);

  const fetchData = async () => {
    await Promise.all([getSuggested(), getPendent()]);
  };

  const getPendent = async () => {
    setIsLoadingPendent(true);
    try {
      const data = await getPendentFollowers({ id: loggedUser.id });
      setPendentFollowers(data);
    } catch (error) {
      console.log('Erro ao obter usuários:', error);
    } finally {
      setIsLoadingPendent(false);
    }
  };

  const getSuggested = async () => {
    setIsLoadingSuggest(true);
    try {
      const data = await getSuggestUsers({ id: loggedUser.id });
      setSuggestUsers(data);
    } catch (error) {
      console.log('Erro ao obter usuários:', error.response.data.message);
    } finally {
      setIsLoadingSuggest(false);
    }
  };

  const handleFollow = async (followedId) => {
    try {
      await followUser({ follower_id: loggedUser.id, followed_id: followedId });
      setFollowedUsers([...followedUsers, followedId]);
    } catch (error) {
      console.log('Erro ao seguir usuário:', error.response.data);
    }
  };

  const handleUnfollow = async (followedId) => {
    try {
      await unfollowUser({ follower_id: loggedUser.id, followed_id: followedId });
      setFollowedUsers(followedUsers.filter(id => id !== followedId));
    } catch (error) {
      console.log('Erro ao deixar de seguir usuário:', error);
    }
  };

  const isFollowed = (userId) => followedUsers.includes(userId);

  const handleSearch = async () => {
    if (searchQuery.length > 0) {
      setLoadingSearch(true);
      try {
        setSearchedUsers([]);
        const data = await searchUsers({ id: loggedUser.id, query: searchQuery });
        setSearchedUsers(data);
        setIsSearching(true);
      } catch (error) {
        console.log('Erro ao buscar usuários:', error.response.data.message);
      } finally {
        setLoadingSearch(false);
      }
    }
  };

  const handleEraseSearch = () => {
    setSearchQuery('');
    setSearchedUsers([]);
    setIsSearching(false);
  };

  const UserList = ({ title, users, isLoading }) => (
    <View style={styles.userGroup}>
      <TextTitle text={title} />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF7600" />
        </View>
      ) : (
        users.map(user => (
          <View key={user.id} style={styles.userContent}>
            <TouchableOpacity
              style={styles.clickable}
              onPress={() => navigation.navigate('Profile', { visitorId: loggedUser.id, visitedId: user.id, path: 'Followership' })}
            >
              <UserImage size={55} source={user.picture_path} />
              <View style={styles.textGroup}>
                <Text style={styles.username}>{user.name} {user.surname}</Text>
                <Text style={styles.title}>{user.title}</Text>
              </View>
            </TouchableOpacity>
            {isFollowed(user.id) ? (
              <IconButton type="user-minus" size={23} scheme={() => handleUnfollow(user.id)} />
            ) : (
              <IconButton type="user-plus" size={23} scheme={() => handleFollow(user.id)} />
            )}
          </View>
        ))
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar contas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          right={
            <TextInput.Icon
              icon={isSearching ? "selection-ellipse-remove" : "account-search-outline"}
              onPress={isSearching ? handleEraseSearch : handleSearch}
              color={isSearching ? "red" : "#FF7600"}
            />
          }
        />
      </View>

      {loadingSearch ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF7600" />
        </View>
      ) : (
        searchedUsers.length > 0 && <UserList title="Resultados" users={searchedUsers} />
      )}

      {!isSearching && (
        <>
          <UserList title="Contas que te seguem" users={pendentFollowers} isLoading={isLoadingPendent} />
          <UserList title="Sugestões para você" users={suggestUsers} isLoading={isLoadingSuggest} />
        </>
      )}

      {searchedUsers.length === 0 && isSearching && (
        <View style={styles.noResult}>
          <Text style={styles.noResultText}>Nenhum resultado encontrado.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  searchInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 20,
    backgroundColor: "white",
  },
  userGroup: {
    padding: 20,
    backgroundColor: "white",
    rowGap: 5,
    marginBottom: 15,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2 
  },
  loading: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResult:{
    height:100,
    alignItems:'center',
    justifyContent:'center',
  },
  noResultText:{
    fontSize:19,
    fontWeight:'bold'
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
    width: 280
  },
  username: {
    fontSize: 17,
    fontWeight: "900",
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: 'grey'
  }
});