import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { EthereumPlasmaTable } from '../Btfs/components';

const useStyles = makeStyles(() => ({
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
}));

export const EthereumPlasmaPage = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <AppBar />
            <Grid item xs={12}>
                <Layout>
                    <div className={classes.centered}>
                        <EthereumPlasmaTable currentActiveRoute="ethereum-plasma" />
                    </div>
                </Layout>
            </Grid>
        </Grid>
    );
};
