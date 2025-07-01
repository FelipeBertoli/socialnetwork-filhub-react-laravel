import React, { useState, useEffect, useContext, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { AddPost, Loading, Post } from '../../../ModuleExports';
import { getTimeLinePosts } from '../../../utils/services/PostService';
import AuthContext from '../../../utils/contexts/AuthContext';

export default function HomeScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const loadPosts = useCallback(async () => {
        if (loading || !hasMorePosts) return;
    
        setLoading(true);
        try {
            const response = await getTimeLinePosts({ page, id: user.id });
            if (response && response.posts && response.posts.length > 0) {
                setPosts(response.posts);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMorePosts(false);
            }
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMorePosts, page, user.id]);

    const refreshPosts = useCallback(async () => {
        setRefreshing(true);
        setPage(1);
        setHasMorePosts(true);
    
        try {
            const response = await getTimeLinePosts({ page: 1, id: user.id });
            if (response && response.posts) {
                setPosts(prevPosts => {
                    const existingPostIds = new Set(prevPosts.map(post => post.id));
                    const newPosts = response.posts.filter(post => !existingPostIds.has(post.id));
                    return [...newPosts, ...prevPosts]; 
                });
                setPage(2); 
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    }, [user.id]);
    

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

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
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshPosts} colors={["#0000ff"]} />
                    }
                >
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { fontWeight: '600' }]}>Nenhuma publicação encontrada</Text>
                        <Text style={styles.emptyText}>
                            Comece a seguir cursos ou outros usuários.
                        </Text>
                    </View>
                </ScrollView>
            ) : (
                <ScrollView
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refreshPosts} colors={["#0000ff"]} />
                    }
                >
                    <View style={styles.content}>
                        {posts.map((post, index) => (
                            <Post key={index}
                                userId={post.author.id}
                                userName={`${post.author.name} ${post.author.surname}`}
                                userTitle={post.author.title}
                                userPicture={post.author.picture_path  || ''}
                                courseId={post.course ? post.course.id : ''}
                                courseName={post.course ? post.course.name : ''}
                                postId={post.id}
                                postDescription={post.description}
                                postSendTime={post.formatted_send_time} 
                                postMedia={post.media_path || ''}
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
            <AddPost />
        </View>
    );
}

const styles = StyleSheet.create({
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
        fontSize: 17,
        textAlign: 'center',
        flexDirection:'column'
    },
    link: {
        color: 'blue',
        fontWeight: '600',
        fontSize: 17,
    },
});
