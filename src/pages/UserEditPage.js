import React from "react";
import { observer } from "mobx-react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import { AppBar } from "../AppBar/components";
import { UpdateUserContainer } from "../User/components";
import { Layout } from "../Layout";
import { LoginForm } from "../Authorization/components";
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription
} from "../PrometeusDescription";
import { useAuthorization, useLocalization } from "../store";

const useStyles = makeStyles(theme => ({
    editTitle: {
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        marginBottom: "24px",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
}));

export const UserEditPage = observer(() => {
    const classes = useStyles();
    const { currentUser } = useAuthorization();
    const { l } = useLocalization();

    return (
        <Grid container>
            <AppBar />
            <Grid item xs={12}>
                <Layout>
                    <Grid container className="content-container">
                        <Grid item md={3} className="left-banners-container">
                            <PrometeusDescription />
                        </Grid>
                        <Grid item lg={9} className="right-content-container">
                            {!currentUser ? (
                                <Grid item className="login-form-container">
                                    <LoginForm
                                        hideSignUpButton={
                                            process.env
                                                .REACT_APP_HIDE_SIGN_UP_BUTTON ===
                                            "true"
                                        }
                                    />
                                </Grid>
                            ) : (
                                <>
                                    <Typography
                                        className={classes.editTitle}
                                        variant="h6"
                                    >
                                        {l("user.edit-profile")}
                                    </Typography>
                                    <UpdateUserContainer />
                                </>
                            )}
                        </Grid>
                        <Grid item md={3} className="right-banners-container">
                            {!currentUser && <ExploreOurFeaturesDescription />}
                        </Grid>
                    </Grid>
                </Layout>
            </Grid>
        </Grid>
    );
});
