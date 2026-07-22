import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { FEED_MODES, FEED_POST_TYPES, FEED_TEXTS } from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { useFeedRefresh } from "../../../hooks/useFeedRefresh";
import { FeedIntentFilter } from "../components/FeedIntentFilter";
import { PostComposer } from "../components/PostComposer";
import { PostList } from "../components/PostList";
import { useCreatePostForm } from "../hooks/useCreatePostForm";
import { useFeed } from "../hooks/useFeed";

import styles from "../styles/FeedPage.module.css";

const getCurrentUserId = (user) => {
    return user?.id ?? user?.userId ?? user?.userid ?? user?.user_id ?? user?._id;
};

const FeedPage = () => {
    const { user } = useAuth();
    const { suggestionsState } = useOutletContext();
    const feedRefresh = useFeedRefresh();
    const [selectedPostType, setSelectedPostType] = useState(FEED_POST_TYPES.ALL);
    const activePostType =
        selectedPostType === FEED_POST_TYPES.ALL ? null : selectedPostType;

    const {
        posts,
        loadingPosts,
        loadingMorePosts,
        creatingPost,
        deletingPostId,
        error,
        paginationError,
        pagination,
        refreshFeed,
        loadMorePosts,
        handleCreatePost,
        handleDeletePost,
    } = useFeed({
        mode: FEED_MODES.FOLLOWING,
        postType: activePostType,
    });

    const {
        content,
        image,
        imagePreview,
        postType,
        canSubmit,
        handleContentChange,
        handleImageChange,
        handlePostTypeChange,
        removeImage,
        resetForm,
    } = useCreatePostForm();

    const currentUserId = getCurrentUserId(user);

    useEffect(() => {
        return feedRefresh.registerRefreshHandler(refreshFeed);
    }, [feedRefresh, refreshFeed]);

    const submitPost = async () => {
        if (!currentUserId || !canSubmit) return;

        await handleCreatePost({
        userId: currentUserId,
        content,
        image,
        postType,
        });

        resetForm();
    };

    return (
        <main className={styles.feedPage}>
        <Box className={styles.feedHeader}>
            <Typography variant="h5" className={styles.feedTitle}>
            {FEED_TEXTS.HEADER.TITLE}
            </Typography>

            <Typography className={styles.feedSubtitle}>
            {FEED_TEXTS.HEADER.SUBTITLE}
            </Typography>
        </Box>

        <PostComposer
            user={user}
            content={content}
            postType={postType}
            imagePreview={imagePreview}
            creatingPost={creatingPost}
            canSubmit={canSubmit}
            onContentChange={handleContentChange}
            onPostTypeChange={handlePostTypeChange}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
            onSubmit={submitPost}
        />

        <FeedIntentFilter
            selectedPostType={selectedPostType}
            onSelectPostType={setSelectedPostType}
        />

        <PostList
            posts={posts}
            currentUser={user}
            currentUserId={currentUserId}
            loadingPosts={loadingPosts}
            loadingMorePosts={loadingMorePosts}
            deletingPostId={deletingPostId}
            error={error}
            paginationError={paginationError}
            hasMore={pagination.hasMore}
            emptyTitle={FEED_TEXTS.POSTS.FOLLOWING_EMPTY_TITLE}
            emptyDescription={FEED_TEXTS.POSTS.FOLLOWING_EMPTY_DESCRIPTION}
            suggestionsState={suggestionsState}
            onDeletePost={handleDeletePost}
            onLoadMorePosts={loadMorePosts}
        />
        </main>
    );
    };

export default FeedPage;
