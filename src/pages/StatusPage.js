import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Hidden } from '@material-ui/core';

import { AppBar } from '../AppBar/components';
import { StatusBtfsInfoDialog, StatusPageContainer } from '../Status/components';
import { ExploreOurFeaturesDescription, PrometeusDescription } from '../PrometeusDescription';
import { WhoToFollow } from '../Follow/components';
import { MemezatorDialog } from '../Memezator/components';
import { Layout } from '../Layout';

const _StatusPage = ({ currentUser }) => (
    <Grid container>
        <Grid item>
            <AppBar />
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Grid container className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <PrometeusDescription />
                    </Grid>
                    <Grid item xs={12} lg={9} className="right-content-container">
                        <StatusPageContainer />
                    </Grid>
                    <Grid item md={3} className="right-banners-container">
                        {currentUser ? (
                            <Hidden only={['md']}>
                                <WhoToFollow />
                            </Hidden>
                        ) : (
                            <ExploreOurFeaturesDescription />
                        )}
                    </Grid>
                </Grid>
            </Layout>
        </Grid>
        <StatusBtfsInfoDialog />
        <MemezatorDialog />
    </Grid>
);

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser,
});

export const StatusPage = inject(mapMobxToProps)(observer(_StatusPage));
