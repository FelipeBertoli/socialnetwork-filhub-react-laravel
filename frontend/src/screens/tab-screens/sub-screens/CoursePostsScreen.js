import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { AddPost, BackButton, Loading, Post } from '../../../../ModuleExports';
import { getCoursePosts } from '../../../../utils/services/PostService';
import AuthContext from '../../../../utils/contexts/AuthContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { followCourse, unfollowCourse, verifyFollowedCourse } from '../../../../utils/services/CourseService';

export default function CoursePostsScreen({ route }) {
    const { user } = useContext(AuthContext);
    const { courseId, courseName } = route.params;
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [page, setPage] = useState(1);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        verifyFollowed();
        loadPosts();
    }, []);

    useEffect(() => {
        setNavBar();
    }, [isFollowing]);

    const setNavBar = () => {
        const displayCourseName = courseName.length > 15 ? courseName.slice(0, 15) + "..." : courseName;
        navigation.setOptions({
            headerLeft: () => (
                <View style={styles.header}>
                    <BackButton />
                    <Text style={styles.headerText}>{displayCourseName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    {isFollowing ? (
                        <TouchableOpacity onPress={handleUnfollow}>
                            <Text style={styles.headerCourse}>Seguindo</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleFollow}>
                            <Text style={styles.headerCourse}>Seguir</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ),
            headerShown: true,
        });
    };

    const loadPosts = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await getCoursePosts({ page, course_id: courseId });
            const fetchedPosts = response.posts || [];
            if (fetchedPosts.length > 0) {
                setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMorePosts(false);
            }
        } catch (error) {
            console.log(error.response?.data?.message || 'Erro ao carregar publicações');
        } finally {
            setLoading(false);
        }
    };

    const verifyFollowed = async () => {
        try {
            const data = await verifyFollowedCourse({ user_id: user.id, course_id: courseId });
            setIsFollowing(data.message === "Curso é seguido");
        } catch (e) {
            console.log(e.response?.data);
        }
    };

    const handleFollow = async () => {
        try {
            await followCourse({ user_id: user.id, course_id: courseId });
            setIsFollowing(true);
        } catch (e) {
            console.log('Erro ao seguir curso: ', e.response);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollowCourse({ user_id: user.id, course_id: courseId });
            setIsFollowing(false);
        } catch (e) {
            console.log('Erro ao desseguir curso: ', e.response?.data?.message);
        }
    };

    const refreshPosts = async () => {
        setRefreshing(true);
        setPage(1);
        setHasMorePosts(true);
        try {
            const response = await getCoursePosts({ page: 1, course_id: courseId });
            setPosts(response.posts);
            setPage(2);
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setRefreshing(false);
        }
    };

    const handleScroll = ({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
            loadPosts();
        }
    };

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };


    return (
        <View style={styles.container}>
            {loading && posts.length === 0 ? (
                <Loading />
            ) : posts.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { fontWeight: '600' }]}>Nenhuma publicação encontrada</Text>
                </View>
            ) : (
                <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshPosts} colors={["#0000ff"]}/>
                }
                >
                    <View style={styles.content}>
                        {posts.map((post, index) => (
                            <Post key={index}
                                userId={post.author.id}
                                userName={`${post.author.name} ${post.author.surname}`}
                                userTitle={post.author.title}
                                userPicture={post.author.picture_path  || ''}
                                courseName={post.course ? post.course.name : ''}
                                postDescription={post.description}
                                postSendTime={post.formatted_send_time}
                                postId={post.id}
                                postPage='CoursePosts' 
                                postMedia={ post.media_path || ''}
                                isLiked={post.isLiked}
                                likeId={post.likeId || ''}
                                isFavorited={post.isFavorited}
                                favoriteId={post.favoriteId || ''}/>
                        ))}
                        {loading && hasMorePosts && (
                            <View style={styles.loadingMoreContainer}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
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
    headerCourse: {
        color: "#FF7600",
        fontSize: 17,
        fontWeight: 'bold',
        paddingRight: 10
    },
    container: {
        flex: 1,
    },
    content: {
        rowGap: 15,
        paddingBottom: 15
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingMoreContainer: {
        paddingVertical: 20,
    },
    emptyContainer: {
        padding: 50,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 20,
        textAlign: 'center',
    },
    link: {
        color: 'blue',
        fontWeight: '600',
    },
});
