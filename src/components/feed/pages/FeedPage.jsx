import { Box, Typography } from "@mui/material";

import { FEED_TEXTS } from "../../../constants";
import { useAuth } from "../../../hooks/useAuth";
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

    const {
        posts,
        loadingPosts,
        loadingMorePosts,
        creatingPost,
        deletingPostId,
        error,
        paginationError,
        pagination,
        loadMorePosts,
        handleCreatePost,
        handleDeletePost,
    } = useFeed({
        mode: "all",
    });

    const {
        content,
        image,
        imagePreview,
        canSubmit,
        handleContentChange,
        handleImageChange,
        removeImage,
        resetForm,
    } = useCreatePostForm();

    const currentUserId = getCurrentUserId(user);

    const submitPost = async () => {
        if (!currentUserId || !canSubmit) return;

        await handleCreatePost({
        userId: currentUserId,
        content,
        image,
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
            imagePreview={imagePreview}
            creatingPost={creatingPost}
            canSubmit={canSubmit}
            onContentChange={handleContentChange}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
            onSubmit={submitPost}
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
            onDeletePost={handleDeletePost}
            onLoadMorePosts={loadMorePosts}
        />
        </main>
    );
    };

export default FeedPage;
