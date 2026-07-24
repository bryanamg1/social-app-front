import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { Button } from "@mui/material";

import { REPORT_TEXTS } from "../../../constants";
import { ReportDialog } from "../../reports/components/ReportDialog";

export function ProfileReportButton({ reportAction }) {
    if (!reportAction?.isVisible) return null;

    return (
        <>
            <Button
                variant="outlined"
                color="warning"
                startIcon={<FlagOutlinedIcon />}
                disabled={reportAction.report.submitting}
                onClick={reportAction.report.openDialog}
            >
                {REPORT_TEXTS.BUTTON}
            </Button>

            <ReportDialog report={reportAction.report} />
        </>
    );
}
