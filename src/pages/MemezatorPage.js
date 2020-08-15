import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import { inject, observer } from "mobx-react";

import { Layout } from "../Layout";
import { AppBar } from "../AppBar/components";
import {
    MemezatorHeader,
    MemezatorTimeline,
    MemezatorWinners
} from "../Memezator/components";
import { GlobalTimeline } from "../Status/components";
import { LoginForm } from "../Authorization/components";
import { PrometeusDescription } from "../PrometeusDescription";

const _MemezatorPage = ({ currentUser, homepageTimeline }) => (
    <Grid container>
        <Grid item>
            <AppBar currentActiveRoute="memezator" />
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Grid container className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <PrometeusDescription />
                    </Grid>
                    <Grid item xs={12} lg={9} className="right-content-container">
                        <Grid container>
                            <MemezatorHeader />
                            {!currentUser && (
                                <Grid item xs={12} className="login-form-container">
                                    <LoginForm
                                        hideSignUpButton={
                                            process.env
                                                .REACT_APP_HIDE_SIGN_UP_BUTTON ===
                                            "true"
                                        }
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} md={9} className="right-content">
                                {homepageTimeline === "home" ? (
                                    <MemezatorTimeline />
                                ) : (
                                    <GlobalTimeline />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="right-banners-container">
                        <Hidden only={["md"]}>
                            <MemezatorWinners />
                        </Hidden>
                    </Grid>
                </Grid>
            </Layout>
        </Grid>
    </Grid>
);

const mapMobxToProps = ({ authorization, timelineSwitcher }) => ({
    currentUser: authorization.currentUser,
    homepageTimeline: timelineSwitcher.currentTimeline
});

export const MemezatorPage = inject(mapMobxToProps)(observer(_MemezatorPage));