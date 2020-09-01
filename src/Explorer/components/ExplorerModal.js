import React from "react";
import { observer } from "mobx-react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    Table,
    TableBody,
    TableRow,
    TableCell,
    makeStyles
} from "@material-ui/core";

import { useStore, useLocalization } from "../../store";

const useStyles = makeStyles(theme => ({
    explorerDialog: {
        padding: "52px 32px"
    },
    explorerDialogTitle: {
        textAlign: "center",
        marginBottom: "24px",
        padding: 0,

        "& h2": {
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.palette.text.main,
            marginBottom: 0
        }
    },
    explorerDialogContent: {
        marginBottom: "24px",
        padding: 0,

        "& p": {
            margin: 0,
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "26px",
            color: theme.palette.text.main
        }
    },
    dialogActionsButton: {
        padding: 0,
        textAlign: "center",
        display: "block"
    },
    okButton: {
        height: "40px",
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "18px",
        borderRadius: 30,
        width: "146px"
    },
    dialogPaper: {
        margin: "15px",
        width: "100%",
        maxWidth: "775px"
    },
    tableRowTitle: {
        fontWeight: 600,
        fontSize: "16px"
    },
    link: {
        color: theme.palette.primary.main
    }
}));

const setContent = (classes, type, data, l) => {
    switch (type) {
        case "ethereum-plasma":
            return (
                <>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.txnId")}
                        </TableCell>
                        <TableCell>{data.transactionHash}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.age")}
                        </TableCell>
                        <TableCell>{data.ago}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.node-wallet")}
                        </TableCell>
                        <TableCell>{data.address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.cid")}
                        </TableCell>
                        <TableCell>{data.btfsCid}</TableCell>
                    </TableRow>
                </>
            );
        case "distributed-storage":
            return (
                <>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.cid")}
                        </TableCell>
                        <TableCell>{data.btfsCid}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.age")}
                        </TableCell>
                        <TableCell>{data.ago}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.arweave-link")}
                        </TableCell>
                        <TableCell>
                            <a
                                href={`https://arweave.net/${data.btfsCid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.link}
                            >
                                {`https://arweave.net/${data.btfsCid}`}
                            </a>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.node-wallet")}
                        </TableCell>
                        <TableCell>{data.address}</TableCell>
                    </TableRow>
                </>
            );
        case "binance-smart-chain":
            return (
                <>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.txnId")}
                        </TableCell>
                        <TableCell>{data.transactionHash}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.block")}
                        </TableCell>
                        <TableCell>{data.fullTransactionData.blockNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.age")}
                        </TableCell>
                        <TableCell>{data.ago}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.from")}
                        </TableCell>
                        <TableCell>{data.fullTransactionData.from}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.to")}
                        </TableCell>
                        <TableCell>{data.fullTransactionData.to}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.cid")}
                        </TableCell>
                        <TableCell>{data.btfsCid}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.tableRowTitle}>
                            {l("explorer.value")}
                        </TableCell>
                        <TableCell>{data.value}</TableCell>
                    </TableRow>
                </>
            );
        default:
            return null;
    }
};

export const ExplorerModal = observer(() => {
    const classes = useStyles();
    const {
        modalIsOpen,
        modalDetails,
        typeDetails,
        setModalIsOpen
    } = useStore().explorer;
    const { l } = useLocalization();

    return (
        <Dialog
            open={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            classes={{
                paper: classes.dialogPaper
            }}
        >
            <div className={classes.explorerDialog}>
                <DialogTitle className={classes.explorerDialogTitle}>
                    {l("explorer.modal.details")}
                </DialogTitle>
                <DialogContent className={classes.explorerDialogContent}>
                    <DialogContentText>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {setContent(classes, typeDetails, modalDetails, l)}
                            </TableBody>
                        </Table>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActionsButton}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.okButton}
                        onClick={() => {
                            setModalIsOpen(false);
                        }}
                    >
                        {l("explorer.modal.ok")}
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
});
