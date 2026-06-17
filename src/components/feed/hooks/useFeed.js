import { useCallback, useEffect, useState } from "react";

import { FEED_TEXTS } from "../../../constants";
import {
  createPost,
  getAllPosts,
  getFollowingFeed,
  removePost,
} from "../services/feedService";
import { getPostId } from "../utils/postAdapter";

export const useFeed = ({ mode = "all" } = {}) => {
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [creatingPost, setCreatingPost] = useState(false);
    const [deletingPostId, setDeletingPostId] = useState(null);
    const [error, setError] = useState(null);

    const loadPosts = useCallback(async () => {
        try {
        setLoadingPosts(true);
        setError(null);

        const postsData =
            mode === "following" ? await getFollowingFeed() : await getAllPosts();

        setPosts(postsData);
        } catch (error) {
        setError(FEED_TEXTS.ERRORS.LOAD_POSTS);
        } finally {
        setLoadingPosts(false);
        }
    }, [mode]);

    const handleCreatePost = async ({ userId, content, image }) => {
        try {
        setCreatingPost(true);
        setError(null);

        await createPost({
            userId,
            content,
            image,
        });

        await loadPosts();
        } catch (error) {
        setError(FEED_TEXTS.ERRORS.CREATE_POST);
        } finally {
        setCreatingPost(false);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
        setDeletingPostId(postId);
        setError(null);

        await removePost(postId);

        setPosts((currentPosts) =>
            currentPosts.filter((post) => String(getPostId(post)) !== String(postId))
        );
        } catch (error) {
        setError(FEED_TEXTS.ERRORS.DELETE_POST);
        } finally {
        setDeletingPostId(null);
        }
    };

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    return {
        posts,
        loadingPosts,
        creatingPost,
        deletingPostId,
        error,
        loadPosts,
        handleCreatePost,
        handleDeletePost,
    };
};