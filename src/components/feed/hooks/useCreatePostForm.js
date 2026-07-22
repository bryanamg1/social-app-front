import { useEffect, useState } from "react";
import { FEED_POST_TYPES } from "../../../constants";

export const useCreatePostForm = () => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [postType, setPostType] = useState(FEED_POST_TYPES.PERSONAL_UPDATE);

    const hasContent = content.trim().length > 0;
    const canSubmit = hasContent || Boolean(image);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files?.[0];

        if (!selectedImage) return;

        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handlePostTypeChange = (event) => {
        setPostType(event.target.value);
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview("");
    };

    const resetForm = () => {
        setContent("");
        setImage(null);
        setImagePreview("");
        setPostType(FEED_POST_TYPES.PERSONAL_UPDATE);
    };

    useEffect(() => {
        return () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        };
    }, [imagePreview]);

    return {
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
    };
};
