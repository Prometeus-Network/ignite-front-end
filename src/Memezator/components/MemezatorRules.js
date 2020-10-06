import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Grid, Typography, Button, Link, makeStyles } from "@material-ui/core";

import { localized } from "../../localization/components";
import { DetailsIcon } from "../../icons/DetailsIcon";
import rulesPattern from "../../images/memezator-rules-pattern.jpg";
import rules from "../../images/documents/Introducing Memezator.pdf";

const useStyles = makeStyles(theme => ({
    memezatorRulesWrapper: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        padding: "16px 18px",
        color: "#1C1C1C",
        background: `url(${rulesPattern})`,
        [theme.breakpoints.down("sm")]: {
            borderLeft: "unset",
            borderRight: "unset",
            borderRadius: 0
        }
    },
    memezatorRulesHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "9px",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "16px"
        }
    },
    memezatorRulesTitle: {
        fontSize: "20px",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            fontSize: "16px"
        }
    },
    memezatorRulesPowerWrapper: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("355")]: {
            display: "block"
        }
    },
    memezatorRulesPowerInner: {
        marginRight: "14px",
        [theme.breakpoints.down("355")]: {
            marginRight: "0px",
            marginBottom: "6px",
            textAlign: "right"
        }
    },
    memezatorRulesPowerText: {
        fontSize: "15px",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px"
        }
    },
    memezatorRulesPowerButton: {
        background: "#fff",
        minWidth: "85px",
        height: "24px",
        fontSize: "13px",
        padding: 0,
        [theme.breakpoints.down("sm")]: {
            display: "block",
            height: "28px",
            fontSize: "12px",
            marginLeft: "auto"
        }
    },
    memezatorRulesContent: {
        marginBottom: "12px"
    },
    memezatorRulesParagraph: {
        fontSize: "15px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px"
        }
    },
    memezatorRulesNotes: {
        fontSize: "15px",
        margin: "10px 0",
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px"
        }
    },
    memezatorRulesAction: {
        textAlign: "right"
    },
    memezatorRulesActionBtn: {
        background: "#fff",
        height: "24px",
        minWidth: "56px",
        [theme.breakpoints.down("sm")]: {
            height: "28px"
        }
    }
}));

const _MemezatorRules = ({
    currentUser,
    actionRights,
    setBuyVotingPowerDialogOpen,
    l
}) => {
    const classes = useStyles();
    const [showRules, setShowRules] = useState(false);

    return (
        <Grid item xs={12} className={classes.memezatorRulesWrapper}>
            <div className={classes.memezatorRulesHeader}>
                <Typography
                    classes={{ root: classes.memezatorRulesTitle }}
                    variant="h5"
                >
                    {l("memezator.rules")}
                </Typography>
                {currentUser && (
                    <div className={classes.memezatorRulesPowerWrapper}>
                        <div className={classes.memezatorRulesPowerInner}>
                            <Typography
                                classes={{ root: classes.memezatorRulesPowerText }}
                                variant="h6"
                            >
                                {l("memezator.voting-power")}:{" "}
                                {actionRights && actionRights.voting_power
                                    ? actionRights.voting_power
                                    : 0}
                            </Typography>
                            <Typography
                                classes={{ root: classes.memezatorRulesPowerText }}
                                variant="h6"
                            >
                                {l("memezator.tokens")}:{" "}
                                {actionRights && actionRights.eth_prom_tokens
                                    ? Number(actionRights.eth_prom_tokens).toFixed(2)
                                    : "0.00"}
                            </Typography>
                        </div>
                        <Button
                            classes={{ root: classes.memezatorRulesPowerButton }}
                            color="primary"
                            variant="outlined"
                            onClick={() => setBuyVotingPowerDialogOpen(true)}
                        >
                            Buy Power
                        </Button>
                    </div>
                )}
            </div>
            <div className={classes.memezatorRulesContent}>
                <Typography classes={{ root: classes.memezatorRulesNotes }}>
                    {l("memezator.rules-list.note-top")}
                </Typography>
                {l("memezator.rules-list").map((rule, index) => (
                    <Typography
                        key={index}
                        classes={{ root: classes.memezatorRulesParagraph }}
                    >
                        <b>{index + 1}.</b> {rule}
                    </Typography>
                ))}
                {showRules &&
                    l("memezator.rules-list-hidden").map((rule, index) =>
                        index !== l("memezator.rules-list-hidden").length - 1 ? (
                            <Typography
                                key={index}
                                classes={{
                                    root: classes.memezatorRulesParagraph
                                }}
                            >
                                <b>
                                    {l("memezator.rules-list").length + index + 1}.
                                </b>{" "}
                                {rule}
                            </Typography>
                        ) : (
                            <Typography
                                key={index}
                                classes={{
                                    root: classes.memezatorRulesParagraph
                                }}
                            >
                                <b>
                                    {l("memezator.rules-list").length + index + 1}.
                                </b>{" "}
                                {rule}
                                <Link
                                    href={rules}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    rules
                                </Link>
                            </Typography>
                        )
                    )}
            </div>
            <div className={classes.memezatorRulesAction}>
                <Button
                    classes={{ root: classes.memezatorRulesActionBtn }}
                    color="primary"
                    variant="outlined"
                    onClick={() => setShowRules(!showRules)}
                >
                    <DetailsIcon />
                </Button>
            </div>
        </Grid>
    );
};

const mapMobxToProps = ({
    authorization,
    memezatorActions,
    memezatorVotingPower
}) => ({
    currentUser: authorization.currentUser,
    actionRights: memezatorActions.actionRights,
    setBuyVotingPowerDialogOpen: memezatorVotingPower.setBuyVotingPowerDialogOpen
});

export const MemezatorRules = localized(
    inject(mapMobxToProps)(observer(_MemezatorRules))
);
