import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    FEED_MODES,
    FEED_POST_TYPES,
    FEED_QUERY_PARAMS,
    FEED_TEXTS,
} from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
import { useFeedRefresh } from "../../../hooks/useFeedRefresh";
import { FeedIntentFilter } from "../components/FeedIntentFilter";
import { FeedModeSelector } from "../components/FeedModeSelector";
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
    const [searchParams] = useSearchParams();
    const feedRefresh = useFeedRefresh();
    const [selectedFeedMode, setSelectedFeedMode] = useState(FEED_MODES.FOLLOWING);
    const [selectedPostType, setSelectedPostType] = useState(FEED_POST_TYPES.ALL);
    const activePostType =
        selectedPostType === FEED_POST_TYPES.ALL ? null : selectedPostType;
    const currentUserId = getCurrentUserId(user);
    const highlightedPostId = searchParams.get(FEED_QUERY_PARAMS.POST_ID);

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
        handleUpdatePost,
        handleTogglePinnedPost,
        savedPosts,
    } = useFeed({
        currentUserId,
        mode: selectedFeedMode,
        postType: activePostType,
        highlightedPostId,
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

    const emptyTitle =
        selectedFeedMode === FEED_MODES.FOLLOWING
            ? FEED_TEXTS.POSTS.FOLLOWING_EMPTY_TITLE
            : FEED_TEXTS.POSTS.EMPTY_TITLE;

    const emptyDescription =
        selectedFeedMode === FEED_MODES.FOLLOWING
            ? FEED_TEXTS.POSTS.FOLLOWING_EMPTY_DESCRIPTION
            : FEED_TEXTS.POSTS.EMPTY_DESCRIPTION;

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

        <FeedModeSelector
            selectedMode={selectedFeedMode}
            onSelectMode={setSelectedFeedMode}
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
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            withSuggestions={selectedFeedMode === FEED_MODES.FOLLOWING}
            onDeletePost={handleDeletePost}
            onLoadMorePosts={loadMorePosts}
            onUpdatePost={handleUpdatePost}
            onTogglePinnedPost={handleTogglePinnedPost}
            onToggleSavedPost={savedPosts.toggleSavedPost}
            savedPosts={savedPosts}
            highlightedPostId={highlightedPostId}
        />
        </main>
    );
    };

export default FeedPage;
