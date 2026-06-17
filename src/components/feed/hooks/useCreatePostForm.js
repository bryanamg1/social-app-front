import { useEffect, useState } from "react";

export const useCreatePostForm = () => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

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

    const removeImage = () => {
        setImage(null);
        setImagePreview("");
    };

    const resetForm = () => {
        setContent("");
        setImage(null);
        setImagePreview("");
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
        canSubmit,
        handleContentChange,
        handleImageChange,
        removeImage,
        resetForm,
    };
};