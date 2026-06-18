import { FEED_TEXTS } from "../../../constants";

export const getPostId = (post) => {
    return post?.id ?? post?.postId ?? post?.postid ?? post?.post_id ?? post?._id;
};

export const getPostOwnerId = (post) => {
    return (
        post?.userId ??
        post?.userid ??
        post?.user_id ??
        post?.authorId ??
        post?.user?.id ??
        post?.user?.userid
    );
};

export const getPostContent = (post) => {
    return post?.content ?? post?.description ?? post?.text ?? post?.body ?? "";
};

export const getPostImage = (post) => {
    return (
        post?.imageUrl ??
        post?.image_url ??
        post?.image ??
        post?.photo ??
        post?.urlImage ??
        post?.secure_url ??
        ""
    );
};

export const getPostAuthorName = (post) => {
    return (
        post?.user?.name ??
        post?.user?.username ??
        post?.user?.email ??
        post?.username ??
        post?.name ??
        post?.email ??
        FEED_TEXTS.POSTS.DEFAULT_AUTHOR
    );
};

export const getPostAuthorEmail = (post) => {
    return post?.user?.email ?? post?.email ?? "";
};

export const getPostCreatedAt = (post) => {
     return post?.createdAt ?? post?.created_at ?? post?.date ?? null;
};

export const formatPostDate = (date) => {
    if (!date) return FEED_TEXTS.POSTS.DATE_FALLBACK;

    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

const extractArray = (value) => {
    if (Array.isArray(value)) return value;

    if (Array.isArray(value?.data)) return value.data;
    if (Array.isArray(value?.comments)) return value.comments;
    if (Array.isArray(value?.results)) return value.results;
    if (Array.isArray(value?.items)) return value.items;

    return [];
};

export const getPostComments = (post) => {
    return extractArray(
        post?.comments ??
        post?.postComments ??
        post?.post_comments ??
        post?.commentList ??
        post?.commentsData
    );
};

export const getCommentsFromResponse = (response) => {
    const payload = response?.data?.data ?? response?.data;

    return extractArray(payload);
};

export const getPostsFromResponse = (response) => {
    const responseData = response?.data;
    const posts = extractArray(responseData);
    const meta = responseData?.meta ?? {};

    return {
        posts,
        meta: {
        page: meta.page,
        limit: meta.limit,
        total: meta.total,
        totalPages: meta.totalPages,
        },
    };
};

export const getCommentId = (comment) => {
    return (
        comment?.id ??
        comment?.commentId ??
        comment?.commentid ??
        comment?.comment_id ??
        comment?._id
    );
};

export const getCommentAuthorName = (comment) => {
    return (
        comment?.user?.name ??
        comment?.user?.username ??
        comment?.user?.email ??
        comment?.author?.name ??
        comment?.author?.username ??
        comment?.authorName ??
        comment?.username ??
        comment?.name ??
        comment?.email ??
        FEED_TEXTS.COMMENTS.DEFAULT_AUTHOR
    );
};

export const getCommentContent = (comment) => {
    return (
        comment?.content ??
        comment?.comment_text ??
        comment?.commentText ??
        comment?.description ??
        comment?.text ??
        comment?.body ??
        comment?.message ??
        ""
    );
};

export const getCommentCreatedAt = (comment) => {
    return comment?.createdAt ?? comment?.created_at ?? comment?.date ?? null;
};

export const formatCommentDate = (date) => {
    if (!date) return FEED_TEXTS.COMMENTS.DATE_FALLBACK;

    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};
