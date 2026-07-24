import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { REPORT_REASON_OPTIONS, REPORT_TEXTS } from "../../../constants";

export function ReportDialog({ report }) {
    return (
        <>
            {report.message ? (
                <Alert severity="success">{report.message}</Alert>
            ) : null}

            <Dialog open={report.open} onClose={report.closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>{REPORT_TEXTS.DIALOG_TITLE}</DialogTitle>

                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <Typography color="text.secondary">
                            {REPORT_TEXTS.DIALOG_DESCRIPTION}
                        </Typography>

                        {report.error ? (
                            <Alert severity="error">{report.error}</Alert>
                        ) : null}

                        <FormControl fullWidth>
                            <InputLabel id="report-reason-label">
                                {REPORT_TEXTS.REASON_LABEL}
                            </InputLabel>
                            <Select
                                labelId="report-reason-label"
                                value={report.form.reasonCode}
                                label={REPORT_TEXTS.REASON_LABEL}
                                onChange={(event) =>
                                    report.onFieldChange("reasonCode", event.target.value)
                                }
                            >
                                {REPORT_REASON_OPTIONS.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            multiline
                            minRows={4}
                            value={report.form.details}
                            label={REPORT_TEXTS.DETAILS_LABEL}
                            placeholder={REPORT_TEXTS.DETAILS_PLACEHOLDER}
                            onChange={(event) =>
                                report.onFieldChange("details", event.target.value)
                            }
                        />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={report.closeDialog} disabled={report.submitting}>
                        {REPORT_TEXTS.CANCEL_BUTTON}
                    </Button>

                    <Button
                        variant="contained"
                        onClick={report.onSubmit}
                        disabled={report.submitting}
                    >
                        {report.submitting
                            ? REPORT_TEXTS.SUBMITTING_BUTTON
                            : REPORT_TEXTS.SUBMIT_BUTTON}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
