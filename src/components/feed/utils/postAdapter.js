import { FEED_TEXTS } from "../../../constants";

export const getPostId = (post) => {
    return post?.id ?? post?.postId ?? post?.postid ?? post?._id;
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