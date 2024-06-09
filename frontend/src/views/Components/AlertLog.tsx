import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material'
import React from "react";

import {AlertAndLoad} from '../../utils/Interface/GlobalComponents/AlertAndLoad'

interface alertProps {
    AlertLog: boolean
    AlertTitle: string
    AlertMsg: string
    AlertLogClose: Function
}


const AlertLog = (props: alertProps) => {
    const {AlertLog, AlertTitle, AlertMsg, AlertLogClose} = props
    return (
        <Dialog
            open={AlertLog}
            onClose={(e) => AlertLogClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                zIndex: "9999",
            }}
        >
            <DialogTitle id="alert-dialog-title">
                {AlertTitle || "通知"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {AlertMsg || "無訊息"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => AlertLogClose()}>好</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertLog
