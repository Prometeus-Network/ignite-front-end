import React from "react";
import { observer } from "mobx-react";
import { Button, makeStyles } from "@material-ui/core";

import { useLocalization, useStore } from "../../store";

const useStyles = makeStyles(theme => ({
    buttonMargin: {
        margin: "0 16px 0 30px",
        padding: "4px 16px"
    }
}));

export const OpenLoginDialogButton = observer(() => {
    const classes = useStyles();
    const {
        setGenericAuthorizationDialogOpen,
        setGenericAuthorizationDialogType
    } = useStore().genericAuthorizationDialog;
    const { l } = useLocalization();

    const handleClick = () => {
        setGenericAuthorizationDialogType("login");
        setGenericAuthorizationDialogOpen(true);
    };

    return (
        <Button
            className="open_login_dialog_button"
            classes={{ root: classes.buttonMargin }}
            onClick={handleClick}
            variant="contained"
            disableElevation
            color="primary"
        >
            <strong>{l("authorization.login")}</strong>
        </Button>
    );
});
