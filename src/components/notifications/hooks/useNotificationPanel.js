import { useCallback, useState } from "react";

export const useNotificationPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPanel = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closePanel = useCallback(() => {
        setIsOpen(false);
    }, []);

    const togglePanel = useCallback(() => {
        setIsOpen((currentIsOpen) => !currentIsOpen);
    }, []);

    return {
        isOpen,
        openPanel,
        closePanel,
        togglePanel,
    };
};
