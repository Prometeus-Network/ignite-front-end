import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import {
    Dialog,
    DialogContent,
    Button,
    Typography,
    makeStyles,
    withMobileDialog
} from "@material-ui/core";

import {
    CustomDialogTitle,
    _Checkbox as Checkbox
} from "../../Authorization/components";
import { CopyToClipboardButton } from "../../components";
import { ArrowRightIcon } from "../../icons/ArrowRightIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        maxWidth: "650px",
        width: "100%"
    },
    dialogContent: {
        [theme.breakpoints.down("sm")]: {
            padding: "24px 12px"
        }
    },
    buyVotingPowerForm: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        "& input": {
            boxSizing: "border-box",
            fontFamily: "Museo Sans Cyrl Regular",
            width: "100%",
            height: "40px",
            borderRadius: "30px",
            outline: 0,
            border: "2px solid #f1ebe8",
            padding: "11px 20px",
            fontSize: "15px",
            fontWeight: "bold",
            [theme.breakpoints.down("xs")]: {
                borderWidth: "1px",
                height: "30px",
                fontSize: "13px"
            }
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "20px"
        }
    },
    buyVotingPowerArrow: {
        margin: "0 24px",
        minWidth: "24px",
        [theme.breakpoints.down("xs")]: {
            margin: "0 8px",
            minWidth: "20px"
        }
    },
    buyVotingPowerFormCaption: {
        "& p": {
            fontSize: "15px",
            [theme.breakpoints.down("xs")]: {
                fontSize: "13px"
            }
        }
    },
    buyVotingPowerFormImportant: {
        margin: "16px 0 24px",
        "& > p": {
            fontWeight: "bold"
        }
    },
    buyVotingPowerButton: {
        height: "40px",
        width: "170px",
        fontWeight: "bold"
    },
    buyVotingPowerHashCaption: {
        fontSize: "15px",
        marginBottom: "6px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "13px"
        }
    },
    buyVotingPowerHashWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buyVotingPowerHash: {
        fontSize: "18px",
        fontWeight: "bold",
        marginRight: "16px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        [theme.breakpoints.down("xs")]: {
            fontSize: "15px"
        }
    },
    buyVotingPowerCodeWrapper: {
        textAlign: "center"
    },
    buyVotingPowerConfirmTransaction: {
        justifyContent: "center",
        marginBottom: "32px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: "28px"
        }
    },
    buyVotingPowerButtonsWrapper: {
        display: "flex",
        justifyContent: "center",
        "& button": {
            fontWeight: "bold",
            height: "40px",
            maxWidth: "130px",
            width: "100%",
            "&:first-child": {
                marginRight: "24px"
            }
        }
    }
}));

const BuyVotingPowerForm = ({
    classes,
    tokens,
    quantity,
    setFormValueTokens,
    setFormValueQuantity,
    buyVotingPower
}) => {
    return (
        <div>
            <div className={classes.buyVotingPowerForm}>
                <input
                    type="number"
                    min="0"
                    value={tokens}
                    onChange={e => setFormValueTokens(e.target.value)}
                    placeholder="PROM Tokens"
                />
                <ArrowRightIcon className={classes.buyVotingPowerArrow} />
                <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={e => setFormValueQuantity(e.target.value)}
                    placeholder="VP quantity"
                />
            </div>
            <div className={classes.buyVotingPowerFormCaption}>
                <Typography color="textSecondary">
                    Current Price for voting power is 1 PROM for 1000 VP.
                </Typography>
                <Typography
                    classes={{
                        root: classes.buyVotingPowerFormImportant
                    }}
                    color="textSecondary"
                >
                    <Typography color="primary" display="inline">
                        IMPORTANT:
                    </Typography>{" "}
                    Please make a transaction using ONLY your Ignite account wallet.
                    Otherwise it will be unable to track your transaction.
                </Typography>
            </div>
            <Button
                classes={{ root: classes.buyVotingPowerButton }}
                onClick={buyVotingPower}
                color="primary"
                variant="contained"
                size="large"
            >
                Buy
            </Button>
        </div>
    );
};

