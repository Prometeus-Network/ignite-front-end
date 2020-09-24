import React from "react";
import { inject, observer } from "mobx-react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    IconButton,
    makeStyles
} from "@material-ui/core";

import { ReCaptcha } from "../../components/ReCaptcha";
import { ModalCloseIcon } from "../../icons/ModalCloseIcon";
import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    memezatorDialog: {
        position: "relative",
        padding: "32px"
    },
    memezatorDialogCloseBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "40px",
        height: "40px",
        margin: "8px",
        lineHeight: 0
    },
    memezatorDialogTitle: {
        marginTop: "8px",
        marginBottom: "24px",
        padding: 0,
        textAlign: "center",

        "& h2": {
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.palette.text.main,
            marginBottom: 0
        }
    },
    memezatorDialogContent: {
        marginBottom: "24px",
        padding: 0,
        textAlign: "center",

        "& p": {
            margin: 0,
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "26px",
            color: theme.palette.text.main
        }
    },
    dialogActionsButton: {
        padding: 0
    },
    memezatorDialogButton: {
        display: "block",
        height: "40px",
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "18px",
        minWidth: "115px",
        margin: "0 auto"
    },
    dialogPaper: {
        margin: "15px",
        maxWidth: "370px",
        width: "100%"
    }
}));

const _MemezatorCaptchaDialog = ({
    captchaToken,
    captchaDialogOpen,
    setCaptchaDialogOpen,
    setCaptchaToken,
    createStatus,
    l
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={captchaDialogOpen}
            onClose={() => setCaptchaDialogOpen(false)}
            classes={{
                paper: classes.dialogPaper
            }}
        >
            <div className={classes.memezatorDialog}>
                <IconButton
                    onClick={() => setCaptchaDialogOpen(false)}
                    className={classes.memezatorDialogCloseBtn}
                >
                    <ModalCloseIcon />
                </IconButton>
                <DialogTitle className={classes.memezatorDialogTitle}>
                    {l('dialog.captcha')}
                </DialogTitle>
                <DialogContent className={classes.memezatorDialogContent}>
                    <DialogContentText>
                        <ReCaptcha onChange={setCaptchaToken} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActionsButton}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.memezatorDialogButton}
                        onClick={() => {
                            createStatus(true);
                            setCaptchaDialogOpen(false);
                        }}
                        disabled={!captchaToken}
                    >
                        {l("dialog.ok")}
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

const mapMobxToProps = ({ createStatus }) => ({
    captchaToken: createStatus.captchaToken,
    captchaDialogOpen: createStatus.captchaDialogOpen,
    setCaptchaDialogOpen: createStatus.setCaptchaDialogOpen,
    setCaptchaToken: createStatus.setCaptchaToken,
    createStatus: createStatus.createStatus
});

export const MemezatorCaptchaDialog = localized(
    inject(mapMobxToProps)(observer(_MemezatorCaptchaDialog))
);
