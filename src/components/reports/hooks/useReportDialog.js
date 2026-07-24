import { useEffect, useMemo, useState } from "react";

import {
    REPORT_REASON_CODES,
    REPORT_TEXTS,
    UI_FEEDBACK,
} from "../../../constants";
import { createReport } from "../services/reportService";

const INITIAL_FORM = {
    reasonCode: REPORT_REASON_CODES.SPAM,
    details: "",
};

export const useReportDialog = ({
    targetType,
    targetId,
    enabled = true,
}) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const targetLabel = useMemo(() => {
        return REPORT_TEXTS.TARGET_LABELS[targetType] ?? REPORT_TEXTS.BUTTON;
    }, [targetType]);

    useEffect(() => {
        if (!message && !error) return undefined;

        const timeoutId = window.setTimeout(() => {
            setMessage(null);
            setError(null);
        }, UI_FEEDBACK.AUTO_HIDE_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [error, message]);

    const openDialog = () => {
        if (!enabled) return;
        setError(null);
        setOpen(true);
    };

    const closeDialog = () => {
        if (submitting) return;
        setOpen(false);
    };

    const handleFieldChange = (field, value) => {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    };

    const submit = async () => {
        if (!enabled || !targetType || !targetId) return;

        if (!form.reasonCode) {
            setError(REPORT_TEXTS.ERRORS.INVALID);
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const response = await createReport({
                targetType,
                targetId,
                reasonCode: form.reasonCode,
                details: form.details,
            });
            const statusCode = response?.status ?? null;

            setMessage(
                statusCode === 201
                    ? REPORT_TEXTS.SUCCESS
                    : REPORT_TEXTS.DUPLICATE_SUCCESS
            );
            setForm(INITIAL_FORM);
            setOpen(false);
        } catch {
            setError(REPORT_TEXTS.ERRORS.CREATE);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        open,
        form,
        submitting,
        error,
        message,
        targetLabel,
        openDialog,
        closeDialog,
        onFieldChange: handleFieldChange,
        onSubmit: submit,
    };
};