const BuyVotingPowerCode = ({
    classes,
    setBuyVotingPowerDialogOpen,
    fetchConfirmTransaction
}) => {
    const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);

    return (
        <div>
            <Typography
                classes={{ root: classes.buyVotingPowerHashCaption }}
                color="textSecondary"
            >
                Please send (n) Prom to this walllet:
            </Typography>
            <div className={classes.buyVotingPowerHashWrapper}>
                <Typography classes={{ root: classes.buyVotingPowerHash }}>
                    0x47E7B12A86869750a9c1bE2e62b0FA22d7e35b77
                </Typography>
                <CopyToClipboardButton
                    textToCopy="0x47E7B12A86869750a9c1bE2e62b0FA22d7e35b77"
                    darkTooltip
                >
                    <Button color="primary" variant="outlined">
                        <LinkIcon />
                    </Button>
                </CopyToClipboardButton>
            </div>
            <div className={classes.buyVotingPowerCodeWrapper}>
                <img src="https://chart.apis.google.com/chart?choe=UTF-8&chld=H&cht=qr&chs=200x200&chl=0x47E7B12A86869750a9c1bE2e62b0FA22d7e35b77" />
            </div>
            <Checkbox
                checked={checkboxIsChecked}
                onChange={setCheckboxIsChecked}
                className={classes.buyVotingPowerConfirmTransaction}
            >
                <Typography>I confirm that I made a transaction</Typography>
            </Checkbox>
            <div className={classes.buyVotingPowerButtonsWrapper}>
                <Button
                    onClick={fetchConfirmTransaction}
                    disabled={!checkboxIsChecked}
                    color="primary"
                    variant="contained"
                    size="large"
                >
                    OK
                </Button>
                <Button
                    onClick={() => setBuyVotingPowerDialogOpen(false)}
                    color="primary"
                    variant="outlined"
                    size="large"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

const _MemezatorBuyVotingPowerDialog = ({
    buyVotingPowerForm,
    buyVotingPowerDialogOpen,
    buyVotingPowerVisibleCode,
    setFormValueTokens,
    setFormValueQuantity,
    setBuyVotingPowerDialogOpen,
    buyVotingPower,
    fetchConfirmTransaction,
    fullScreen,
    l
}) => {
    const classes = useStyles();

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            onClose={() => setBuyVotingPowerDialogOpen(false)}
            open={buyVotingPowerDialogOpen}
            fullScreen={fullScreen}
        >
            <CustomDialogTitle
                title="Buy Voting Power"
                type="default"
                setDialogOpen={setBuyVotingPowerDialogOpen}
            />
            <DialogContent classes={{ root: classes.dialogContent }}>
                {!buyVotingPowerVisibleCode ? (
                    <BuyVotingPowerForm
                        classes={classes}
                        setFormValueTokens={setFormValueTokens}
                        setFormValueQuantity={setFormValueQuantity}
                        buyVotingPower={buyVotingPower}
                        {...buyVotingPowerForm}
                    />
                ) : (
                    <BuyVotingPowerCode
                        classes={classes}
                        setBuyVotingPowerDialogOpen={setBuyVotingPowerDialogOpen}
                        fetchConfirmTransaction={fetchConfirmTransaction}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

const mapMobxToProps = ({ memezatorVotingPower }) => ({
    buyVotingPowerForm: memezatorVotingPower.buyVotingPowerForm,
    buyVotingPowerDialogOpen: memezatorVotingPower.buyVotingPowerDialogOpen,
    buyVotingPowerVisibleCode: memezatorVotingPower.buyVotingPowerVisibleCode,
    setFormValueTokens: memezatorVotingPower.setFormValueTokens,
    setFormValueQuantity: memezatorVotingPower.setFormValueQuantity,
    setBuyVotingPowerDialogOpen: memezatorVotingPower.setBuyVotingPowerDialogOpen,
    buyVotingPower: memezatorVotingPower.buyVotingPower,
    fetchConfirmTransaction: memezatorVotingPower.fetchConfirmTransaction
});

export const MemezatorBuyVotingPowerDialog = localized(
    withMobileDialog({ breakpoint: "xs" })(
        inject(mapMobxToProps)(observer(_MemezatorBuyVotingPowerDialog))
    )
);
